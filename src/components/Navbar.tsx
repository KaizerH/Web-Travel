"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const localeNames: Record<string, string> = {
  vi: "🇻🇳 VI",
  en: "🇬🇧 EN",
  zh: "🇨🇳 中文",
};

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/tours`, label: t("tours") },
    { href: `/${locale}/blog`, label: t("blog") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/") || "/");
    setLangOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brand-cream/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Linh Đình Travel"
              width={48}
              height={48}
              className="h-10 w-auto"
            />
            <span className="font-display font-bold text-brand-brown text-lg hidden sm:block">
              Linh Đình Travel
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-brown hover:text-brand-teal transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-sm font-medium text-brand-brown hover:text-brand-teal transition-colors cursor-pointer"
              >
                <Globe size={16} />
                {localeNames[locale]}
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg border border-brand-cream-dark overflow-hidden">
                  {Object.entries(localeNames).map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => switchLocale(code)}
                      className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-brand-cream transition-colors cursor-pointer ${
                        code === locale ? "font-semibold text-brand-teal" : "text-brand-brown"
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href={`/${locale}/contact`} className="btn-primary">
              {t("bookNow")}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 cursor-pointer text-brand-brown"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-brand-cream/98 backdrop-blur-md border-t border-brand-cream-dark">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-base font-medium text-brand-brown hover:text-brand-teal border-b border-brand-cream-dark last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 flex gap-2">
              {Object.entries(localeNames).map(([code, name]) => (
                <button
                  key={code}
                  onClick={() => { switchLocale(code); setOpen(false); }}
                  className={`text-sm px-3 py-1.5 rounded-full border cursor-pointer ${
                    code === locale
                      ? "bg-brand-teal text-white border-brand-teal"
                      : "border-brand-brown text-brand-brown"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
            <Link
              href={`/${locale}/contact`}
              onClick={() => setOpen(false)}
              className="btn-primary mt-3 justify-center"
            >
              {t("bookNow")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
