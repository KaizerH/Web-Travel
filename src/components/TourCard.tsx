"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, MessageCircle, Users, AlertCircle } from "lucide-react";

interface Departure {
  date: string;
  status: "open" | "private" | "full";
  maxPeople?: number;
  currentBookings?: number;
  registrationCloseDate?: string;
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

function isExpired(closeDate?: string): boolean {
  if (!closeDate) return false;
  const [d, m, y] = closeDate.split("/").map(Number);
  return new Date(y, m - 1, d) < new Date();
}

function isSoonClosing(closeDate?: string): boolean {
  if (!closeDate) return false;
  const [d, m, y] = closeDate.split("/").map(Number);
  const diff = new Date(y, m - 1, d).getTime() - Date.now();
  return diff > 0 && diff < 7 * 24 * 60 * 60 * 1000; // within 7 days
}

export default function TourCard({ slug, title, destination, duration, departures, coverImage, featured }: TourCardProps) {
  const t = useTranslations("tours");
  const locale = useLocale();
  const localTitle = title[locale] || title["vi"] || "";
  const nextDep = departures[0];

  // Compute effective status
  const effectiveStatus = (dep: Departure): "open" | "private" | "full" | "closed" => {
    if (dep.status === "full") return "full";
    if (isExpired(dep.registrationCloseDate)) return "closed";
    if (dep.maxPeople && dep.currentBookings && dep.currentBookings >= dep.maxPeople) return "full";
    return dep.status;
  };

  const statusClass: Record<string, string> = {
    open: "tag-open",
    private: "tag-private",
    full: "tag-full",
    closed: "tag-full",
  };

  const statusLabel: Record<string, string> = {
    open: t("status.open"),
    private: t("status.private"),
    full: t("status.full"),
    closed: "Đã đóng ĐKý",
  };

  const slotsLeft = nextDep?.maxPeople && nextDep?.currentBookings !== undefined
    ? nextDep.maxPeople - nextDep.currentBookings
    : null;

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

        <div className="flex items-center gap-4 text-sm text-brand-brown-light mb-3">
          <span className="flex items-center gap-1.5"><Clock size={14} />{duration} {t("days")}</span>
          {nextDep && (
            <span className="flex items-center gap-1.5"><Calendar size={14} />{nextDep.date}</span>
          )}
        </div>

        {/* Capacity bar */}
        {nextDep?.maxPeople && nextDep.currentBookings !== undefined && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs text-brand-brown-light mb-1">
              <span className="flex items-center gap-1"><Users size={12} /> {nextDep.currentBookings}/{nextDep.maxPeople} người</span>
              {slotsLeft !== null && slotsLeft <= 3 && slotsLeft > 0 && (
                <span className="text-brand-rust font-semibold flex items-center gap-1">
                  <AlertCircle size={12} /> Còn {slotsLeft} chỗ!
                </span>
              )}
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  nextDep.currentBookings / nextDep.maxPeople >= 0.9 ? "bg-brand-rust" :
                  nextDep.currentBookings / nextDep.maxPeople >= 0.6 ? "bg-amber-400" : "bg-brand-teal"
                }`}
                style={{ width: `${Math.min(100, (nextDep.currentBookings / nextDep.maxPeople) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Close date warning */}
        {nextDep?.registrationCloseDate && isSoonClosing(nextDep.registrationCloseDate) && (
          <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs px-3 py-1.5 rounded-lg mb-3">
            <AlertCircle size={12} />
            Đóng ĐKý: {nextDep.registrationCloseDate}
          </div>
        )}

        {/* Status tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {departures.slice(0, 3).map((dep, i) => {
            const es = effectiveStatus(dep);
            return (
              <span key={i} className={statusClass[es]}>
                {es === "open" ? dep.date : statusLabel[es]}
              </span>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/${locale}/tours/${slug}`}
            className="flex-1 flex items-center justify-center gap-1.5 bg-brand-cream hover:bg-brand-teal/10 text-brand-teal text-sm font-semibold py-2.5 rounded-xl transition-colors"
          >
            {t("viewDetail")} <ArrowRight size={14} />
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
