"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function TourGallery({ images, title }: { images: string[]; title: string }) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () => setLightbox(i => (i !== null ? (i - 1 + images.length) % images.length : null));
  const next = () => setLightbox(i => (i !== null ? (i + 1) % images.length : null));

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setLightbox(i)}
            className={`relative overflow-hidden rounded-xl cursor-pointer group ${
              i === 0 && images.length >= 3 ? "col-span-2 row-span-2 h-64" : "h-32"
            }`}
          >
            <Image
              src={src}
              alt={`${title} - ảnh ${i + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {i === images.length - 1 && images.length > 6 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-bold text-lg">+{images.length - 5} ảnh</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={e => { e.stopPropagation(); setLightbox(null); }}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 cursor-pointer"
          >
            <X size={28} />
          </button>
          <button
            onClick={e => { e.stopPropagation(); prev(); }}
            className="absolute left-4 text-white/80 hover:text-white p-3 cursor-pointer rounded-full bg-black/30 hover:bg-black/50"
          >
            <ChevronLeft size={28} />
          </button>
          <div
            className="relative w-full max-w-4xl max-h-[85vh] mx-16"
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={images[lightbox]}
              alt={`${title} - ảnh ${lightbox + 1}`}
              width={1200}
              height={800}
              className="object-contain w-full max-h-[85vh] rounded-xl"
            />
            <p className="absolute bottom-3 left-0 right-0 text-center text-white/60 text-sm">
              {lightbox + 1} / {images.length}
            </p>
          </div>
          <button
            onClick={e => { e.stopPropagation(); next(); }}
            className="absolute right-4 text-white/80 hover:text-white p-3 cursor-pointer rounded-full bg-black/30 hover:bg-black/50"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </>
  );
}
