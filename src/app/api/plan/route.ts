import { NextResponse } from "next/server";
import { plannerSchema } from "@/lib/schemas";
import { checkRateLimit } from "@/lib/rate-limit";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    // 1. IP Rate Limiting (5 requests per minute per IP)
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const { success: allowed } = checkRateLimit(ip, 5, 60 * 1000);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many submission attempts. Please try again in a few minutes or message us on WhatsApp." },
        { status: 429 }
      );
    }

    // 2. Parse & Validate Payload
    const body = await req.json();
    const result = plannerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please verify all required fields.", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;

    // 3. Honeypot Anti-Spam Check
    if (data.websiteField && data.websiteField.length > 0) {
      // Silently reject bots without raising alarm
      return NextResponse.json({ success: true, message: "Trip plan received." }, { status: 200 });
    }

    // 4. Send Notification Email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL_TO || "hello@ceylonholidays.com";

    if (resendApiKey && resendApiKey !== "re_development_mock_key" && !resendApiKey.startsWith("re_test")) {
      const resend = new Resend(resendApiKey);

      const htmlContent = `
        <h2>New Ceylon Holidays Bespoke Itinerary Request</h2>
        <p><strong>Traveller Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone / WhatsApp:</strong> ${data.countryCode} ${data.whatsappPhone}</p>
        <p><strong>Preferred Contact:</strong> ${data.preferredContact}</p>
        <hr />
        <h3>Trip Specifications</h3>
        <p><strong>Timing:</strong> ${data.travelTiming} (${data.approximateMonth || data.startDate || "Flexible"})</p>
        <p><strong>Duration:</strong> ${data.duration}</p>
        <p><strong>Party:</strong> ${data.adults} Adults, ${data.children} Children (${data.partyType})</p>
        <p><strong>Travel Style:</strong> ${data.travelStyle.join(", ")} | Pace: ${data.pace}</p>
        <p><strong>Destinations:</strong> ${data.destinations.join(", ")}</p>
        <p><strong>Experiences:</strong> ${data.experiences.join(", ") || "None specified"}</p>
        <p><strong>Budget Tier:</strong> ${data.budgetTier}</p>
        <p><strong>Special Notes:</strong> ${data.specialNotes || "None"}</p>
      `;

      await resend.emails.send({
        from: "Ceylon Holidays <onboarding@resend.dev>",
        to: recipientEmail,
        replyTo: data.email,
        subject: `New Trip Enquiry: ${data.fullName} (${data.duration}, ${data.partyType})`,
        html: htmlContent,
      });
    } else {
      // Development mode log
      console.log("Mock email sent for planner submission from:", data.email);
    }

    return NextResponse.json({
      success: true,
      message: "Your custom journey brief has been received. Our Galle team will review and reply within 12 hours.",
    });
  } catch (error) {
    console.error("Trip planner submission error:", error);
    return NextResponse.json(
      { error: "We could not process your submission. Please message us on WhatsApp for an immediate response." },
      { status: 500 }
    );
  }
}
