import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Linh Đình Travel – Unforgetable China",
  description: "Chuyên tổ chức tour du lịch Trung Quốc và dịch vụ hướng dẫn viên tại Việt Nam",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
