"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm, type Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, MessageCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import {
  PLANNER_MONTHS,
  plannerSchema,
  type PlannerFormData,
} from "@/lib/schemas";
import { buildWhatsAppLink, site } from "@/lib/site";
import { useCurrency } from "@/components/providers/CurrencyProvider";

const STORAGE_KEY = "ceylon-holidays-trip-planner-v2";

const STEP_NAMES = [
  "When",
  "Who",
  "Interests",
  "Comfort",
  "Details",
  "Review",
] as const;

const INTEREST_CARDS = [
  {
    id: "Culture",
    label: "Culture",
    image: "/images/destinations/sigiriya.jpg",
  },
  {
    id: "Wildlife",
    label: "Wildlife",
    image: "/images/destinations/yala.jpg",
  },
  {
    id: "Beaches",
    label: "Beaches",
    image: "/images/destinations/mirissa.jpg",
  },
  {
    id: "Hill country & trains",
    label: "Hill country & trains",
    image: "/images/experiences/scenic-blue-train.jpg",
  },
  {
    id: "Adventure",
    label: "Adventure",
    image: "/images/destinations/ella.jpg",
  },
  {
    id: "Food",
    label: "Food",
    image: "/images/experiences/galle-curry-culinary-masterclass.jpg",
  },
  {
    id: "Wellness",
    label: "Wellness",
    image: "/images/experiences/ayurveda-wellness-retreat.jpg",
  },
  {
    id: "Luxury",
    label: "Luxury",
    image: "/images/tours/royal-ceylon-luxury-sanctuary.jpg",
  },
] as const;

const COMFORT_OPTIONS: {
  id: PlannerFormData["comfortLevel"];
  title: string;
  desc: string;
  suggestedBudget: number;
}[] = [
  {
    id: "Budget",
    title: "Budget",
    desc: "Clean, well-reviewed guesthouses and simple 3-star stays.",
    suggestedBudget: 900,
  },
  {
    id: "Comfortable",
    title: "Comfortable",
    desc: "Charming 4-star boutique hotels, tea bungalows, and coastal inns.",
    suggestedBudget: 1700,
  },
  {
    id: "Luxury",
    title: "Luxury",
    desc: "5-star design hotels, private pool villas, and standout heritage stays.",
    suggestedBudget: 3200,
  },
];

const DEFAULT_VALUES: PlannerFormData = {
  months: [],
  isFlexible: false,
  exactStartDate: "",
  tripLength: "6-8",
  adults: 2,
  children: 0,
  childrenAges: "",
  travelStyle: "couple",
  interests: ["Culture", "Beaches"],
  comfortLevel: "Comfortable",
  budgetPerPersonUsd: 1700,
  fullName: "",
  email: "",
  countryCode: "+44",
  whatsappPhone: "",
  country: "",
  notes: "",
  tourSlug: "",
  consent: false,
  websiteField: "",
};

export function MultiStepPlanner() {
  const searchParams = useSearchParams();
  const { formatPrice, currency } = useCurrency();
  const [step, setStep] = useState(0); // 0..4 = 5 steps, 5 = Review
  const [submitError, setSubmitError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    watch,
    setValue,
    trigger,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PlannerFormData>({
    resolver: zodResolver(plannerSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onTouched",
  });

  const values = watch();

  // Hydrate from localStorage first, then apply URL query params (month, interest, tour)
  useEffect(() => {
    let hydrated: Partial<PlannerFormData> = {};
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        hydrated = JSON.parse(raw) as Partial<PlannerFormData>;
      }
    } catch {
      // Ignore storage errors
    }

    const qMonth = searchParams.get("month");
    const qInterest = searchParams.get("interest");
    const qTour = searchParams.get("tour");

    const nextValues: PlannerFormData = {
      ...DEFAULT_VALUES,
      ...hydrated,
      consent: false,
      websiteField: "",
    };

    if (qMonth && PLANNER_MONTHS.includes(qMonth as (typeof PLANNER_MONTHS)[number])) {
      nextValues.months = [qMonth];
      nextValues.isFlexible = false;
    } else if (qMonth === "flexible") {
      nextValues.isFlexible = true;
      nextValues.months = [];
    }

    if (qInterest) {
      const match = INTEREST_CARDS.find(
        (c) => c.id.toLowerCase() === qInterest.toLowerCase()
      );
      if (match) {
        nextValues.interests = Array.from(
          new Set([match.id, ...(nextValues.interests || [])])
        );
      }
    }

    if (qTour) {
      nextValues.tourSlug = qTour;
      if (!nextValues.notes) {
        nextValues.notes = `I would like to customise the "${qTour.replace(/-/g, " ")}" itinerary.`;
      }
    }

    reset(nextValues);
  }, [searchParams, reset]);

  // Persist progress to localStorage
  useEffect(() => {
    if (isSubmitted) return;
    try {
      const toSave = { ...values, websiteField: "" };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {
      // Ignore storage errors
    }
  }, [values, isSubmitted]);

  const toggleMonth = (m: string) => {
    const current = values.months || [];
    const updated = current.includes(m)
      ? current.filter((x) => x !== m)
      : [...current, m];
    setValue("months", updated, { shouldValidate: true });
    if (updated.length > 0) {
      setValue("isFlexible", false, { shouldValidate: true });
    }
  };

  const toggleInterest = (id: string) => {
    const current = values.interests || [];
    const updated = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    setValue("interests", updated, { shouldValidate: true });
  };

  const handleNext = async () => {
    setSubmitError("");
    const fieldsByStep: Path<PlannerFormData>[][] = [
      ["months", "isFlexible", "tripLength"],
      ["adults", "children", "travelStyle"],
      ["interests"],
      ["comfortLevel", "budgetPerPersonUsd"],
      ["fullName", "email", "countryCode", "whatsappPhone", "country", "consent"],
    ];

    const valid = await trigger(fieldsByStep[step]);
    if (!valid) return;

    // Extra Step 1 check for cross-field refine rule
    if (
      step === 0 &&
      !values.isFlexible &&
      values.months.length === 0 &&
      !values.exactStartDate
    ) {
      setSubmitError(
        "Pick at least one month, enter an exact date, or choose I'm flexible."
      );
      return;
    }

    if (step < 5) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 180, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setSubmitError("");
    if (step > 0) setStep((s) => s - 1);
  };

  const onSubmit = async (data: PlannerFormData) => {
    setSubmitError("");
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) {
        setSubmitError(
          json.error || "Could not send your trip brief. Please try WhatsApp below."
        );
        return;
      }
      setIsSubmitted(true);
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Ignore
      }
    } catch {
      setSubmitError(
        "Network error. Please use the WhatsApp button below to send your summary."
      );
    }
  };

  const whenLabel = values.isFlexible
    ? "Flexible dates"
    : values.months.length > 0
    ? values.months.join(", ")
    : values.exactStartDate || "Not chosen yet";

  const whatsappSummary = `Hello ${site.brandName}! Here is my Sri Lanka trip plan:
• When: ${whenLabel}${values.exactStartDate ? ` (Start: ${values.exactStartDate})` : ""}
• Trip length: ${values.tripLength} days
• Travellers: ${values.adults} adults, ${values.children} children${values.childrenAges ? ` (ages ${values.childrenAges})` : ""} (${values.travelStyle})
• Interests: ${values.interests.join(", ")}
• Comfort & budget: ${values.comfortLevel} (~$${values.budgetPerPersonUsd} USD per person)
${values.tourSlug ? `• Starting tour: ${values.tourSlug}\n` : ""}• Name: ${values.fullName || "Traveller"} (${values.country || ""})
• Notes: ${values.notes || "None"}`;

  const whatsappUrl = buildWhatsAppLink(whatsappSummary);

  return (
    <section
      id="trip-planner"
      className="py-10 sm:py-16 bg-[var(--sand)] text-[var(--ink)]"
      aria-label="5-step Sri Lanka trip planner"
    >
      <Container size="narrow">
        <div className="rounded-2xl bg-[var(--surface)] border border-[var(--line)] shadow-sm overflow-hidden">
          {/* Progress Bar with Step Names */}
          {!isSubmitted && (
            <div className="bg-[var(--sand-deep)] border-b border-[var(--line)] px-5 sm:px-8 py-4 space-y-3">
              <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
                {STEP_NAMES.map((name, index) => {
                  const isCurrent = index === step;
                  const isDone = index < step;
                  return (
                    <button
                      key={name}
                      type="button"
                      disabled={index > step}
                      onClick={() => index < step && setStep(index)}
                      className={`shrink-0 inline-flex items-center gap-1.5 text-[13px] font-semibold min-h-[36px] px-2 rounded-md transition-colors ${
                        isCurrent
                          ? "text-[var(--ocean)]"
                          : isDone
                          ? "text-[var(--leaf)] hover:underline cursor-pointer"
                          : "text-[var(--ink-muted)] opacity-60 cursor-default"
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full text-[12px] inline-flex items-center justify-center ${
                          isCurrent
                            ? "bg-[var(--ocean)] text-white"
                            : isDone
                            ? "bg-[var(--leaf)] text-white"
                            : "bg-[var(--sand)] border border-[var(--line)] text-[var(--ink-muted)]"
                        }`}
                      >
                        {isDone ? <Check className="w-3.5 h-3.5" /> : index + 1}
                      </span>
                      <span>{name}</span>
                    </button>
                  );
                })}
              </div>

              <div className="w-full h-2 bg-[var(--sand)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--ocean)] transition-all duration-300 rounded-full"
                  style={{
                    width: `${Math.round(((step + 1) / STEP_NAMES.length) * 100)}%`,
                  }}
                />
              </div>
            </div>
          )}

          <div className="p-5 sm:p-8 lg:p-10">
            {isSubmitted ? (
              <div className="py-6 text-center space-y-5" role="status" aria-live="polite">
                <div className="w-14 h-14 mx-auto rounded-full bg-[var(--leaf)] text-white flex items-center justify-center">
                  <Check className="w-7 h-7" />
                </div>

                <h2 className="font-serif text-[var(--ink)]">
                  Thanks, {values.fullName}. We have your trip plan.
                </h2>

                <p className="text-[var(--ink-muted)] mx-auto">
                  Our team in {site.city} will review your route and reply {site.responseTime} with hotel ideas, driving times, and an indicative price.
                </p>

                <ul className="max-w-md mx-auto text-left space-y-2 text-[15px] text-[var(--ink)] bg-[var(--sand)] p-5 rounded-xl border border-[var(--line)]">
                  <li>1. We check weather and best routes for {whenLabel}.</li>
                  <li>2. We send a clear day-by-day draft with prices.</li>
                  <li>3. We adjust anything you want before you decide.</li>
                </ul>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 rounded-full bg-[var(--leaf)] hover:bg-[var(--ocean-dark)] text-white text-[16px] font-semibold transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" aria-hidden="true" />
                    <span>Send via WhatsApp</span>
                  </a>
                  <Link
                    href="/tours"
                    className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] px-7 py-3 rounded-full border-2 border-[var(--ocean)] text-[var(--ocean)] hover:bg-[var(--ocean)] hover:text-white text-[16px] font-semibold transition-colors"
                  >
                    Browse tours
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-7">
                {/* Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="websiteField">Leave blank</label>
                  <input id="websiteField" type="text" tabIndex={-1} {...register("websiteField")} />
                </div>

                {/* STEP 1: WHEN */}
                {step === 0 && (
                  <div className="space-y-6">
                    <div>
                      <p className="text-[14px] font-semibold text-[var(--ocean)]">
                        Step 1 of 5
                      </p>
                      <h2 className="font-serif text-[var(--ink)] mt-1">
                        When would you like to visit?
                      </h2>
                    </div>

                    <fieldset className="space-y-3">
                      <legend className="text-[15px] font-semibold text-[var(--ink)]">
                        Pick one or more months
                      </legend>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                        {PLANNER_MONTHS.map((m) => {
                          const selected = values.months.includes(m);
                          return (
                            <button
                              key={m}
                              type="button"
                              aria-pressed={selected}
                              onClick={() => toggleMonth(m)}
                              className={`min-h-[46px] rounded-xl text-[15px] font-semibold border transition-colors ${
                                selected
                                  ? "bg-[var(--ocean)] text-white border-[var(--ocean)]"
                                  : "bg-[var(--sand)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--ocean)]"
                              }`}
                            >
                              {m}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        type="button"
                        aria-pressed={values.isFlexible}
                        onClick={() => {
                          const next = !values.isFlexible;
                          setValue("isFlexible", next, { shouldValidate: true });
                          if (next) setValue("months", []);
                        }}
                        className={`w-full sm:w-auto min-h-[46px] px-5 py-2.5 rounded-xl text-[15px] font-semibold border transition-colors ${
                          values.isFlexible
                            ? "bg-[var(--ocean)] text-white border-[var(--ocean)]"
                            : "bg-[var(--sand)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--ocean)]"
                        }`}
                      >
                        I&apos;m flexible
                      </button>
                    </fieldset>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="exactStartDate"
                          className="block text-[15px] font-semibold text-[var(--ink)] mb-2"
                        >
                          Exact start date (optional)
                        </label>
                        <input
                          id="exactStartDate"
                          type="date"
                          {...register("exactStartDate")}
                          className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--sand)] text-[16px] text-[var(--ink)]"
                        />
                      </div>

                      <fieldset>
                        <legend className="text-[15px] font-semibold text-[var(--ink)] mb-2">
                          Trip length
                        </legend>
                        <div className="grid grid-cols-2 gap-2.5">
                          {(["3-5", "6-8", "9-12", "13+"] as const).map((len) => {
                            const active = values.tripLength === len;
                            return (
                              <button
                                key={len}
                                type="button"
                                aria-pressed={active}
                                onClick={() => setValue("tripLength", len)}
                                className={`min-h-[46px] rounded-xl text-[15px] font-semibold border transition-colors ${
                                  active
                                    ? "bg-[var(--ocean)] text-white border-[var(--ocean)]"
                                    : "bg-[var(--sand)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--ocean)]"
                                }`}
                              >
                                {len} days
                              </button>
                            );
                          })}
                        </div>
                      </fieldset>
                    </div>
                  </div>
                )}

                {/* STEP 2: WHO */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <p className="text-[14px] font-semibold text-[var(--ocean)]">
                        Step 2 of 5
                      </p>
                      <h2 className="font-serif text-[var(--ink)] mt-1">
                        Who is travelling?
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="adults"
                          className="block text-[15px] font-semibold text-[var(--ink)] mb-2"
                        >
                          Adults
                        </label>
                        <input
                          id="adults"
                          type="number"
                          min={1}
                          max={20}
                          {...register("adults", { valueAsNumber: true })}
                          className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--sand)] text-[16px] font-semibold text-[var(--ink)]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="children"
                          className="block text-[15px] font-semibold text-[var(--ink)] mb-2"
                        >
                          Children (under 16)
                        </label>
                        <input
                          id="children"
                          type="number"
                          min={0}
                          max={12}
                          {...register("children", { valueAsNumber: true })}
                          className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--sand)] text-[16px] font-semibold text-[var(--ink)]"
                        />
                      </div>
                    </div>

                    {values.children > 0 && (
                      <div>
                        <label
                          htmlFor="childrenAges"
                          className="block text-[15px] font-semibold text-[var(--ink)] mb-2"
                        >
                          Children&apos;s ages
                        </label>
                        <input
                          id="childrenAges"
                          type="text"
                          placeholder="e.g. 6 and 10"
                          {...register("childrenAges")}
                          className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--sand)] text-[16px] text-[var(--ink)]"
                        />
                      </div>
                    )}

                    <fieldset>
                      <legend className="text-[15px] font-semibold text-[var(--ink)] mb-2.5">
                        Travel style
                      </legend>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {(
                          [
                            { id: "couple", label: "Couple" },
                            { id: "family", label: "Family" },
                            { id: "friends", label: "Friends" },
                            { id: "solo", label: "Solo" },
                          ] as const
                        ).map((opt) => {
                          const active = values.travelStyle === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              aria-pressed={active}
                              onClick={() => setValue("travelStyle", opt.id)}
                              className={`min-h-[48px] rounded-xl text-[15px] font-semibold border transition-colors ${
                                active
                                  ? "bg-[var(--ocean)] text-white border-[var(--ocean)]"
                                  : "bg-[var(--sand)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--ocean)]"
                              }`}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>
                  </div>
                )}

                {/* STEP 3: INTERESTS */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <p className="text-[14px] font-semibold text-[var(--ocean)]">
                        Step 3 of 5
                      </p>
                      <h2 className="font-serif text-[var(--ink)] mt-1">
                        What do you want to see and do?
                      </h2>
                      <p className="text-[15px] text-[var(--ink-muted)] mt-1">
                        Pick as many as you like.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                      {INTEREST_CARDS.map((card) => {
                        const selected = values.interests.includes(card.id);
                        return (
                          <button
                            key={card.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => toggleInterest(card.id)}
                            className={`group relative rounded-xl overflow-hidden text-left border-2 transition-all ${
                              selected
                                ? "border-[var(--cinnamon)] ring-2 ring-[var(--cinnamon)]/30"
                                : "border-[var(--line)] hover:border-[var(--ocean)]"
                            }`}
                          >
                            <div className="relative aspect-[4/3] w-full bg-[var(--sand-deep)]">
                              <Image
                                src={card.image}
                                alt={card.label}
                                fill
                                sizes="(max-width: 640px) 45vw, 180px"
                                className="object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ocean-dark)]/85 via-transparent to-transparent" />
                              {selected && (
                                <span className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[var(--cinnamon)] text-white flex items-center justify-center">
                                  <Check className="w-4 h-4" />
                                </span>
                              )}
                              <span className="absolute bottom-2.5 left-2.5 right-2.5 text-[14px] font-semibold text-white leading-tight">
                                {card.label}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 4: COMFORT & BUDGET */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <p className="text-[14px] font-semibold text-[var(--ocean)]">
                        Step 4 of 5
                      </p>
                      <h2 className="font-serif text-[var(--ink)] mt-1">
                        Comfort level &amp; indicative budget
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                      {COMFORT_OPTIONS.map((opt) => {
                        const active = values.comfortLevel === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            aria-pressed={active}
                            onClick={() => {
                              setValue("comfortLevel", opt.id);
                              setValue("budgetPerPersonUsd", opt.suggestedBudget);
                            }}
                            className={`p-5 rounded-xl border-2 text-left transition-colors space-y-1.5 ${
                              active
                                ? "bg-[var(--ocean)] text-white border-[var(--ocean)]"
                                : "bg-[var(--sand)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--ocean)]"
                            }`}
                          >
                            <span className="font-serif text-lg font-semibold block">
                              {opt.title}
                            </span>
                            <span
                              className={`text-[14px] leading-snug block ${
                                active ? "text-white/90" : "text-[var(--ink-muted)]"
                              }`}
                            >
                              {opt.desc}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="p-5 rounded-xl bg-[var(--sand)] border border-[var(--line)] space-y-3">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <label
                          htmlFor="budgetPerPersonUsd"
                          className="text-[15px] font-semibold text-[var(--ink)]"
                        >
                          Indicative budget per person (excluding flights)
                        </label>
                        <span className="font-serif text-2xl font-semibold text-[var(--ocean)]">
                          {formatPrice(values.budgetPerPersonUsd)}{" "}
                          <span className="text-[13px] font-sans font-normal text-[var(--ink-muted)]">
                            {currency !== "USD" ? "(approx.)" : "USD"}
                          </span>
                        </span>
                      </div>

                      <input
                        id="budgetPerPersonUsd"
                        type="range"
                        min={400}
                        max={5000}
                        step={100}
                        value={values.budgetPerPersonUsd}
                        onChange={(e) =>
                          setValue("budgetPerPersonUsd", Number(e.target.value))
                        }
                        className="w-full accent-[var(--cinnamon)] h-2 cursor-pointer"
                      />

                      <div className="flex justify-between text-[13px] text-[var(--ink-muted)]">
                        <span>{formatPrice(400)}</span>
                        <span>{formatPrice(2500)}</span>
                        <span>{formatPrice(5000)}+</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5: DETAILS */}
                {step === 4 && (
                  <div className="space-y-5">
                    <div>
                      <p className="text-[14px] font-semibold text-[var(--ocean)]">
                        Step 5 of 5
                      </p>
                      <h2 className="font-serif text-[var(--ink)] mt-1">
                        Where should we send your plan?
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-[15px] font-semibold text-[var(--ink)] mb-1.5"
                        >
                          Full name *
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          autoComplete="name"
                          {...register("fullName")}
                          className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--sand)] text-[16px] text-[var(--ink)]"
                        />
                        {errors.fullName && (
                          <p className="text-[14px] text-[var(--cinnamon)] mt-1" role="alert">
                            {errors.fullName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-[15px] font-semibold text-[var(--ink)] mb-1.5"
                        >
                          Email address *
                        </label>
                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          {...register("email")}
                          className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--sand)] text-[16px] text-[var(--ink)]"
                        />
                        {errors.email && (
                          <p className="text-[14px] text-[var(--cinnamon)] mt-1" role="alert">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="whatsappPhone"
                          className="block text-[15px] font-semibold text-[var(--ink)] mb-1.5"
                        >
                          WhatsApp / phone *
                        </label>
                        <div className="flex gap-2">
                          <label htmlFor="countryCode" className="sr-only">
                            Country dialing code
                          </label>
                          <input
                            id="countryCode"
                            type="text"
                            {...register("countryCode")}
                            className="w-24 min-h-[48px] px-3 py-3 rounded-xl border border-[var(--line)] bg-[var(--sand-deep)] text-[16px] font-semibold text-center text-[var(--ink)]"
                          />
                          <input
                            id="whatsappPhone"
                            type="tel"
                            autoComplete="tel-national"
                            placeholder="70 215 6828"
                            {...register("whatsappPhone")}
                            className="flex-1 min-h-[48px] px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--sand)] text-[16px] text-[var(--ink)]"
                          />
                        </div>
                        {errors.whatsappPhone && (
                          <p className="text-[14px] text-[var(--cinnamon)] mt-1" role="alert">
                            {errors.whatsappPhone.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="country"
                          className="block text-[15px] font-semibold text-[var(--ink)] mb-1.5"
                        >
                          Country *
                        </label>
                        <input
                          id="country"
                          type="text"
                          autoComplete="country-name"
                          placeholder="e.g. United Kingdom"
                          {...register("country")}
                          className="w-full min-h-[48px] px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--sand)] text-[16px] text-[var(--ink)]"
                        />
                        {errors.country && (
                          <p className="text-[14px] text-[var(--cinnamon)] mt-1" role="alert">
                            {errors.country.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="notes"
                        className="block text-[15px] font-semibold text-[var(--ink)] mb-1.5"
                      >
                        Anything else we should know? (optional)
                      </label>
                      <textarea
                        id="notes"
                        rows={3}
                        placeholder="Dietary needs, special occasions, must-see places, or preferred pace..."
                        {...register("notes")}
                        className="w-full px-4 py-3 rounded-xl border border-[var(--line)] bg-[var(--sand)] text-[16px] text-[var(--ink)]"
                      />
                    </div>

                    <div className="flex items-start gap-3 pt-1">
                      <input
                        id="consent"
                        type="checkbox"
                        {...register("consent")}
                        className="w-5 h-5 mt-1 rounded border-[var(--line)] accent-[var(--ocean)] shrink-0"
                      />
                      <label htmlFor="consent" className="text-[15px] text-[var(--ink-muted)]">
                        I am happy for {site.brandName} to contact me by email or WhatsApp about this trip enquiry.
                      </label>
                    </div>
                    {errors.consent && (
                      <p className="text-[14px] text-[var(--cinnamon)]" role="alert">
                        {errors.consent.message}
                      </p>
                    )}
                  </div>
                )}

                {/* STEP 6: REVIEW SUMMARY */}
                {step === 5 && (
                  <div className="space-y-6">
                    <div>
                      <p className="text-[14px] font-semibold text-[var(--ocean)]">
                        Final check
                      </p>
                      <h2 className="font-serif text-[var(--ink)] mt-1">
                        Review your trip summary
                      </h2>
                    </div>

                    <dl className="divide-y divide-[var(--line)] rounded-xl bg-[var(--sand)] border border-[var(--line)] px-5">
                      <div className="py-3.5 flex flex-col sm:flex-row sm:justify-between gap-1">
                        <dt className="text-[14px] font-semibold text-[var(--ink-muted)]">When</dt>
                        <dd className="text-[15px] font-medium text-[var(--ink)]">
                          {whenLabel} · {values.tripLength} days
                        </dd>
                      </div>
                      <div className="py-3.5 flex flex-col sm:flex-row sm:justify-between gap-1">
                        <dt className="text-[14px] font-semibold text-[var(--ink-muted)]">Travellers</dt>
                        <dd className="text-[15px] font-medium text-[var(--ink)]">
                          {values.adults} adults, {values.children} children ({values.travelStyle})
                        </dd>
                      </div>
                      <div className="py-3.5 flex flex-col sm:flex-row sm:justify-between gap-1">
                        <dt className="text-[14px] font-semibold text-[var(--ink-muted)]">Interests</dt>
                        <dd className="text-[15px] font-medium text-[var(--ink)] sm:text-right">
                          {values.interests.join(", ")}
                        </dd>
                      </div>
                      <div className="py-3.5 flex flex-col sm:flex-row sm:justify-between gap-1">
                        <dt className="text-[14px] font-semibold text-[var(--ink-muted)]">Comfort &amp; budget</dt>
                        <dd className="text-[15px] font-medium text-[var(--ink)]">
                          {values.comfortLevel} · approx. {formatPrice(values.budgetPerPersonUsd)} / person
                        </dd>
                      </div>
                      <div className="py-3.5 flex flex-col sm:flex-row sm:justify-between gap-1">
                        <dt className="text-[14px] font-semibold text-[var(--ink-muted)]">Contact</dt>
                        <dd className="text-[15px] font-medium text-[var(--ink)] sm:text-right">
                          {values.fullName} · {values.email} · {values.countryCode} {values.whatsappPhone}
                        </dd>
                      </div>
                    </dl>
                  </div>
                )}

                {/* Accessible Error Live Region */}
                <div aria-live="polite" className="min-h-[1px]">
                  {(submitError || errors.months?.message || errors.interests?.message) && (
                    <div
                      role="alert"
                      className="p-4 rounded-xl bg-[var(--sand-deep)] border-2 border-[var(--cinnamon)] text-[var(--ink)] text-[15px] font-medium"
                    >
                      {submitError || errors.months?.message || errors.interests?.message}
                    </div>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="pt-4 border-t border-[var(--line)] flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-full border-2 border-[var(--line)] text-[16px] font-semibold text-[var(--ink)] hover:border-[var(--ocean)] transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                        <span>Back</span>
                      </button>
                    )}

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 min-h-[48px] px-4 py-3 rounded-full text-[15px] font-semibold text-[var(--leaf)] hover:underline"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Send via WhatsApp</span>
                    </a>
                  </div>

                  {step < 5 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 rounded-full bg-[var(--cinnamon)] hover:bg-[var(--cinnamon-dark)] text-white text-[16px] font-semibold transition-colors"
                    >
                      <span>{step === 4 ? "Review plan" : "Next step"}</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-3 rounded-full bg-[var(--cinnamon)] hover:bg-[var(--cinnamon-dark)] text-white text-[16px] font-semibold transition-colors disabled:opacity-60"
                    >
                      <span>{isSubmitting ? "Sending..." : "Send my trip plan"}</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
