import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Toaster } from "react-hot-toast";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Linh Đình Travel",
    default: "Linh Đình Travel – Unforgetable China",
  },
  description: "China Photo Trip & Small Group Tours. Dịch vụ hướng dẫn viên du lịch Trung Quốc chuyên nghiệp.",
  keywords: ["tour trung quoc", "china travel", "中国旅游", "photo trip china", "linh dinh travel"],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "vi" | "en" | "zh")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${beVietnam.variable} ${playfair.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster position="bottom-center" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
