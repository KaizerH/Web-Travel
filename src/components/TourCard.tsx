"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, MessageCircle } from "lucide-react";

interface Departure {
  date: string;
  status: "open" | "private" | "full";
}

interface TourCardProps {
  slug: string;
  title: Record<string, string>;
  destination: string;
  duration: number;
  departures: Departure[];
  coverImage?: string;
  featured?: boolean;
}

export default function TourCard({ slug, title, destination, duration, departures, coverImage, featured }: TourCardProps) {
  const t = useTranslations("tours");
  const locale = useLocale();

  const localTitle = title[locale] || title["vi"] || "";
  const nextDeparture = departures[0];

  const statusClass: Record<string, string> = {
    open: "tag-open",
    private: "tag-private",
    full: "tag-full",
  };

  const statusLabel: Record<string, string> = {
    open: t("status.open"),
    private: t("status.private"),
    full: t("status.full"),
  };

  return (
    <div className="card group cursor-pointer">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={coverImage || "/images/placeholder-tour.jpg"}
          alt={localTitle}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {featured && (
          <span className="absolute top-3 left-3 bg-brand-rust text-white text-xs font-bold px-3 py-1 rounded-full">
            Featured
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/60 to-transparent" />
        <p className="absolute bottom-3 left-3 text-white font-semibold text-sm">📍 {destination}</p>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-bold text-brand-brown text-lg leading-snug mb-3 line-clamp-2">
          {localTitle}
        </h3>

        <div className="flex items-center gap-4 text-sm text-brand-brown-light mb-4">
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {duration} {t("days")}
          </span>
          {nextDeparture && (
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {nextDeparture.date}
            </span>
          )}
        </div>

        {/* Status tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {departures.slice(0, 3).map((dep, i) => (
            <span key={i} className={statusClass[dep.status]}>
              {dep.status === "private" ? dep.date : statusLabel[dep.status]}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/${locale}/tours/${slug}`}
            className="flex-1 flex items-center justify-center gap-1.5 bg-brand-cream hover:bg-brand-teal/10 text-brand-teal text-sm font-semibold py-2.5 rounded-xl transition-colors"
          >
            {t("viewDetail")}
            <ArrowRight size={14} />
          </Link>
          <a
            href="https://www.facebook.com/profile.php?id=61582714852699"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 bg-brand-rust text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-brand-rust-dark transition-colors"
          >
            <MessageCircle size={14} />
            {t("bookTour")}
          </a>
        </div>
      </div>
    </div>
  );
}
