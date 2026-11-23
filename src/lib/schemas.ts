import { z } from "zod";

export const plannerSchema = z.object({
  // Step 1: Dates & Season
  travelTiming: z.enum(["dates", "month", "flexible"]),
  startDate: z.string().optional(),
  approximateMonth: z.string().optional(),
  flexibility: z.enum(["exact", "flexible_3_days", "anytime"]),

  // Step 2: Duration & Travellers
  duration: z.string().min(1, "Please select trip duration"),
  adults: z.number().min(1, "At least 1 adult is required").max(20),
  children: z.number().min(0).max(10),
  partyType: z.enum(["couple", "honeymoon", "family", "friends", "solo"]),

  // Step 3: Travel Style & Stays
  travelStyle: z.array(z.string()).min(1, "Please choose at least one stay style"),
  pace: z.enum(["relaxed", "balanced", "active"]),

  // Step 4: Places of Interest
  destinations: z.array(z.string()).min(1, "Select at least one destination"),

  // Step 5: Signature Experiences
  experiences: z.array(z.string()).default([]),

  // Step 6: Preferences & Budget
  budgetTier: z.enum(["comfort", "boutique", "ultra_luxury", "custom"]),
  specialNotes: z.string().max(1000).optional(),

  // Step 7: Contact Details
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email address is required"),
  countryCode: z.string().min(1),
  whatsappPhone: z.string().min(6, "Valid phone/WhatsApp number is required"),
  preferredContact: z.enum(["whatsapp", "email", "phone"]),

  // Honeypot anti-spam field (must remain empty)
  websiteField: z.string().max(0, "Bot detected").optional(),
});

export type PlannerFormData = z.infer<typeof plannerSchema>;

export const contactSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email address is required"),
  phone: z.string().min(6, "Valid phone or WhatsApp is required"),
  travelDates: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
