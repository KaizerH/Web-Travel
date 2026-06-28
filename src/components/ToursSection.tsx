"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import TourCard from "./TourCard";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface Tour {
  slug: string;
  title: Record<string, string>;
  destination: string;
  duration: number;
  departures: { date: string; status: "open" | "private" | "full" }[];
  coverImage?: string;
  featured?: boolean;
}

export default function ToursSection() {
  const t = useTranslations("tours");
  const locale = useLocale();
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    fetch("/api/tours?featured=1")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setTours(data.slice(0, 4));
      })
      .catch(() => {});
  }, []);

  if (tours.length === 0) return null;

  return (
    <section className="py-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-title mb-2">{t("title")}</h2>
          <p className="text-brand-rust font-medium text-sm tracking-wide italic">{t("subtitle")}</p>
          <div className="w-16 h-1 bg-brand-teal rounded-full mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.slug} {...tour} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href={`/${locale}/tours`} className="btn-secondary">
            {t("viewAll")}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
