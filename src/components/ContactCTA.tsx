"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Facebook, MessageCircle } from "lucide-react";

export default function ContactCTA() {
  const t = useTranslations("contact");
  const locale = useLocale();

  return (
    <section className="py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1600&q=80')" }}
      />
      <div className="absolute inset-0 bg-brand-teal/75" />

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">{t("title")}</h2>
        <p className="text-white/80 text-lg mb-10">{t("subtitle")}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.facebook.com/profile.php?id=61582714852699"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-white text-brand-teal font-semibold text-base px-8 py-4 rounded-full hover:bg-brand-cream transition-colors cursor-pointer"
          >
            <Facebook size={20} />
            {t("facebook")}
          </a>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center gap-3 bg-brand-rust text-white font-semibold text-base px-8 py-4 rounded-full hover:bg-brand-rust-dark transition-colors cursor-pointer"
          >
            <MessageCircle size={20} />
            {t("wechat")}
          </Link>
        </div>
      </div>
    </section>
  );
}
