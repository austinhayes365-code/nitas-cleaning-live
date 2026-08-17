"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";

function AwardIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="h-8 w-8 fill-none stroke-red-600"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="32" cy="24" r="14" />
      <path d="M26 36l-5 18 11-6 11 6-5-18" />
      <path d="M32 16l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8z" />
    </svg>
  );
}

function ProfessionalIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="h-8 w-8 fill-none stroke-red-600"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="32" cy="20" r="8" />
      <path d="M18 50c1.5-10 7-16 14-16s12.5 6 14 16" />
      <path d="M12 20l2 4 4 .6-3 2.9.7 4.1-3.7-2-3.7 2 .7-4.1-3-2.9 4-.6z" />
      <path d="M52 20l2 4 4 .6-3 2.9.7 4.1-3.7-2-3.7 2 .7-4.1-3-2.9 4-.6z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="h-8 w-8 fill-none stroke-red-600"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="32" cy="32" r="22" />
      <path d="M32 18v15l10 6" />
    </svg>
  );
}

function ThumbsUpIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="h-8 w-8 fill-none stroke-red-600"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M24 52H12V28h12z" />
      <path d="M24 47h24c5 0 7-3 8-7l3-13c1-5-2-8-7-8H39l2-9c1-5-2-8-6-8l-11 20z" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="h-7 w-7 fill-none stroke-current"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 30L32 10l24 20" />
      <path d="M14 27v27h36V27" />
      <path d="M26 54V38h12v16" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="h-7 w-7 fill-none stroke-current"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 56V10h27v46" />
      <path d="M39 25h13v31" />
      <path d="M20 19h5M31 19h1M20 29h5M31 29h1M20 39h5M31 39h1" />
      <path d="M8 56h48" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="h-7 w-7 fill-none stroke-current"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M25 8c0 12-6 18-18 18 12 0 18 6 18 18 0-12 6-18 18-18-12 0-18-6-18-18z" />
      <path d="M47 34c0 7-4 11-11 11 7 0 11 4 11 11 0-7 4-11 11-11-7 0-11-4-11-11z" />
    </svg>
  );
}

function WindowIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="h-7 w-7 fill-none stroke-current"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="10" y="10" width="44" height="44" />
      <path d="M32 10v44M10 32h44" />
    </svg>
  );
}

export default function Home() {
  const [cleaningType, setCleaningType] = useState<
    "" | "residential" | "commercial"
  >("");
  const [serviceType, setServiceType] = useState("");
  const [propertySize, setPropertySize] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const residentialServices = [
    { value: "weekly", label: "Weekly Cleaning" },
    { value: "deep", label: "Initial / One-Time Deep Cleaning" },
    { value: "move", label: "Move-In / Move-Out Cleaning" },
    { value: "other", label: "Other / Custom Service" },
  ];

  const commercialServices = [
    { value: "commercial", label: "Commercial Cleaning" },
    { value: "commercial-deep", label: "Commercial Deep Cleaning" },
    { value: "other", label: "Other / Custom Service" },
  ];

  const residentialSizes = [
    { value: "studio", label: "Studio" },
    { value: "1-bedroom", label: "1 Bedroom" },
    { value: "2-bedroom", label: "2 Bedroom" },
    { value: "3-bedroom", label: "3 Bedroom" },
    { value: "4-plus", label: "4+ Bedrooms / Rooms" },
  ];

  const commercialSizes = [
    { value: "micro-commercial", label: "Micro Commercial" },
    { value: "small-commercial", label: "Small Commercial" },
    { value: "average-commercial", label: "Average Commercial" },
    { value: "large-commercial", label: "Large Commercial" },
  ];

  const residentialAddOns = [
    "Polish Wood Surfaces",
    "Clean Oven Interior",
    "Clean Refrigerator Interior",
    "Interior Windows",
    "Exterior Windows",
    "Dust Mini Blinds",
    "Laundry",
  ];

  const commercialAddOns = [
    "Private Restroom",
    "Public Restroom",
    "Individual Areas",
    "Exterior Windows",
    "Polish Furniture",
    "Office Appliances",
  ];

  const services =
    cleaningType === "residential"
      ? residentialServices
      : cleaningType === "commercial"
        ? commercialServices
        : [];

  const propertySizes =
    cleaningType === "residential"
      ? residentialSizes
      : cleaningType === "commercial"
        ? commercialSizes
        : [];

  const addOns =
    cleaningType === "residential"
      ? residentialAddOns
      : cleaningType === "commercial"
        ? commercialAddOns
        : [];

  async function handleCleaningRequestSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!cleaningType) {
      setSubmitStatus("error");
      setSubmitMessage("Please choose Residential or Commercial.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);

      const payload = {
        firstName: String(formData.get("firstName") || ""),
        lastName: String(formData.get("lastName") || ""),
        phone: String(formData.get("phone") || ""),
        email: String(formData.get("email") || ""),
        customerType: cleaningType,
        serviceType,
        propertySize,
        address: String(formData.get("address") || ""),
        preferredDate: String(formData.get("preferredDate") || ""),
        preferredTime: String(formData.get("preferredTime") || ""),
        addons: formData.getAll("addons").map((value) => String(value)),
        notes: String(formData.get("notes") || ""),
      };

      const response = await fetch("/api/cleaning-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to submit cleaning request."
        );
      }

      console.log("SERVER RESPONSE:", result);

      setSubmitStatus("success");
      setSubmitMessage(
        "Your cleaning request was received successfully. We will review it before confirming your appointment."
      );

      form.reset();
      setCleaningType("");
      setServiceType("");
      setPropertySize("");
    } catch (error) {
      console.error("Cleaning request submission error:", error);

      setSubmitStatus("error");
      setSubmitMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <header className="absolute left-0 top-0 z-50 w-full border-b border-white/10 bg-black/95">
        <div className="mx-auto grid h-28 max-w-[1500px] grid-cols-[240px_1fr_auto] items-center px-8 lg:px-12">
          <a href="#" className="flex items-center justify-start">
            <Image
              src="/images/nitas-logo-v3.png"
              alt="Nita's Cleaning Services"
              width={320}
              height={210}
              priority
              className="h-[84px] w-auto object-contain"
            />
          </a>

          <nav className="hidden items-center justify-center gap-9 text-sm font-bold uppercase tracking-wide lg:flex">
            <a className="text-red-600" href="#">
              Home
            </a>
            <a className="transition hover:text-red-500" href="#services">
              Services
            </a>
            <a className="transition hover:text-red-500" href="#pricing">
              Pricing
            </a>
            <a className="transition hover:text-red-500" href="#about">
              About Us
            </a>
            <a className="transition hover:text-red-500" href="#contact">
              Contact
            </a>
          </nav>

          <div className="hidden items-center justify-end gap-7 lg:flex">
            <a
              href="tel:8436535138"
              className="text-sm font-semibold tracking-wide transition hover:text-red-500"
            >
              843-653-5138
            </a>

            <a
              href="#request"
              className="bg-red-600 px-6 py-4 text-sm font-bold uppercase tracking-wide transition hover:bg-red-700"
            >
              Request a Cleaning
            </a>
          </div>

          <button
            aria-label="Open menu"
            className="col-start-3 flex h-11 w-11 flex-col items-center justify-center gap-1.5 border border-white/20 lg:hidden"
          >
            <span className="h-0.5 w-5 bg-white" />
            <span className="h-0.5 w-5 bg-white" />
            <span className="h-0.5 w-5 bg-white" />
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden pt-28">
        <div className="grid min-h-[560px] lg:h-[610px] lg:min-h-0 lg:grid-cols-[48%_52%]">
          <div className="relative z-20 flex items-center bg-black px-6 py-10 sm:px-10 lg:px-16 xl:px-20">
            <div className="mx-auto w-full max-w-2xl lg:mx-0">
              <p className="mb-5 text-sm font-black uppercase tracking-[0.25em] text-red-600">
                Professional. Reliable. Trusted.
              </p>

              <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-6xl md:text-7xl xl:text-[4.8rem]">
                Clean Isn&apos;t
                <br />
                A Service.
                <br />
                <span className="text-red-600">
                  It&apos;s A Standard.
                </span>
              </h1>

              <div className="my-6 flex items-center gap-4">
                <span className="h-px w-24 bg-red-600" />
                <span className="h-2 w-2 rotate-45 bg-red-600" />
                <span className="h-px w-10 bg-zinc-700" />
              </div>

              <p className="max-w-xl text-base leading-7 text-zinc-300 sm:text-lg">
                Professional cleaning solutions for homes, businesses and
                commercial facilities.
              </p>

              <div className="mt-7 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#services"
                  className="bg-red-600 px-7 py-4 text-center text-sm font-black uppercase tracking-wide transition hover:bg-red-700"
                >
                  Explore Our Services →
                </a>

                <a
                  href="#contact"
                  className="border border-white/40 px-7 py-4 text-center text-sm font-black uppercase tracking-wide transition hover:bg-white hover:text-black"
                >
                  Contact Us
                </a>
              </div>
            </div>

            <div className="absolute bottom-0 right-0 hidden h-24 w-14 bg-red-600 [clip-path:polygon(100%_0,100%_100%,0_100%)] lg:block" />
          </div>

          <div className="relative min-h-[460px] overflow-hidden bg-zinc-900 lg:min-h-0">
            <Image
              src="/images/nitas-hero-mockup-photo1.png"
              alt="Professional commercial cleaning"
              fill
              priority
className="origin-right scale-[1.32] object-cover object-[92%_center] sm:object-[88%_center] md:object-[84%_center] lg:scale-[1.18] lg:object-[68%_center]"            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/5 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />

            <div className="absolute bottom-8 right-8 hidden border-r-4 border-red-600 pr-5 text-right lg:block">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-red-500">
                Nita&apos;s Cleaning Services
              </p>
              <p className="mt-2 text-sm text-white/80">
                Clean spaces. Strong impressions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-white/10 bg-zinc-950">
        <div className="mx-auto grid max-w-[1500px] sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-b border-white/10 px-8 py-6 sm:border-r lg:border-b-0">
            <div className="mb-4">
              <AwardIcon />
            </div>
            <p className="text-sm font-black uppercase tracking-wide">
              Commitment to Quality
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              Every clean. Every time.
            </p>
          </div>

          <div className="border-b border-white/10 px-8 py-6 lg:border-b-0 lg:border-r">
            <div className="mb-4">
              <ProfessionalIcon />
            </div>
            <p className="text-sm font-black uppercase tracking-wide">
              Professional Service
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              Standards you can depend on.
            </p>
          </div>

          <div className="border-b border-white/10 px-8 py-6 sm:border-r lg:border-b-0">
            <div className="mb-4">
              <ClockIcon />
            </div>
            <p className="text-sm font-black uppercase tracking-wide">
              On Time. Every Time.
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              Your schedule is our priority.
            </p>
          </div>

          <div className="px-8 py-6">
            <div className="mb-4">
              <ThumbsUpIcon />
            </div>
            <p className="text-sm font-black uppercase tracking-wide">
              Satisfaction Focused
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              We don&apos;t just clean spaces. We build trust.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-white text-black">
        <div className="mx-auto max-w-[1500px] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <div className="mb-5 flex items-center gap-4">
                <p className="text-sm font-black uppercase tracking-[0.3em] text-red-600">
                  What We Do
                </p>
                <span className="h-px w-16 bg-red-600" />
              </div>

              <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-6xl lg:text-7xl">
                Built Around
                <br />
                Your Space<span className="text-red-600">.</span>
              </h2>
            </div>

            <div className="max-w-2xl lg:justify-self-end">
              <p className="text-lg leading-8 text-zinc-600">
                Every space has different needs. Nita&apos;s Cleaning Services
                provides residential and commercial cleaning solutions designed
                around the property, schedule and level of service required.
              </p>

              <a
                href="#pricing"
                className="mt-7 inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.12em] text-red-600 transition hover:gap-5"
              >
                View Cleaning Options
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="grid border-y border-black/10 lg:grid-cols-2">
          {/* RESIDENTIAL */}
          <article className="group relative min-h-[570px] overflow-hidden bg-zinc-950">
            <div
              className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgba(0,0,0,.98) 6%, rgba(0,0,0,.72) 46%, rgba(0,0,0,.24) 100%), url('https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1400&q=90')",
              }}
            />

            <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-12 lg:p-14 xl:p-16">
              <div>
                <div className="flex h-16 w-16 items-center justify-center bg-red-600 text-white">
                  <HomeIcon />
                </div>

                <p className="mt-7 text-xs font-black uppercase tracking-[0.3em] text-red-500">
                  Residential Division
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black uppercase leading-none text-white sm:text-5xl">
                  Home
                  <br />
                  Cleaning
                </h3>

                <p className="mt-6 max-w-xl text-base leading-7 text-zinc-200">
                  Professional care for the places you call home, from routine
                  weekly service to detailed one-time deep cleaning.
                </p>

                <div className="mt-8 grid max-w-xl gap-3 border-t border-white/25 pt-6 text-sm text-zinc-200 sm:grid-cols-2">
                  <p>• Weekly Cleaning</p>
                  <p>• Deep Cleaning</p>
                  <p>• Move-In / Move-Out</p>
                  <p>• Custom Add-On Services</p>
                </div>

                <a
                  href="#pricing"
                  className="mt-8 inline-flex items-center gap-3 border-b-2 border-red-600 pb-2 text-sm font-black uppercase tracking-wide text-white transition hover:gap-5"
                >
                  Residential Services
                  <span className="text-red-500">→</span>
                </a>
              </div>
            </div>
          </article>

          {/* COMMERCIAL */}
          <article className="group relative min-h-[570px] overflow-hidden bg-zinc-950">
            <div
              className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgba(0,0,0,.98) 6%, rgba(0,0,0,.72) 46%, rgba(0,0,0,.24) 100%), url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=90')",
              }}
            />

            <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-12 lg:p-14 xl:p-16">
              <div>
                <div className="flex h-16 w-16 items-center justify-center bg-red-600 text-white">
                  <BuildingIcon />
                </div>

                <p className="mt-7 text-xs font-black uppercase tracking-[0.3em] text-red-500">
                  Commercial Division
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-black uppercase leading-none text-white sm:text-5xl">
                  Business
                  <br />
                  Cleaning
                </h3>

                <p className="mt-6 max-w-xl text-base leading-7 text-zinc-200">
                  Flexible professional cleaning solutions for offices,
                  commercial properties and facilities built around your
                  operation.
                </p>

                <div className="mt-8 grid max-w-xl gap-3 border-t border-white/25 pt-6 text-sm text-zinc-200 sm:grid-cols-2">
                  <p>• Recurring Cleaning</p>
                  <p>• One-Time Deep Cleaning</p>
                  <p>• Restrooms & Common Areas</p>
                  <p>• Office & Facility Care</p>
                </div>

                <a
                  href="#pricing"
                  className="mt-8 inline-flex items-center gap-3 border-b-2 border-red-600 pb-2 text-sm font-black uppercase tracking-wide text-white transition hover:gap-5"
                >
                  Commercial Services
                  <span className="text-red-500">→</span>
                </a>
              </div>
            </div>
          </article>
        </div>

        {/* ADDITIONAL SERVICES */}
        <div className="bg-zinc-100">
          <div className="mx-auto max-w-[1500px] px-6 py-20 sm:px-10 lg:px-16">
            <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="mb-5 text-sm font-black uppercase tracking-[0.3em] text-red-600">
                  More Ways We Can Help
                </p>

                <h3 className="text-4xl font-black uppercase leading-[0.95] sm:text-5xl">
                  Additional
                  <br />
                  Services<span className="text-red-600">.</span>
                </h3>

                <p className="mt-6 max-w-md leading-7 text-zinc-600">
                  Add focused services to your cleaning request when your space
                  needs a little extra attention.
                </p>
              </div>

              <div className="grid border-l border-t border-zinc-300 sm:grid-cols-2">
                <div className="border-b border-r border-zinc-300 p-7 sm:p-8">
                  <div className="mb-6 text-red-600">
                    <SparkleIcon />
                  </div>
                  <p className="text-lg font-black uppercase">
                    Deep Cleaning
                  </p>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    Detailed cleaning for spaces that need additional
                    attention.
                  </p>
                </div>

                <div className="border-b border-r border-zinc-300 p-7 sm:p-8">
                  <div className="mb-6 text-red-600">
                    <WindowIcon />
                  </div>
                  <p className="text-lg font-black uppercase">
                    Window Cleaning
                  </p>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    Interior and exterior options for homes and businesses.
                  </p>
                </div>

                <div className="border-b border-r border-zinc-300 p-7 sm:p-8">
                  <div className="mb-6 text-3xl font-black text-red-600">
                    +
                  </div>
                  <p className="text-lg font-black uppercase">
                    Kitchen Add-Ons
                  </p>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    Oven interiors, refrigerator interiors and other focused
                    kitchen services.
                  </p>
                </div>

                <div className="border-b border-r border-zinc-300 p-7 sm:p-8">
                  <div className="mb-6 text-3xl font-black text-red-600">
                    +
                  </div>
                  <p className="text-lg font-black uppercase">
                    Specialty Care
                  </p>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">
                    Furniture polishing, blinds, laundry and selected
                    property-specific services.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 flex flex-col justify-between gap-6 border-t border-zinc-300 pt-8 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-red-600">
                  Need Something Specific?
                </p>
                <p className="mt-2 text-lg text-zinc-700">
                  Tell us about your space and we&apos;ll help determine the
                  right service.
                </p>
              </div>

              <a
                href="#request"
                className="inline-flex items-center justify-center bg-black px-7 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-red-600"
              >
                Request a Cleaning →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-black text-white">
        {/* Pricing Header */}
        <div className="mx-auto max-w-[1500px] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <div className="mb-5 flex items-center gap-4">
                <p className="text-sm font-black uppercase tracking-[0.3em] text-red-600">
                  Simple & Transparent
                </p>
                <span className="h-px w-16 bg-red-600" />
              </div>

              <h2 className="text-5xl font-black uppercase leading-[0.9] sm:text-6xl lg:text-7xl">
                Cleaning
                <br />
                Pricing<span className="text-red-600">.</span>
              </h2>
            </div>

            <div className="max-w-2xl lg:justify-self-end">
              <p className="text-lg leading-8 text-zinc-400">
                Choose the service that fits your space. Final scheduling and
                service details are confirmed before your appointment.
              </p>

              <a
                href="#request"
                className="mt-7 inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.12em] text-red-500 transition hover:gap-5"
              >
                Request Your Cleaning
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* RESIDENTIAL PRICING */}
        <div className="border-y border-white/10 bg-zinc-950">
          <div className="mx-auto max-w-[1500px] px-6 py-20 sm:px-10 lg:px-16">
            <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.3em] text-red-600">
                  Residential
                </p>
                <h3 className="mt-3 text-4xl font-black uppercase sm:text-5xl">
                  Home Cleaning
                </h3>
              </div>

              <p className="max-w-lg text-zinc-400">
                Weekly cleaning and detailed initial or one-time deep cleaning
                based on the size of your home.
              </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              {/* WEEKLY */}
              <div className="border border-white/10 bg-black">
                <div className="border-b border-white/10 p-7 sm:p-8">
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-red-500">
                    Recurring Service
                  </p>
                  <h4 className="mt-3 text-3xl font-black uppercase">
                    Weekly Cleaning
                  </h4>
                </div>

                <div className="divide-y divide-white/10 px-7 sm:px-8">
                  {[
                    ["Studio", "$55"],
                    ["1 Bedroom", "$65"],
                    ["2 Bedroom", "$75"],
                    ["3 Bedroom", "$85"],
                    ["Additional Room", "$20"],
                  ].map(([label, price]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between py-5"
                    >
                      <span className="font-semibold text-zinc-300">
                        {label}
                      </span>
                      <span className="text-xl font-black text-red-500">
                        {price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DEEP */}
              <div className="border border-red-600/50 bg-black">
                <div className="border-b border-white/10 p-7 sm:p-8">
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-red-500">
                    Initial / One-Time
                  </p>
                  <h4 className="mt-3 text-3xl font-black uppercase">
                    Deep Cleaning
                  </h4>
                </div>

                <div className="divide-y divide-white/10 px-7 sm:px-8">
                  {[
                    ["Studio", "$190"],
                    ["1 Bedroom", "$215"],
                    ["2 Bedroom", "$240"],
                    ["3 Bedroom", "$265"],
                    ["Additional Room", "$30"],
                  ].map(([label, price]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between py-5"
                    >
                      <span className="font-semibold text-zinc-300">
                        {label}
                      </span>
                      <span className="text-xl font-black text-red-500">
                        {price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Residential Add-ons */}
            <div className="mt-8 border border-white/10 bg-white/[0.03] p-7 sm:p-8">
              <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-red-500">
                    Customize Your Service
                  </p>
                  <h4 className="mt-2 text-2xl font-black uppercase">
                    Residential Add-Ons
                  </h4>
                </div>

                <p className="text-sm text-zinc-500">
                  Add these services to your cleaning request.
                </p>
              </div>

              <div className="grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  ["Polish Wood Surfaces", "$20"],
                  ["Clean Oven Interior", "$35"],
                  ["Clean Fridge Interior", "$30"],
                  ["Interior Window / Each", "$15"],
                  ["Exterior Window / Each", "$10"],
                  ["Dust Mini Blinds", "$7"],
                  ["Laundry / Load", "$15"],
                ].map(([label, price]) => (
                  <div
                    key={label}
                    className="flex justify-between gap-4 border-b border-white/10 py-4"
                  >
                    <span className="text-sm text-zinc-300">{label}</span>
                    <span className="font-black text-red-500">{price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* COMMERCIAL PRICING */}
        <div className="bg-white text-black">
          <div className="mx-auto max-w-[1500px] px-6 py-20 sm:px-10 lg:px-16">
            <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.3em] text-red-600">
                  Commercial
                </p>
                <h3 className="mt-3 text-4xl font-black uppercase sm:text-5xl">
                  Business Cleaning
                </h3>
              </div>

              <p className="max-w-xl text-zinc-600 lg:justify-self-end">
                Commercial service is priced hourly based on property size and
                the level of cleaning required.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* STANDARD COMMERCIAL */}
              <div className="border border-zinc-200">
                <div className="bg-black p-7 text-white sm:p-8">
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-red-500">
                    Ongoing Service
                  </p>
                  <h4 className="mt-3 text-3xl font-black uppercase">
                    Commercial Cleaning
                  </h4>
                </div>

                <div className="divide-y divide-zinc-200 px-7 sm:px-8">
                  {[
                    ["Micro", "$50/hr"],
                    ["Small", "$60/hr"],
                    ["Average", "$68/hr"],
                    ["Large", "$75/hr"],
                  ].map(([label, price]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between py-5"
                    >
                      <span className="font-semibold text-zinc-700">
                        {label}
                      </span>
                      <span className="text-xl font-black text-red-600">
                        {price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* COMMERCIAL DEEP */}
              <div className="border border-red-600">
                <div className="bg-red-600 p-7 text-white sm:p-8">
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-white/70">
                    Initial / One-Time
                  </p>
                  <h4 className="mt-3 text-3xl font-black uppercase">
                    Deep Cleaning
                  </h4>
                </div>

                <div className="divide-y divide-zinc-200 px-7 sm:px-8">
                  {[
                    ["Micro", "$60/hr"],
                    ["Small", "$75/hr"],
                    ["Average", "$83/hr"],
                    ["Large", "$90/hr"],
                  ].map(([label, price]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between py-5"
                    >
                      <span className="font-semibold text-zinc-700">
                        {label}
                      </span>
                      <span className="text-xl font-black text-red-600">
                        {price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Commercial Add Ons */}
            {/* COMMERCIAL ADD-ON SERVICES */}
<div className="mx-auto mt-12 max-w-[1180px]">
  <div className="mb-7">
    <p className="text-xs font-black uppercase tracking-[0.25em] text-red-600">
      Individual / Add-On Services
    </p>

    <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <h4 className="text-3xl font-black uppercase">
        Commercial Extras
      </h4>

      <p className="max-w-md text-sm leading-6 text-zinc-500">
        Add focused services to your commercial cleaning based on the needs of
        your facility.
      </p>
    </div>
  </div>

  {/* Regular / Deep Table */}
  <div className="overflow-hidden border border-zinc-200">
    {/* Table Header */}
    <div className="grid grid-cols-[1fr_120px_120px] bg-zinc-100 px-6 py-4 text-xs font-black uppercase tracking-wide sm:px-7">
      <span>Service</span>
      <span className="text-right">Regular</span>
      <span className="text-right">Deep</span>
    </div>

    {[
      ["Private Restroom", "$30–$65", "$50–$95"],
      ["Public Restroom", "$50–$80", "$75–$125"],
      ["Individual Areas", "$30–$75", "$65–$150"],
      ["Exterior Windows", "$15–$20", "$20–$30"],
      ["Office Appliances", "$15–$25", "$25–$50"],
    ].map(([service, regular, deep]) => (
      <div
        key={service}
        className="grid grid-cols-[1fr_120px_120px] items-center border-t border-zinc-200 px-6 py-4 sm:px-7"
      >
        <span className="font-semibold text-zinc-700">
          {service}
        </span>

        <span className="text-right font-black text-zinc-800">
          {regular}
        </span>

        <span className="text-right font-black text-red-600">
          {deep}
        </span>
      </div>
    ))}
  </div>

  {/* Single-Rate Service */}
  <div className="mt-4 flex flex-col justify-between gap-4 border border-zinc-200 bg-zinc-50 px-6 py-5 sm:flex-row sm:items-center sm:px-7">
    <div>
      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-red-600">
        Single-Rate Service
      </p>

      <p className="mt-1 font-bold text-zinc-800">
        Polish Furniture
      </p>
    </div>

    <div className="sm:text-right">
      <p className="text-2xl font-black text-red-600">
        $25–$65
      </p>

      <p className="mt-1 text-xs text-zinc-500">
        Based on service requirements
      </p>
    </div>
  </div>
</div>

            {/* Disclaimer */}
            <div className="mt-10 border-l-4 border-red-600 bg-zinc-100 px-6 py-5">
              <p className="text-sm leading-6 text-zinc-600">
                Pricing shown is based on Nita&apos;s Cleaning Services standard
                service rates. Waste handling / management fees are not included
                where applicable. Final service details are confirmed before
                scheduling.
              </p>
            </div>
          </div>
        </div>

        {/* PRICING CTA */}
        <div className="bg-red-600">
          <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-8 px-6 py-12 sm:px-10 md:flex-row md:items-center lg:px-16">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-black/70">
                Ready When You Are
              </p>
              <h3 className="mt-2 text-3xl font-black uppercase text-white sm:text-4xl">
                Find The Right Cleaning For Your Space.
              </h3>
            </div>

            <a
              href="#request"
              className="inline-flex shrink-0 items-center justify-center bg-black px-8 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-white hover:text-black"
            >
              Request a Cleaning →
            </a>
          </div>
        </div>
      </section>

      {/* NITA'S STANDARD */}
<section id="about" className="bg-white text-black">
  <div className="mx-auto max-w-[1500px] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">

    <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">

      {/* LEFT SIDE */}
      <div>
        <p className="mb-5 text-sm font-black uppercase tracking-[0.3em] text-red-600">
          The Nita&apos;s Standard
        </p>

        <h2 className="text-[44px] font-black uppercase leading-[0.92] tracking-[-0.03em] sm:text-5xl lg:text-[58px] xl:text-[64px]">
          Because The Way
          <br />
          We Clean Reflects
          <br />
          Who We Are<span className="text-red-600">.</span>
        </h2>

        {/* RED ACCENT */}
        <div className="mt-7 h-[3px] w-20 bg-red-600" />

        <p className="mt-7 max-w-[520px] text-base leading-7 text-zinc-600">
          Our standards go beyond surface level. We focus on the details that
          matter most so you can focus on what matters to you.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="grid gap-x-12 gap-y-12 pt-1 sm:grid-cols-2">

        {/* RELIABILITY */}
        <div className="flex gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-red-600">
            <svg
              viewBox="0 0 64 64"
              className="h-8 w-8 fill-none stroke-current"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M32 8l18 7v14c0 12-7 21-18 27-11-6-18-15-18-27V15z" />
              <path d="M24 32l6 6 11-13" />
            </svg>
          </div>

          <div>
            <h3 className="text-lg font-black uppercase">
              Reliability
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-600">
              You can count on us to show up, follow through and deliver
              consistent results.
            </p>
          </div>
        </div>

        {/* QUALITY */}
        <div className="flex gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-red-600">
            <svg
              viewBox="0 0 64 64"
              className="h-8 w-8 fill-none stroke-current"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M32 8l7 15 17 2-12 12 3 17-15-8-15 8 3-17L8 25l17-2z" />
            </svg>
          </div>

          <div>
            <h3 className="text-lg font-black uppercase">
              Quality
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-600">
              We use proven processes, professional equipment and attention to
              detail.
            </p>
          </div>
        </div>

        {/* PROFESSIONALISM */}
        <div className="flex gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-red-600">
            <svg
              viewBox="0 0 64 64"
              className="h-8 w-8 fill-none stroke-current"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="25" cy="22" r="8" />
              <circle cx="43" cy="25" r="6" />
              <path d="M10 50c2-10 7-16 15-16s13 6 15 16" />
              <path d="M36 38c4 1 8 5 10 12" />
            </svg>
          </div>

          <div>
            <h3 className="text-lg font-black uppercase">
              Professionalism
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Trained, uniformed and committed to representing our company with
              pride.
            </p>
          </div>
        </div>

        {/* ACCOUNTABILITY */}
        <div className="flex gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-red-600">
            <svg
              viewBox="0 0 64 64"
              className="h-8 w-8 fill-none stroke-current"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="17" y="12" width="30" height="40" rx="2" />
              <path d="M25 12v-4h14v4" />
              <path d="M24 25l4 4 7-8" />
              <path d="M24 39l4 4 7-8" />
            </svg>
          </div>

          <div>
            <h3 className="text-lg font-black uppercase">
              Accountability
            </h3>

            <p className="mt-3 text-sm leading-6 text-zinc-600">
              We stand behind our work and are committed to your complete
              satisfaction.
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>     

{/* REQUEST A CLEANING */}
<section id="request" className="bg-zinc-100 text-black">
  <div className="mx-auto max-w-[1500px] px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
    {/* HEADER */}
    <div className="grid gap-12 border-b border-zinc-300 pb-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
      <div>
        <div className="mb-5 flex items-center gap-4">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-red-600">
            Let&apos;s Get You Scheduled
          </p>

          <span className="h-px w-16 bg-red-600" />
        </div>

        <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-6xl lg:text-7xl">
          Request A
          <br />
          Cleaning<span className="text-red-600">.</span>
        </h2>
      </div>

      <div className="max-w-2xl lg:justify-self-end">
        <p className="text-lg leading-8 text-zinc-600">
          Tell us about your space and your preferred appointment. Your request
          will be reviewed by Nita&apos;s Cleaning Services before the
          appointment is confirmed.
        </p>

        <div className="mt-6 border-l-4 border-red-600 pl-5">
          <p className="text-sm font-bold text-zinc-700">
            Submitting this form does not automatically confirm your
            appointment.
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            You&apos;ll receive confirmation after your requested date and
            service have been reviewed.
          </p>
        </div>
      </div>
    </div>

    {/* FORM AREA */}
    <div className="mt-16 grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
      {/* LEFT INFO PANEL */}
      <aside className="relative overflow-hidden bg-black p-8 text-white sm:p-10">
        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-red-500">
            What Happens Next
          </p>

          <h3 className="mt-4 text-3xl font-black uppercase leading-tight">
            Simple Request.
            <br />
            Personal Confirmation.
          </h3>

          <div className="mt-10 space-y-8">
            {/* STEP 1 */}
            <div className="flex gap-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-red-600 text-sm font-black text-red-500">
                01
              </div>

              <div>
                <p className="font-black uppercase">Send Your Request</p>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Choose your service, preferred date and tell us about your
                  property.
                </p>
              </div>
            </div>

            {/* STEP 2 */}
            <div className="flex gap-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-red-600 text-sm font-black text-red-500">
                02
              </div>

              <div>
                <p className="font-black uppercase">We Review It</p>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Nita&apos;s Cleaning Services reviews availability and your
                  service requirements.
                </p>
              </div>
            </div>

            {/* STEP 3 */}
            <div className="flex gap-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-red-600 text-sm font-black text-red-500">
                03
              </div>

              <div>
                <p className="font-black uppercase">You&apos;re Confirmed</p>

                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Once approved, you&apos;ll receive your confirmed appointment
                  details.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/15 pt-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-red-500">
              Prefer To Call?
            </p>

            <a
              href="tel:8436535138"
              className="mt-3 inline-block text-2xl font-black transition hover:text-red-500"
            >
              843-653-5138
            </a>
          </div>
        </div>

        {/* Decorative element */}
        <div className="absolute -bottom-20 -right-20 h-52 w-52 rounded-full border-[35px] border-red-600/10" />
      </aside>

      {/* ACTUAL FORM */}
      <form
        onSubmit={handleCleaningRequestSubmit}
        className="border border-zinc-300 bg-white p-7 sm:p-10"
      >
        {/* CUSTOMER INFO */}
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-red-600">
            Step 01
          </p>

          <h3 className="mt-2 text-2xl font-black uppercase">
            Your Information
          </h3>

          <div className="mt-7 grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="mb-2 block text-xs font-black uppercase tracking-wide text-zinc-700"
              >
                First Name *
              </label>

              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                placeholder="First name"
                className="w-full border border-zinc-300 bg-white px-4 py-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="mb-2 block text-xs font-black uppercase tracking-wide text-zinc-700"
              >
                Last Name *
              </label>

              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                placeholder="Last name"
                className="w-full border border-zinc-300 bg-white px-4 py-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-xs font-black uppercase tracking-wide text-zinc-700"
              >
                Phone Number *
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="(843) 555-1234"
                className="w-full border border-zinc-300 bg-white px-4 py-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-black uppercase tracking-wide text-zinc-700"
              >
                Email Address *
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full border border-zinc-300 bg-white px-4 py-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-red-600"
              />
            </div>
          </div>
        </div>

        {/* SERVICE DETAILS */}
        <div className="mt-12 border-t border-zinc-200 pt-10">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-red-600">
            Step 02
          </p>

          <h3 className="mt-2 text-2xl font-black uppercase">
            Cleaning Details
          </h3>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
            Start by choosing Residential or Commercial. The rest of this
            section will automatically update for that type of cleaning.
          </p>

          <div className="mt-7 grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="customerType"
                className="mb-2 block text-xs font-black uppercase tracking-wide text-zinc-700"
              >
                Cleaning Type *
              </label>

              <select
                id="customerType"
                name="customerType"
                required
                value={cleaningType}
                onChange={(event) => {
                  const value = event.target.value as
                    | ""
                    | "residential"
                    | "commercial";
                  setCleaningType(value);
                  setServiceType("");
                  setPropertySize("");
                }}
                className="w-full border border-zinc-300 bg-white px-4 py-4 text-sm outline-none transition focus:border-red-600"
              >
                <option value="" disabled>
                  Select one
                </option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="serviceType"
                className="mb-2 block text-xs font-black uppercase tracking-wide text-zinc-700"
              >
                {cleaningType === "commercial"
                  ? "Commercial Service *"
                  : cleaningType === "residential"
                    ? "Residential Service *"
                    : "Service *"}
              </label>

              <select
                id="serviceType"
                name="serviceType"
                required
                disabled={!cleaningType}
                value={serviceType}
                onChange={(event) => setServiceType(event.target.value)}
                className="w-full border border-zinc-300 bg-white px-4 py-4 text-sm outline-none transition focus:border-red-600 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400"
              >
                <option value="" disabled>
                  {cleaningType
                    ? "Select a service"
                    : "Choose cleaning type first"}
                </option>

                {services.map((service) => (
                  <option key={service.value} value={service.value}>
                    {service.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="propertySize"
                className="mb-2 block text-xs font-black uppercase tracking-wide text-zinc-700"
              >
                {cleaningType === "commercial"
                  ? "Commercial Property Size *"
                  : cleaningType === "residential"
                    ? "Home Size *"
                    : "Home / Property Size *"}
              </label>

              <select
                id="propertySize"
                name="propertySize"
                required
                disabled={!cleaningType}
                value={propertySize}
                onChange={(event) => setPropertySize(event.target.value)}
                className="w-full border border-zinc-300 bg-white px-4 py-4 text-sm outline-none transition focus:border-red-600 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400"
              >
                <option value="" disabled>
                  {cleaningType ? "Select size" : "Choose cleaning type first"}
                </option>

                {propertySizes.map((size) => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="address"
                className="mb-2 block text-xs font-black uppercase tracking-wide text-zinc-700"
              >
                Service Address *
              </label>

              <input
                id="address"
                name="address"
                type="text"
                required
                placeholder="Street address"
                className="w-full border border-zinc-300 bg-white px-4 py-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-red-600"
              />
            </div>
          </div>

          {cleaningType && (
            <div className="mt-6 border-l-4 border-red-600 bg-zinc-50 px-5 py-4">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
                {cleaningType === "residential"
                  ? "Residential Request"
                  : "Commercial Request"}
              </p>
              <p className="mt-1 text-sm leading-6 text-zinc-600">
                {cleaningType === "residential"
                  ? "Residential services, home sizes and add-ons are now shown below."
                  : "Commercial services, facility sizes and commercial add-ons are now shown below."}
              </p>
            </div>
          )}
        </div>

        {/* APPOINTMENT */}
        <div className="mt-12 border-t border-zinc-200 pt-10">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-red-600">
            Step 03
          </p>

          <h3 className="mt-2 text-2xl font-black uppercase">
            Preferred Appointment
          </h3>

          <div className="mt-7 grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="preferredDate"
                className="mb-2 block text-xs font-black uppercase tracking-wide text-zinc-700"
              >
                Preferred Date *
              </label>

              <input
                id="preferredDate"
                name="preferredDate"
                type="date"
                required
                className="w-full border border-zinc-300 bg-white px-4 py-4 text-sm outline-none transition focus:border-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="preferredTime"
                className="mb-2 block text-xs font-black uppercase tracking-wide text-zinc-700"
              >
                Preferred Time *
              </label>

              <select
                id="preferredTime"
                name="preferredTime"
                required
                defaultValue=""
                className="w-full border border-zinc-300 bg-white px-4 py-4 text-sm outline-none transition focus:border-red-600"
              >
                <option value="" disabled>
                  Select preferred time
                </option>

                <option value="morning">
                  Morning
                </option>

                <option value="midday">
                  Midday
                </option>

                <option value="afternoon">
                  Afternoon
                </option>

                <option value="flexible">
                  Flexible
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* ADD-ONS */}
        <div className="mt-12 border-t border-zinc-200 pt-10">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-red-600">
            Step 04
          </p>

          <h3 className="mt-2 text-2xl font-black uppercase">
            {cleaningType === "commercial"
              ? "Commercial Add-On Services"
              : cleaningType === "residential"
                ? "Residential Add-On Services"
                : "Add-On Services"}
          </h3>

          <p className="mt-3 text-sm text-zinc-500">
            {cleaningType
              ? "Select any additional services you’re interested in."
              : "Choose Residential or Commercial above to see the available add-ons."}
          </p>

          {cleaningType ? (
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {addOns.map((item) => (
                <label
                  key={`${cleaningType}-${item}`}
                  className="flex cursor-pointer items-center gap-3 border border-zinc-200 px-4 py-4 transition hover:border-red-600"
                >
                  <input
                    type="checkbox"
                    name="addons"
                    value={item}
                    className="h-4 w-4 accent-red-600"
                  />

                  <span className="text-sm font-semibold text-zinc-700">
                    {item}
                  </span>
                </label>
              ))}
            </div>
          ) : (
            <div className="mt-7 border border-dashed border-zinc-300 bg-zinc-50 px-5 py-6 text-sm text-zinc-500">
              Your available add-ons will appear here after you choose a
              cleaning type.
            </div>
          )}
        </div>

        {/* NOTES */}
        <div className="mt-12 border-t border-zinc-200 pt-10">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-red-600">
            Step 05
          </p>

          <h3 className="mt-2 text-2xl font-black uppercase">
            Anything Else?
          </h3>

          <div className="mt-7">
            <label
              htmlFor="notes"
              className="mb-2 block text-xs font-black uppercase tracking-wide text-zinc-700"
            >
              Notes / Special Instructions
            </label>

            <textarea
              id="notes"
              name="notes"
              rows={6}
              placeholder="Tell us anything else we should know about the property, access, pets, special requests, or cleaning needs."
              className="w-full resize-none border border-zinc-300 bg-white px-4 py-4 text-sm leading-6 outline-none transition placeholder:text-zinc-400 focus:border-red-600"
            />
          </div>
        </div>

        {/* SUBMIT */}
        <div className="mt-10 border-t border-zinc-200 pt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-between bg-red-600 px-6 py-5 text-left text-sm font-black uppercase tracking-wide text-white transition hover:bg-black disabled:cursor-not-allowed disabled:bg-zinc-500 sm:px-8"
          >
            <span>
              {isSubmitting
                ? "Submitting Request..."
                : "Submit Cleaning Request"}
            </span>
            <span className="text-xl">→</span>
          </button>

          {submitMessage && (
            <div
              className={`mt-4 border-l-4 px-4 py-3 text-sm font-semibold ${
                submitStatus === "success"
                  ? "border-green-600 bg-green-50 text-green-800"
                  : "border-red-600 bg-red-50 text-red-700"
              }`}
              role={submitStatus === "error" ? "alert" : "status"}
            >
              {submitMessage}
            </div>
          )}

          <p className="mt-4 text-xs leading-5 text-zinc-500">
            By submitting this request, you understand that your appointment is
            pending until confirmed by Nita&apos;s Cleaning Services.
          </p>
        </div>
      </form>
    </div>
  </div>
</section>

          {/* CONTACT */}
      <section id="contact" className="border-t border-white/10 bg-black">
        <div className="mx-auto max-w-[1500px] px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-red-500">
                Get In Touch
              </p>

              <h2 className="mt-4 text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
                Ready To Schedule
                <br />
                Your Cleaning<span className="text-red-600">.</span>
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400">
                Have a question or prefer to speak with us directly? Contact
                Nita&apos;s Cleaning Services and we&apos;ll be happy to help.
              </p>
            </div>

            <div className="md:justify-self-end">
              <a
                href="tel:8436535138"
                className="block text-3xl font-black text-white transition hover:text-red-500 sm:text-4xl"
              >
                843-653-5138
              </a>

              <a
                href="#request"
                className="mt-6 inline-flex items-center justify-center bg-red-600 px-8 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-red-700"
              >
                Request A Cleaning →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-zinc-950">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-5 px-6 py-8 text-center sm:px-10 md:flex-row md:items-center md:justify-between md:text-left lg:px-16">
          <p className="text-sm font-semibold text-zinc-300">
            Nita&apos;s Cleaning Services
          </p>

          <p className="text-xs text-zinc-500">
            © 2026 Nita&apos;s Cleaning Services. All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}