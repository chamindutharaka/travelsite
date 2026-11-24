import { NextResponse } from "next/server";
import { Resend } from "resend";
import { plannerSchema } from "@/lib/schemas";
import { checkRateLimit } from "@/lib/rate-limit";
import { site } from "@/lib/site";

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const { success: allowed } = checkRateLimit(ip, 5, 60 * 1000);
    if (!allowed) {
      return NextResponse.json(
        {
          error:
            "Too many requests right now. Please wait a minute or message us on WhatsApp.",
        },
        { status: 429 }
      );
    }

    const body: unknown = await req.json();
    const parsed = plannerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Please check the highlighted fields and try again.",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Silent honeypot check
    if (data.websiteField && data.websiteField.length > 0) {
      return NextResponse.json({
        success: true,
        message: `Thanks! Our Galle team will reply ${site.responseTime}.`,
      });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail =
      process.env.TO_EMAIL || process.env.CONTACT_EMAIL_TO || site.email;

    if (
      resendApiKey &&
      resendApiKey !== "re_development_mock_key" &&
      !resendApiKey.startsWith("re_test")
    ) {
      const resend = new Resend(resendApiKey);

      const whenSummary = data.isFlexible
        ? "Flexible dates"
        : data.months.length > 0
        ? data.months.join(", ")
        : data.exactStartDate || "Not specified";

      const htmlContent = `
        <h2>New Trip Enquiry — ${escapeHtml(site.brandName)}</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>WhatsApp / Phone:</strong> ${escapeHtml(data.countryCode)} ${escapeHtml(data.whatsappPhone)}</p>
        <p><strong>Country:</strong> ${escapeHtml(data.country)}</p>
        ${data.tourSlug ? `<p><strong>Starting Tour:</strong> ${escapeHtml(data.tourSlug)}</p>` : ""}
        <hr />
        <h3>Trip Outline</h3>
        <p><strong>When:</strong> ${escapeHtml(whenSummary)}${data.exactStartDate ? ` (Start: ${escapeHtml(data.exactStartDate)})` : ""}</p>
        <p><strong>Trip Length:</strong> ${escapeHtml(data.tripLength)} days</p>
        <p><strong>Travellers:</strong> ${data.adults} adults, ${data.children} children${data.childrenAges ? ` (Ages: ${escapeHtml(data.childrenAges)})` : ""} — ${escapeHtml(data.travelStyle)}</p>
        <p><strong>Interests:</strong> ${escapeHtml(data.interests.join(", "))}</p>
        <p><strong>Comfort Level:</strong> ${escapeHtml(data.comfortLevel)} (Approx. $${data.budgetPerPersonUsd.toLocaleString("en-US")} USD / person)</p>
        <p><strong>Notes:</strong> ${escapeHtml(data.notes || "None")}</p>
      `;

      await resend.emails.send({
        from: `${site.brandName} <onboarding@resend.dev>`,
        to: recipientEmail,
        replyTo: data.email,
        subject: `Trip Enquiry: ${data.fullName} (${data.tripLength} days, ${data.comfortLevel})`,
        html: htmlContent,
      });
    } else {
      console.log("Planner submission logged (no production RESEND_API_KEY):", {
        email: data.email,
        tripLength: data.tripLength,
        comfortLevel: data.comfortLevel,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Thank you! Our team in ${site.city} has your trip brief and typically replies ${site.responseTime}.`,
    });
  } catch (error) {
    console.error("Trip planner submission error:", error);
    return NextResponse.json(
      {
        error:
          "We could not send your trip brief right now. Please use the WhatsApp button below so we can help immediately.",
      },
      { status: 500 }
    );
  }
}
