"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Facebook } from "lucide-react";

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
              <Image src="/logo.png" alt="Linh Đình Travel" width={44} height={44} className="h-10 w-auto" />
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
                  <Link href={link.href} className="text-white/70 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-white mb-4">{t("followUs")}</h4>
            <div className="flex flex-col gap-3">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61582714852699"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2.5 rounded-full transition-colors w-fit"
              >
                <Facebook size={16} />
                Facebook
              </a>

              {/* Xiaohongshu (小红书) */}
              <a
                href="https://www.xiaohongshu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2.5 rounded-full transition-colors w-fit"
              >
                {/* XHS logo icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 7.5h-2v5h-1v-5h-2V8h5v1.5zm-8 5h-1V8h1v3.5h1.5v1H8.5z"/>
                </svg>
                小红书 Xiaohongshu
              </a>
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
