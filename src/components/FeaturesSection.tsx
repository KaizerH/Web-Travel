"use client";

import { useTranslations } from "next-intl";
import { UserCheck, Camera, Utensils, Users } from "lucide-react";

const features = [
  { key: "guide", icon: UserCheck, color: "bg-brand-teal/10 text-brand-teal" },
  { key: "photo", icon: Camera, color: "bg-brand-rust/10 text-brand-rust" },
  { key: "food", icon: Utensils, color: "bg-amber-50 text-amber-600" },
  { key: "small", icon: Users, color: "bg-brand-teal/10 text-brand-teal" },
] as const;

export default function FeaturesSection() {
  const t = useTranslations("features");

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title text-center mb-3">{t("title")}</h2>
        <div className="w-16 h-1 bg-brand-rust rounded-full mx-auto mb-14" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ key, icon: Icon, color }) => (
            <div
              key={key}
              className="text-center group"
            >
              <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={28} />
              </div>
              <h3 className="font-display font-semibold text-lg text-brand-brown mb-2">
                {t(`${key}.title`)}
              </h3>
              <p className="text-brand-brown-light text-sm leading-relaxed">
                {t(`${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
