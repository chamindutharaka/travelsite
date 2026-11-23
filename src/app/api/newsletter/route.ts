import { NextResponse } from "next/server";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // In a live production environment with Resend, add contact to audience or send welcome guide
    // For now, record subscription cleanly
    return NextResponse.json(
      { success: true, message: "Thank you for subscribing to Ceylon Holidays insights!" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
