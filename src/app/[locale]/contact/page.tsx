"use client";

import { useTranslations } from "next-intl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Facebook, Send } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", tour: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success(t("form.success"));
        setForm({ name: "", email: "", phone: "", tour: "", message: "" });
      } else {
        toast.error(t("form.error"));
      }
    } catch {
      toast.error(t("form.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen">
        {/* Header */}
        <div className="bg-brand-brown py-16 text-center">
          <h1 className="font-display text-4xl font-bold text-white mb-2">{t("title")}</h1>
          <p className="text-white/70">{t("subtitle")}</p>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: contact options */}
          <div className="space-y-6">
            {/* Facebook */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-cream-dark">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Facebook size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-brand-brown">Facebook Messenger</h3>
                  <p className="text-brand-brown-light text-xs">Chat trực tiếp – phản hồi nhanh nhất</p>
                </div>
              </div>
              <a
                href="https://www.facebook.com/profile.php?id=61582714852699"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
              >
                <Facebook size={18} />
                {t("facebook")}
              </a>
            </div>

            {/* WeChat QR */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-cream-dark">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-green-600" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-brand-brown">WeChat</h3>
                  <p className="text-brand-brown-light text-xs">{t("wechatScan")}</p>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex justify-center">
                <div className="relative w-52 h-52 rounded-xl overflow-hidden border border-brand-cream-dark">
                  <Image
                    src="/images/wechat-qr.png"
                    alt="WeChat QR – Call me Bum 小玲"
                    fill
                    className="object-contain p-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                      (e.target as HTMLImageElement).parentElement!.innerHTML =
                        '<div class="w-full h-full flex flex-col items-center justify-center gap-2 text-center"><p class="text-xs text-brand-brown-light px-4">QR WeChat<br/>Call me Bum 小玲</p><p class="text-xs text-brand-teal">(Đặt ảnh QR vào /public/images/wechat-qr.png)</p></div>';
                    }}
                  />
                </div>
              </div>
              <p className="text-center text-xs text-brand-brown-light mt-3">Call me Bum 小玲 · Việt Nam</p>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-cream-dark">
            <h3 className="font-display font-bold text-xl text-brand-brown mb-6">Gửi yêu cầu tư vấn</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { name: "name", label: t("form.name"), type: "text", required: true },
                { name: "email", label: t("form.email"), type: "email", required: true },
                { name: "phone", label: t("form.phone"), type: "tel", required: true },
                { name: "tour", label: t("form.tour"), type: "text", required: false },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-brand-brown mb-1.5">
                    {field.label} {field.required && <span className="text-brand-rust">*</span>}
                  </label>
                  <input
                    type={field.type}
                    required={field.required}
                    value={form[field.name as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                    className="w-full border border-brand-cream-dark rounded-xl px-4 py-3 text-sm text-brand-brown focus:outline-none focus:ring-2 focus:ring-brand-teal/40 bg-brand-cream"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-brand-brown mb-1.5">{t("form.message")}</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-brand-cream-dark rounded-xl px-4 py-3 text-sm text-brand-brown focus:outline-none focus:ring-2 focus:ring-brand-teal/40 bg-brand-cream resize-none"
                />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
                <Send size={16} />
                {loading ? "Đang gửi..." : t("form.submit")}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
