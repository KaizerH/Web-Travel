import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { connectDB } from "@/lib/mongodb";
import { Tour } from "@/models/Tour";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Facebook, ArrowLeft, CheckCircle, XCircle, Users, AlertCircle } from "lucide-react";
import TourGallery from "@/components/TourGallery";

function isExpired(closeDate?: string): boolean {
  if (!closeDate) return false;
  const [d, m, y] = closeDate.split("/").map(Number);
  return new Date(y, m - 1, d) < new Date();
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations("tours");

  let tour: Record<string, unknown> | null = null;

  try {
    await connectDB();
    tour = await Tour.findOne({ slug, published: true }).lean() as Record<string, unknown> | null;
  } catch {
    // DB fallback handled below
  }

  if (!tour) notFound();

  const title = (tour.title as Record<string, string>)[locale] || (tour.title as Record<string, string>)["vi"];
  const description = tour.description ? (tour.description as Record<string, string>)[locale] || (tour.description as Record<string, string>)["vi"] : "";
  const departures = (tour.departures as Record<string, unknown>[]) || [];
  const gallery = (tour.images as string[]) || [];

  const statusClass: Record<string, string> = {
    open: "tag-open",
    private: "tag-private",
    full: "tag-full",
  };

  const effectiveLabel = (dep: Record<string, unknown>): { label: string; cls: string } => {
    if (dep.status === "full") return { label: t("status.full"), cls: "tag-full" };
    if (isExpired(dep.registrationCloseDate as string)) return { label: "Đã đóng ĐKý", cls: "tag-full" };
    if (dep.maxPeople && dep.currentBookings && (dep.currentBookings as number) >= (dep.maxPeople as number))
      return { label: t("status.full"), cls: "tag-full" };
    if (dep.status === "private") return { label: t("status.private"), cls: "tag-private" };
    return { label: t("status.open"), cls: "tag-open" };
  };

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <div className="relative h-72 md:h-96 bg-brand-brown">
          <Image
            src={(tour.coverImage as string) || "/images/placeholder-tour.jpg"}
            alt={title}
            fill
            className="object-cover opacity-50"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-8 max-w-4xl mx-auto w-full">
            <Link href={`/${locale}/tours`} className="flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4 w-fit">
              <ArrowLeft size={16} />
              {t("viewAll")}
            </Link>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white">{title}</h1>
            <div className="flex items-center gap-6 mt-3 text-white/80 text-sm">
              <span className="flex items-center gap-1.5"><Clock size={14} /> {tour.duration as number} {t("days")}</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {(tour.destination as string)}</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="md:col-span-2 space-y-8">
            {description && (
              <div>
                <h2 className="font-display text-xl font-bold text-brand-brown mb-3">Giới thiệu</h2>
                <p className="text-brand-brown-light leading-relaxed">{description}</p>
              </div>
            )}

            {/* Gallery */}
            {gallery.length > 0 && (
              <div>
                <h2 className="font-display text-xl font-bold text-brand-brown mb-4">Bộ ảnh tour</h2>
                <TourGallery images={gallery} title={title} />
              </div>
            )}

            {/* Includes / Excludes */}
            {(tour.includes as string[])?.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-brand-brown mb-3 flex items-center gap-2"><CheckCircle size={16} className="text-brand-teal" /> Bao gồm</h3>
                  <ul className="space-y-1.5">
                    {(tour.includes as string[]).map((item, i) => (
                      <li key={i} className="text-sm text-brand-brown-light flex items-start gap-2">
                        <span className="text-brand-teal mt-0.5">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-brand-brown mb-3 flex items-center gap-2"><XCircle size={16} className="text-brand-rust" /> Không bao gồm</h3>
                  <ul className="space-y-1.5">
                    {(tour.excludes as string[]).map((item, i) => (
                      <li key={i} className="text-sm text-brand-brown-light flex items-start gap-2">
                        <span className="text-brand-rust mt-0.5">✗</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar booking */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-brand-cream-dark sticky top-24">
              <h3 className="font-display font-bold text-brand-brown text-lg mb-4">{t("departures")}</h3>
              <div className="space-y-3 mb-6">
                {departures.map((dep, i) => {
                  const { label, cls } = effectiveLabel(dep);
                  const max = dep.maxPeople as number | undefined;
                  const booked = dep.currentBookings as number | undefined;
                  const slotsLeft = max && booked !== undefined ? max - booked : null;
                  return (
                    <div key={i} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-brand-brown font-medium">{dep.date as string}</span>
                        <span className={cls}>{label}</span>
                      </div>
                      {max !== undefined && booked !== undefined && (
                        <div>
                          <div className="flex items-center justify-between text-xs text-brand-brown-light mb-1">
                            <span className="flex items-center gap-1"><Users size={10} /> {booked}/{max} người</span>
                            {slotsLeft !== null && slotsLeft <= 5 && slotsLeft > 0 && (
                              <span className="text-brand-rust font-semibold flex items-center gap-1">
                                <AlertCircle size={10} /> Còn {slotsLeft} chỗ
                              </span>
                            )}
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                booked / max >= 0.9 ? "bg-brand-rust" :
                                booked / max >= 0.6 ? "bg-amber-400" : "bg-brand-teal"
                              }`}
                              style={{ width: `${Math.min(100, (booked / max) * 100)}%` }}
                            />
                          </div>
                        </div>
                      )}
                      {dep.registrationCloseDate && !isExpired(dep.registrationCloseDate as string) && (
                        <p className="text-xs text-brand-brown-light">Đóng ĐKý: {dep.registrationCloseDate as string}</p>
                      )}
                    </div>
                  );
                })}
              </div>
              <a
                href="https://www.facebook.com/profile.php?id=61582714852699"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
              >
                <Facebook size={16} />
                {t("bookTour")}
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
