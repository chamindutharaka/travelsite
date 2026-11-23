import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";
import { checkRateLimit } from "@/lib/rate-limit";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const { success: allowed } = checkRateLimit(ip, 5, 60 * 1000);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many messages sent. Please contact us via WhatsApp." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please check your form details.", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;
    if (data.honeypot && data.honeypot.length > 0) {
      return NextResponse.json({ success: true, message: "Message sent." }, { status: 200 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL_TO || "hello@ceylonholidays.com";

    if (resendApiKey && resendApiKey !== "re_development_mock_key" && !resendApiKey.startsWith("re_test")) {
      const resend = new Resend(resendApiKey);

      await resend.emails.send({
        from: "Ceylon Holidays <onboarding@resend.dev>",
        to: recipientEmail,
        replyTo: data.email,
        subject: `New Contact Message from ${data.fullName}`,
        html: `
          <h2>New Message via Ceylon Holidays Contact Page</h2>
          <p><strong>Name:</strong> ${data.fullName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Travel Dates:</strong> ${data.travelDates || "Not specified"}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, "<br>")}</p>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out. We will get back to you shortly.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Server error occurred. Please try contacting us on WhatsApp." },
      { status: 500 }
    );
  }
}
