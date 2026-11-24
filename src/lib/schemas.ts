import { z } from "zod";

export const PLANNER_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export const PLANNER_INTERESTS = [
  "Culture",
  "Wildlife",
  "Beaches",
  "Hill country & trains",
  "Adventure",
  "Food",
  "Wellness",
  "Luxury",
] as const;

export const plannerSchema = z
  .object({
    // Step 1: When
    months: z.array(z.string()).default([]),
    isFlexible: z.boolean().default(false),
    exactStartDate: z.string().optional(),
    tripLength: z.enum(["3-5", "6-8", "9-12", "13+"]),

    // Step 2: Who
    adults: z.number().int().min(1, "At least 1 adult is required").max(20),
    children: z.number().int().min(0).max(12),
    childrenAges: z.string().max(120).optional(),
    travelStyle: z.enum(["couple", "family", "friends", "solo"]),

    // Step 3: Interests
    interests: z
      .array(z.string())
      .min(1, "Please pick at least one interest so we can shape your route."),

    // Step 4: Comfort & budget
    comfortLevel: z.enum(["Budget", "Comfortable", "Luxury"]),
    budgetPerPersonUsd: z.number().min(300).max(8000),

    // Step 5: Details
    fullName: z.string().trim().min(2, "Please enter your name."),
    email: z.string().trim().email("Please enter a valid email address."),
    countryCode: z.string().trim().min(1, "Country code is required."),
    whatsappPhone: z
      .string()
      .trim()
      .min(6, "Please enter your WhatsApp or phone number."),
    country: z.string().trim().min(2, "Please enter your country."),
    notes: z.string().max(1200).optional(),
    tourSlug: z.string().optional(),
    consent: z.boolean().refine((val) => val === true, {
      message: "Please confirm you are happy for us to reply about your trip.",
    }),

    // Honeypot anti-spam field (must remain empty)
    websiteField: z.string().max(0, "Invalid submission").optional(),
  })
  .refine((data) => data.isFlexible || data.months.length > 0 || Boolean(data.exactStartDate), {
    message: "Pick at least one month, enter an exact date, or choose I'm flexible.",
    path: ["months"],
  });

export type PlannerFormData = z.infer<typeof plannerSchema>;

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required"),
  email: z.string().trim().email("Valid email address is required"),
  phone: z.string().trim().min(6, "Valid phone or WhatsApp is required"),
  travelDates: z.string().optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().max(0, "Invalid submission").optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
