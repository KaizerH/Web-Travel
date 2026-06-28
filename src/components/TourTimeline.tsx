"use client";

import Image from "next/image";
import { useState } from "react";

interface ItineraryDay {
  day: number;
  titleVi?: string; titleEn?: string; titleZh?: string;
  descVi?: string; descEn?: string; descZh?: string;
  images?: string[];
}

interface Props {
  itinerary: ItineraryDay[];
  locale: string;
}

export default function TourTimeline({ itinerary, locale }: Props) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (!itinerary || itinerary.length === 0) return null;

  const getTitle = (day: ItineraryDay) =>
    (locale === "zh" ? day.titleZh : locale === "en" ? day.titleEn : day.titleVi) || day.titleVi || "";

  const getDesc = (day: ItineraryDay) =>
    (locale === "zh" ? day.descZh : locale === "en" ? day.descEn : day.descVi) || day.descVi || "";

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-teal via-brand-teal/40 to-transparent md:left-1/2 md:-translate-x-px" />

      <div className="space-y-0">
        {itinerary.map((day, idx) => {
          const isRight = idx % 2 === 0;
          const title = getTitle(day);
          const desc = getDesc(day);

          return (
            <div key={day.day} className="relative flex md:items-start gap-0">
              {/* Mobile: always left aligned */}
              <div className="flex md:hidden flex-col items-center mr-4 flex-shrink-0">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md z-10 ${
                  idx === 0 ? "bg-brand-rust" : "bg-brand-teal"
                }`}>
                  N{day.day}
                </div>
                {idx < itinerary.length - 1 && <div className="w-0.5 flex-1 bg-brand-teal/20 min-h-8" />}
              </div>

              {/* Desktop: alternating layout */}
              <div className={`hidden md:flex w-full gap-8 pb-12 ${isRight ? "flex-row" : "flex-row-reverse"}`}>
                {/* Content side */}
                <div className="flex-1">
                  <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${isRight ? "mr-4" : "ml-4"}`}>
                    {/* Day images */}
                    {day.images && day.images.length > 0 && (
                      <div className={`grid gap-1 ${day.images.length === 1 ? "grid-cols-1" : day.images.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                        {day.images.slice(0, 3).map((img, i) => (
                          <div key={i} className="relative h-48 cursor-pointer" onClick={() => setLightbox(img)}>
                            <Image src={img} alt={`Day ${day.day} - ${i + 1}`} fill className="object-cover hover:opacity-90 transition-opacity" />
                            {i === 2 && day.images!.length > 3 && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-lg">
                                +{day.images!.length - 3}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="p-5">
                      <h4 className="font-display font-bold text-brand-brown text-base mb-2">{title}</h4>
                      <p className="text-brand-brown-light text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div className="flex flex-col items-center flex-shrink-0 relative z-10">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border-4 border-white ${
                    idx === 0 ? "bg-brand-rust" : "bg-brand-teal"
                  }`}>
                    N{day.day}
                  </div>
                </div>

                {/* Empty side */}
                <div className="flex-1" />
              </div>

              {/* Mobile content */}
              <div className="md:hidden flex-1 pb-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {day.images && day.images.length > 0 && (
                    <div className={`grid gap-1 ${day.images.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
                      {day.images.slice(0, 2).map((img, i) => (
                        <div key={i} className="relative h-36 cursor-pointer" onClick={() => setLightbox(img)}>
                          <Image src={img} alt={`Day ${day.day}`} fill className="object-cover" />
                          {i === 1 && day.images!.length > 2 && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold">
                              +{day.images!.length - 2}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="p-4">
                    <h4 className="font-display font-bold text-brand-brown text-sm mb-1.5">{title}</h4>
                    <p className="text-brand-brown-light text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full">
            <Image src={lightbox} alt="Lightbox" fill className="object-contain" />
          </div>
          <button className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl">✕</button>
        </div>
      )}
    </div>
  );
}
