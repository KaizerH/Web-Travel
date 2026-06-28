"use client";

import { useTranslations, useLocale } from "next-intl";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Facebook, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const t = useTranslations("contact");
  const locale = useLocale();
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
          <div className="space-y-8">
            {/* Facebook */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-cream-dark">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Facebook size={24} className="text-blue-600" />
                </div>
                <h3 className="font-display font-bold text-xl text-brand-brown">Facebook Messenger</h3>
              </div>
              <p className="text-brand-brown-light text-sm mb-5">
                Chat trực tiếp với chúng tôi qua Facebook Messenger để được tư vấn nhanh nhất.
              </p>
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

            {/* WeChat */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-brand-cream-dark">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <MessageCircle size={24} className="text-green-600" />
                </div>
                <h3 className="font-display font-bold text-xl text-brand-brown">WeChat</h3>
              </div>
              <p className="text-brand-brown-light text-sm mb-5">{t("wechatScan")}</p>
              {/* WeChat QR placeholder — replace /images/wechat-qr.png with your actual QR */}
              <div className="w-40 h-40 mx-auto bg-brand-cream rounded-xl flex items-center justify-center border-2 border-dashed border-brand-teal/40">
                <div className="text-center">
                  <MessageCircle size={32} className="text-brand-teal/40 mx-auto mb-2" />
                  <p className="text-xs text-brand-brown-light">WeChat QR Code</p>
                  <p className="text-xs text-brand-teal">(Thêm ảnh QR vào /public/images/wechat-qr.png)</p>
                </div>
              </div>
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
                <label className="block text-sm font-medium text-brand-brown mb-1.5">
                  {t("form.message")}
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-brand-cream-dark rounded-xl px-4 py-3 text-sm text-brand-brown focus:outline-none focus:ring-2 focus:ring-brand-teal/40 bg-brand-cream resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center disabled:opacity-60"
              >
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
