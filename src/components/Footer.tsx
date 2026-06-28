"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Facebook, MessageCircle } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();

  return (
    <footer className="bg-brand-brown text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="Linh Đình Travel" width={44} height={44} className="h-10 w-auto brightness-0 invert" />
              <span className="font-display font-bold text-xl">Linh Đình Travel</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">{t("desc")}</p>
            <p className="text-white/50 text-xs">Travel • Unforgetable China</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">{t("links")}</h4>
            <ul className="space-y-2">
              {[
                { href: `/${locale}`, label: nav("home") },
                { href: `/${locale}/tours`, label: nav("tours") },
                { href: `/${locale}/blog`, label: nav("blog") },
                { href: `/${locale}/contact`, label: nav("contact") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-white mb-4">{t("followUs")}</h4>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61582714852699"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2.5 rounded-full transition-colors cursor-pointer"
              >
                <Facebook size={16} />
                Facebook
              </a>
              <Link
                href={`/${locale}/contact`}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2.5 rounded-full transition-colors cursor-pointer"
              >
                <MessageCircle size={16} />
                WeChat
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-white/40 text-xs">
          © {new Date().getFullYear()} Linh Đình Travel. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
