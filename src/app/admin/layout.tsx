import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "../globals.css";
import { SessionProvider } from "./SessionProvider";

export const dynamic = "force-dynamic";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam",
});

export const metadata: Metadata = { title: "Admin – Linh Đình Travel" };

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={beVietnam.variable}>
      <body className="bg-gray-50 font-sans">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
