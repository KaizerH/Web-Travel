export const dynamic = "force-dynamic";

import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TourCard from "@/components/TourCard";
import { connectDB } from "@/lib/mongodb";
import { Tour } from "@/models/Tour";

export default async function ToursPage() {
  const t = await getTranslations("tours");

  let tours: Array<{
    slug: string;
    title: Record<string, string>;
    destination: string;
    duration: number;
    departures: { date: string; status: "open" | "private" | "full" }[];
    coverImage?: string;
    featured?: boolean;
  }> = [];

  try {
    await connectDB();
    const dbTours = await Tour.find({ published: true }).sort({ featured: -1, createdAt: -1 }).lean();
    tours = dbTours.map((t: Record<string, unknown>) => ({
      slug: t.slug as string,
      title: t.title as Record<string, string>,
      destination: t.destination as string,
      duration: t.duration as number,
      departures: t.departures as { date: string; status: "open" | "private" | "full" }[],
      coverImage: t.coverImage as string | undefined,
      featured: t.featured as boolean | undefined,
    }));
  } catch (e) {
    console.error("[ToursPage] DB error:", e);
    tours = SAMPLE_TOURS;
  }

  if (tours.length === 0) {
    console.log("[ToursPage] DB returned 0 tours, using sample data");
    tours = SAMPLE_TOURS;
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Page hero */}
        <div className="relative bg-brand-brown pt-32 pb-16 text-center">
          <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }} />
          <div className="relative z-10">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">{t("title")}</h1>
            <p className="text-white/70 italic">{t("subtitle")}</p>
          </div>
        </div>

        <section className="py-16 bg-brand-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tours.map((tour) => (
                <TourCard key={tour.slug} {...tour} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

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
    departures: [{ date: "19-28/06/2026", status: "open" as const }],
    coverImage: "/images/xinjiang.jpg",
    featured: false,
  },
  {
    slug: "ladakh-2026",
    title: { vi: "Ladakh – Ấn Độ Huyền Bí", en: "Ladakh – Mystical India", zh: "拉达克——神秘印度" },
    destination: "Ladakh, Ấn Độ",
    duration: 9,
    departures: [{ date: "28/8-05/9/2026", status: "open" as const }],
    coverImage: "/images/ladakh.jpg",
    featured: false,
  },
  {
    slug: "cap-nhi-tan-dec-2026",
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
