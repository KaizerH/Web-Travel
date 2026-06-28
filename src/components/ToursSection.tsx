"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import TourCard from "./TourCard";
import { ArrowRight } from "lucide-react";

const SAMPLE_TOURS = [
  {
    slug: "thuong-hai-2026",
    title: { vi: "Thượng Hải – Thành phố không ngủ", en: "Shanghai – The City That Never Sleeps", zh: "上海——不夜城" },
    destination: "Thượng Hải, Trung Quốc",
    duration: 7,
    departures: [
      { date: "07-13/06/2026", status: "private" as const },
      { date: "26/11-01/12/2026", status: "open" as const },
    ],
    coverImage: "/images/shanghai.jpg",
    featured: true,
  },
  {
    slug: "bac-kinh-2026",
    title: { vi: "Bắc Kinh – Cố Đô Ngàn Năm", en: "Beijing – The Ancient Capital", zh: "北京——千年古都" },
    destination: "Bắc Kinh, Trung Quốc",
    duration: 5,
    departures: [
      { date: "13-17/06/2026", status: "private" as const },
      { date: "29/10-03/11/2026", status: "open" as const },
      { date: "05-10/11/2026", status: "open" as const },
    ],
    coverImage: "/images/beijing.jpg",
    featured: true,
  },
  {
    slug: "tan-cuong-2026",
    title: { vi: "Tân Cương – Miền Tây Hoang Dã", en: "Xinjiang – The Wild West", zh: "新疆——狂野西部" },
    destination: "Tân Cương, Trung Quốc",
    duration: 10,
    departures: [
      { date: "19-28/06/2026", status: "open" as const },
    ],
    coverImage: "/images/xinjiang.jpg",
    featured: false,
  },
  {
    slug: "cap-nhi-tan-2026",
    title: { vi: "Cáp Nhĩ Tân – Thành Phố Băng Tuyết", en: "Harbin – Ice & Snow City", zh: "哈尔滨——冰雪之城" },
    destination: "Cáp Nhĩ Tân, Trung Quốc",
    duration: 6,
    departures: [
      { date: "17-22/12/2026", status: "open" as const },
      { date: "30/12/2026-05/01/2027", status: "open" as const },
    ],
    coverImage: "/images/harbin.jpg",
    featured: false,
  },
];

export default function ToursSection() {
  const t = useTranslations("tours");
  const locale = useLocale();

  return (
    <section className="py-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-title mb-2">{t("title")}</h2>
          <p className="text-brand-rust font-medium text-sm tracking-wide italic">{t("subtitle")}</p>
          <div className="w-16 h-1 bg-brand-teal rounded-full mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_TOURS.map((tour) => (
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
