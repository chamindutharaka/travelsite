"use client";

import React, { useState } from "react";
import { Container } from "@/components/layout/Container";
import { destinations } from "@/content/destinations";
import { experiences } from "@/content/experiences";
import { generateWhatsAppLink } from "@/lib/utils";
import { EditorialReveal, LineRise } from "@/components/motion/MotionPrimitives";

interface MultiStepPlannerProps {
  hideHeader?: boolean;
  compact?: boolean;
}

export function MultiStepPlanner({
  hideHeader = false,
  compact = false,
}: MultiStepPlannerProps = {}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    travelTiming: "month" as "dates" | "month" | "flexible",
    startDate: "",
    approximateMonth: "December",
    flexibility: "flexible_3_days" as "exact" | "flexible_3_days" | "anytime",
    duration: "10-12 Days",
    adults: 2,
    children: 0,
    partyType: "couple" as "couple" | "honeymoon" | "family" | "friends" | "solo",
    travelStyle: ["Boutique Heritage & Nature Lodges"] as string[],
    pace: "balanced" as "relaxed" | "balanced" | "active",
    destinations: ["Galle", "Sigiriya", "Ella", "Yala"] as string[],
    experiences: [
      "The Iconic Blue Hill Country Train Journey",
      "Private Dawn Leopard Safari in Yala",
    ] as string[],
    budgetTier: "boutique" as "comfort" | "boutique" | "ultra_luxury" | "custom",
    specialNotes: "",
    fullName: "",
    email: "",
    countryCode: "+94",
    whatsappPhone: "",
    preferredContact: "whatsapp" as "whatsapp" | "email" | "phone",
    websiteField: "",
  });

  const updateField = (field: string, value: string | number | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (
    field: "travelStyle" | "destinations" | "experiences",
    item: string
  ) => {
    setFormData((prev) => {
      const arr = prev[field];
      return arr.includes(item)
        ? { ...prev, [field]: arr.filter((x) => x !== item) }
        : { ...prev, [field]: [...arr, item] };
    });
  };

  const handleNext = () => {
    setErrorMessage("");
    if (currentStep === 4 && formData.destinations.length === 0) {
      setErrorMessage("Please select at least one destination of interest.");
      return;
    }
    if (currentStep < 7) setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setErrorMessage("");
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.fullName || !formData.email || !formData.whatsappPhone) {
      setErrorMessage("Please provide your name, email, and WhatsApp or phone number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setIsSuccess(true);
      } else {
        setErrorMessage(data.error || "Failed to submit. Please contact us on WhatsApp.");
      }
    } catch {
      setErrorMessage("Network error occurred. Please contact us on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappBriefMessage = `Hello Ceylon Holidays! I just planned my custom Sri Lanka trip on your website:
• Duration: ${formData.duration}
• Party: ${formData.adults} Adults, ${formData.children} Children (${formData.partyType})
• Timing: ${formData.approximateMonth || formData.startDate || "Flexible"}
• Places: ${formData.destinations.join(", ")}
• Experiences: ${formData.experiences.join(", ") || "Open to recommendations"}
• Budget Tier: ${formData.budgetTier}
• Traveller Name: ${formData.fullName || "Enquirer"}
Let's discuss my tailor-made route!`;

  const whatsappDirectUrl = generateWhatsAppLink(whatsappBriefMessage);

  return (
    <section
      id="trip-planner"
      className={`${
        compact ? "py-8 sm:py-16 lg:py-20" : "py-14 sm:py-24 lg:py-28"
      } bg-[#FBFAF8] text-[#1A1A1A] scroll-mt-16`}
      aria-labelledby={hideHeader ? undefined : "planner-heading"}
    >
      <Container size="default">
        {/* Header (hidden on /plan-your-trip where PageHero displays the title) */}
        {!hideHeader && (
          <EditorialReveal className="max-w-2xl mx-auto text-center space-y-3.5 mb-8 sm:mb-12">
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#EF6427] block">
              Create Your Own Sri Lanka
            </span>
            <h2
              id="planner-heading"
              className="font-serif text-[2rem] sm:text-[2.75rem] lg:text-[3.1rem] font-normal text-[#1A1A1A] leading-[1.12] tracking-[-0.02em]"
            >
              <LineRise>Tell us how you want to travel.</LineRise>
            </h2>
            <p className="text-[15px] sm:text-base text-[#5C5852] leading-[1.7] max-w-[50ch] mx-auto">
              Seven short steps, no payment, and nothing binding. Even a rough sketch is enough for our team in Galle to reply with a real itinerary.
            </p>
          </EditorialReveal>
        )}

        {/* Planner Card */}
        <div className="max-w-3xl mx-auto rounded-2xl bg-white border border-[#1A1A1A]/10 shadow-[0_12px_36px_rgba(26,26,26,0.05)] overflow-hidden">
          {/* Progress Header */}
          <div className="bg-[#F4F2EE]/70 border-b border-[#1A1A1A]/10 px-5 sm:px-8 py-4">
            <div className="flex items-center justify-between text-xs font-medium text-[#1A1A1A] mb-2">
              <span className="font-mono uppercase tracking-[0.16em]">
                0{currentStep} / 07
              </span>
              <span className="text-[#EF6427] font-medium">
                {Math.round((currentStep / 7) * 100)}% complete
              </span>
            </div>
            <div className="w-full h-1 bg-[#1A1A1A]/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1A1A1A] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full"
                style={{ width: `${(currentStep / 7) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-5 sm:p-8 lg:p-10">
            {isSuccess ? (
              <div className="text-center py-6 space-y-5">
                <span className="font-serif text-4xl text-[#EF6427] block">✓</span>

                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A]">
                  Ayubowan, {formData.fullName}. Your brief is received.
                </h3>

                <p className="text-[15px] text-[#5C5852] max-w-[46ch] mx-auto leading-[1.7]">
                  Our travel designers in Galle are reviewing your notes and will reply with a custom day-by-day plan within 12 hours.
                </p>

                <div className="pt-3 max-w-sm mx-auto">
                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-[#FBFAF8] bg-[#1A1A1A] hover:bg-[#EF6427] transition-colors duration-300"
                  >
                    <span>Continue on WhatsApp →</span>
                  </a>
                  <p className="text-xs text-[#5C5852] mt-2.5">
                    Prefills your selections so we can discuss ideas right away.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                {/* STEP 1 */}
                {currentStep === 1 && (
                  <div className="space-y-5">
                    <div className="border-b border-[#1A1A1A]/10 pb-3">
                      <span className="text-[11px] uppercase font-medium tracking-[0.2em] text-[#EF6427] block mb-1">
                        Timeline
                      </span>
                      <h3 className="font-serif text-2xl font-normal text-[#1A1A1A]">
                        When are you thinking of travelling?
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: "month", label: "Approximate Month" },
                        { id: "dates", label: "Exact Travel Dates" },
                        { id: "flexible", label: "Completely Flexible" },
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => updateField("travelTiming", t.id)}
                          className={`p-3.5 rounded-xl text-left border text-sm font-medium transition-colors duration-200 ${
                            formData.travelTiming === t.id
                              ? "bg-[#1A1A1A] text-[#FBFAF8] border-[#1A1A1A]"
                              : "bg-[#FBFAF8] text-[#1A1A1A] border-[#1A1A1A]/12 hover:border-[#1A1A1A]"
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>

                    {formData.travelTiming === "month" && (
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5C5852] mb-2">
                          Preferred Month
                        </label>
                        <select
                          value={formData.approximateMonth}
                          onChange={(e) => updateField("approximateMonth", e.target.value)}
                          className="w-full p-3.5 rounded-xl border border-[#1A1A1A]/15 bg-[#FBFAF8] text-[#1A1A1A] text-sm font-medium focus:outline-none focus:border-[#EF6427]"
                        >
                          {[
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "June",
                            "July",
                            "August",
                            "September",
                            "October",
                            "November",
                            "December",
                          ].map((m) => (
                            <option key={m} value={m}>
                              {m} (Sri Lanka)
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {formData.travelTiming === "dates" && (
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5C5852] mb-2">
                          Estimated Start Date
                        </label>
                        <input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => updateField("startDate", e.target.value)}
                          className="w-full p-3.5 rounded-xl border border-[#1A1A1A]/15 bg-[#FBFAF8] text-[#1A1A1A] text-sm font-medium focus:outline-none focus:border-[#EF6427]"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 2 */}
                {currentStep === 2 && (
                  <div className="space-y-5">
                    <div className="border-b border-[#1A1A1A]/10 pb-3">
                      <span className="text-[11px] uppercase font-medium tracking-[0.2em] text-[#EF6427] block mb-1">
                        Party Size
                      </span>
                      <h3 className="font-serif text-2xl font-normal text-[#1A1A1A]">
                        Duration &amp; Travellers
                      </h3>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5C5852] mb-2">
                        Trip Duration
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {["5-7 Days", "8-10 Days", "10-12 Days", "14+ Days"].map((d) => (
                          <button
                            key={d}
                            type="button"
                            onClick={() => updateField("duration", d)}
                            className={`p-3 rounded-xl border text-sm font-medium transition-colors ${
                              formData.duration === d
                                ? "bg-[#1A1A1A] text-[#FBFAF8] border-[#1A1A1A]"
                                : "bg-[#FBFAF8] text-[#1A1A1A] border-[#1A1A1A]/12 hover:border-[#1A1A1A]"
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5C5852] mb-2">
                          Adults
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={20}
                          value={formData.adults}
                          onChange={(e) =>
                            updateField("adults", parseInt(e.target.value) || 1)
                          }
                          className="w-full p-3 rounded-xl border border-[#1A1A1A]/15 bg-[#FBFAF8] font-semibold text-center text-base text-[#1A1A1A]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5C5852] mb-2">
                          Children
                        </label>
                        <input
                          type="number"
                          min={0}
                          max={10}
                          value={formData.children}
                          onChange={(e) =>
                            updateField("children", parseInt(e.target.value) || 0)
                          }
                          className="w-full p-3 rounded-xl border border-[#1A1A1A]/15 bg-[#FBFAF8] font-semibold text-center text-base text-[#1A1A1A]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5C5852] mb-2">
                        Occasion
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {[
                          { id: "couple", label: "Couple" },
                          { id: "honeymoon", label: "Honeymoon" },
                          { id: "family", label: "Family" },
                          { id: "friends", label: "Friends" },
                          { id: "solo", label: "Solo" },
                        ].map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => updateField("partyType", p.id)}
                            className={`p-2.5 rounded-xl border text-xs font-medium transition-colors ${
                              formData.partyType === p.id
                                ? "bg-[#EF6427] text-white border-[#EF6427]"
                                : "bg-[#FBFAF8] text-[#1A1A1A] border-[#1A1A1A]/12 hover:border-[#1A1A1A]"
                            }`}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {currentStep === 3 && (
                  <div className="space-y-5">
                    <div className="border-b border-[#1A1A1A]/10 pb-3">
                      <span className="text-[11px] uppercase font-medium tracking-[0.2em] text-[#EF6427] block mb-1">
                        Accommodations
                      </span>
                      <h3 className="font-serif text-2xl font-normal text-[#1A1A1A]">
                        Preferred Style of Stays
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        "Boutique Heritage & Nature Lodges",
                        "Restored Colonial Tea Planter Bungalows",
                        "Secluded Beachfront Pool Villas",
                        "Luxury Wilderness Safari Glamping",
                        "5-Star International Luxury Resorts",
                      ].map((s) => {
                        const isSelected = formData.travelStyle.includes(s);
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => toggleArrayItem("travelStyle", s)}
                            className={`p-3.5 rounded-xl border text-left text-sm font-medium transition-colors ${
                              isSelected
                                ? "bg-[#1A1A1A] text-[#FBFAF8] border-[#1A1A1A]"
                                : "bg-[#FBFAF8] text-[#1A1A1A] border-[#1A1A1A]/12 hover:border-[#1A1A1A]"
                            }`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5C5852] mb-2">
                        Travel Pace
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {[
                          { id: "relaxed", label: "Slow & Relaxed (2-3 nights per stop)" },
                          { id: "balanced", label: "Balanced (Active mornings, calm evenings)" },
                          { id: "active", label: "See It All (Cover key highlights)" },
                        ].map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => updateField("pace", p.id)}
                            className={`p-3 rounded-xl border text-xs font-medium text-left sm:text-center transition-colors ${
                              formData.pace === p.id
                                ? "bg-[#1A1A1A] text-[#FBFAF8] border-[#1A1A1A]"
                                : "bg-[#FBFAF8] text-[#1A1A1A] border-[#1A1A1A]/12 hover:border-[#1A1A1A]"
                            }`}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4 */}
                {currentStep === 4 && (
                  <div className="space-y-5">
                    <div className="border-b border-[#1A1A1A]/10 pb-3">
                      <span className="text-[11px] uppercase font-medium tracking-[0.2em] text-[#EF6427] block mb-1">
                        Geography
                      </span>
                      <h3 className="font-serif text-2xl font-normal text-[#1A1A1A]">
                        Regions You Are Drawn To
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
                      {destinations.map((dest) => {
                        const isSelected = formData.destinations.includes(dest.name);
                        return (
                          <button
                            key={dest.slug}
                            type="button"
                            onClick={() => toggleArrayItem("destinations", dest.name)}
                            className={`p-3 rounded-xl border text-left text-xs font-medium transition-colors ${
                              isSelected
                                ? "bg-[#1A1A1A] text-[#EF6427] border-[#1A1A1A]"
                                : "bg-[#FBFAF8] text-[#1A1A1A] border-[#1A1A1A]/12 hover:border-[#1A1A1A]"
                            }`}
                          >
                            <span className="block font-semibold">{dest.name}</span>
                            <span className="text-[10px] opacity-75 block mt-0.5">
                              {dest.region}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 5 */}
                {currentStep === 5 && (
                  <div className="space-y-5">
                    <div className="border-b border-[#1A1A1A]/10 pb-3">
                      <span className="text-[11px] uppercase font-medium tracking-[0.2em] text-[#EF6427] block mb-1">
                        Activities
                      </span>
                      <h3 className="font-serif text-2xl font-normal text-[#1A1A1A]">
                        Signature Experiences
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
                      {experiences.map((exp) => {
                        const isSelected = formData.experiences.includes(exp.title);
                        return (
                          <button
                            key={exp.slug}
                            type="button"
                            onClick={() => toggleArrayItem("experiences", exp.title)}
                            className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-colors ${
                              isSelected
                                ? "bg-[#1A1A1A] text-[#EF6427] border-[#1A1A1A]"
                                : "bg-[#FBFAF8] text-[#1A1A1A] border-[#1A1A1A]/12 hover:border-[#1A1A1A]"
                            }`}
                          >
                            <span className="block font-semibold">{exp.title}</span>
                            <span className="text-[10px] opacity-75 block mt-0.5">
                              {exp.location}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 6 */}
                {currentStep === 6 && (
                  <div className="space-y-5">
                    <div className="border-b border-[#1A1A1A]/10 pb-3">
                      <span className="text-[11px] uppercase font-medium tracking-[0.2em] text-[#EF6427] block mb-1">
                        Comfort &amp; Notes
                      </span>
                      <h3 className="font-serif text-2xl font-normal text-[#1A1A1A]">
                        Preferences &amp; Special Requests
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        { id: "comfort", label: "Comfort Boutique", sub: "Handpicked 3–4★ heritage inns" },
                        { id: "boutique", label: "Boutique Premium", sub: "Curated 4–5★ design & pool villas" },
                        { id: "ultra_luxury", label: "Ultra Luxury", sub: "Private estates & Relais & Châteaux" },
                      ].map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => updateField("budgetTier", b.id)}
                          className={`p-3.5 rounded-xl border text-left transition-colors ${
                            formData.budgetTier === b.id
                              ? "bg-[#1A1A1A] text-[#FBFAF8] border-[#1A1A1A]"
                              : "bg-[#FBFAF8] text-[#1A1A1A] border-[#1A1A1A]/12 hover:border-[#1A1A1A]"
                          }`}
                        >
                          <span className="block text-xs font-semibold">{b.label}</span>
                          <span className="text-[11px] opacity-75 block mt-0.5">{b.sub}</span>
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5C5852] mb-2">
                        Dietary, anniversaries, or notes
                      </label>
                      <textarea
                        rows={3}
                        value={formData.specialNotes}
                        onChange={(e) => updateField("specialNotes", e.target.value)}
                        placeholder="e.g. Vegetarian diet, celebrating an anniversary, prefer shorter drives..."
                        className="w-full p-3.5 rounded-xl border border-[#1A1A1A]/15 bg-[#FBFAF8] text-sm placeholder-[#5C5852]/60 focus:outline-none focus:border-[#EF6427]"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 7 */}
                {currentStep === 7 && (
                  <div className="space-y-5">
                    <div className="border-b border-[#1A1A1A]/10 pb-3">
                      <span className="text-[11px] uppercase font-medium tracking-[0.2em] text-[#EF6427] block mb-1">
                        Final Step
                      </span>
                      <h3 className="font-serif text-2xl font-normal text-[#1A1A1A]">
                        Where should we send your itinerary?
                      </h3>
                    </div>

                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        tabIndex={-1}
                        value={formData.websiteField}
                        onChange={(e) => updateField("websiteField", e.target.value)}
                      />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5C5852] mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => updateField("fullName", e.target.value)}
                          placeholder="Your name"
                          className="w-full p-3.5 rounded-xl border border-[#1A1A1A]/15 bg-[#FBFAF8] text-sm focus:outline-none focus:border-[#EF6427]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5C5852] mb-1.5">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => updateField("email", e.target.value)}
                            placeholder="you@example.com"
                            className="w-full p-3.5 rounded-xl border border-[#1A1A1A]/15 bg-[#FBFAF8] text-sm focus:outline-none focus:border-[#EF6427]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5C5852] mb-1.5">
                            WhatsApp / Phone *
                          </label>
                          <div className="flex">
                            <input
                              type="text"
                              value={formData.countryCode}
                              onChange={(e) => updateField("countryCode", e.target.value)}
                              className="w-20 p-3.5 rounded-l-xl border-y border-l border-[#1A1A1A]/15 bg-[#F4F2EE] text-sm font-medium text-center text-[#1A1A1A]"
                            />
                            <input
                              type="tel"
                              required
                              value={formData.whatsappPhone}
                              onChange={(e) => updateField("whatsappPhone", e.target.value)}
                              placeholder="70 215 6828"
                              className="w-full p-3.5 rounded-r-xl border border-[#1A1A1A]/15 bg-[#FBFAF8] text-sm focus:outline-none focus:border-[#EF6427]"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5C5852] mb-1.5">
                          Preferred Contact Method
                        </label>
                        <div className="grid grid-cols-3 gap-2.5">
                          {[
                            { id: "whatsapp", label: "WhatsApp" },
                            { id: "email", label: "Email" },
                            { id: "phone", label: "Phone Call" },
                          ].map((c) => (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => updateField("preferredContact", c.id)}
                              className={`p-3 rounded-xl border text-xs font-medium transition-colors ${
                                formData.preferredContact === c.id
                                  ? "bg-[#1A1A1A] text-[#FBFAF8] border-[#1A1A1A]"
                                  : "bg-[#FBFAF8] text-[#1A1A1A] border-[#1A1A1A]/12 hover:border-[#1A1A1A]"
                              }`}
                            >
                              {c.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
                    {errorMessage}
                  </div>
                )}

                {/* Navigation Footer */}
                <div className="pt-4 border-t border-[#1A1A1A]/10 flex items-center justify-between gap-3">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-5 py-3 rounded-full border border-[#1A1A1A]/15 text-sm font-medium text-[#1A1A1A] hover:bg-[#F4F2EE] transition-colors"
                    >
                      ← Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 7 ? (
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={handleNext}
                        className="text-xs font-medium text-[#5C5852] hover:text-[#1A1A1A]"
                      >
                        Skip
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-7 py-3 rounded-full bg-[#1A1A1A] hover:bg-[#EF6427] text-[#FBFAF8] text-sm font-medium transition-colors duration-300"
                      >
                        Continue →
                      </button>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-7 py-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#EF6427] text-[#FBFAF8] font-medium text-sm transition-colors duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? "Sending Brief..." : "Send My Trip Brief →"}
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
