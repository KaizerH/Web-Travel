"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-brown/80 via-brand-teal/60 to-brand-rust/50" />

      {/* Decorative pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <p className="text-brand-cream/80 text-sm font-medium tracking-[0.25em] uppercase mb-4 animate-fade-in">
          {t("tagline")}
        </p>
        <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-up">
          {t("title")}
        </h1>
        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "100ms" }}>
          {t("subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "200ms" }}>
          <Link href={`/${locale}/tours`} className="btn-primary text-base px-8 py-4">
            {t("cta")}
            <ArrowRight size={18} />
          </Link>
          <a
            href="https://www.facebook.com/profile.php?id=61582714852699"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-white text-base px-8 py-4"
          >
            <MessageCircle size={18} />
            {t("ctaSecondary")}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1.5 h-2.5 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  );
}
