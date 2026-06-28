"use client";

import { useState, useEffect, useRef } from "react";
import { X, Plus, Trash2, Upload, ImageIcon } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import Image from "next/image";
import toast from "react-hot-toast";

interface Departure {
  date: string;
  status: "open" | "private" | "full";
  maxPeople: number;
  currentBookings: number;
  registrationCloseDate: string;
}

interface TourForm {
  slug: string;
  titleVi: string; titleEn: string; titleZh: string;
  descVi: string; descEn: string; descZh: string;
  destination: string;
  duration: number;
  departures: Departure[];
  coverImage: string;
  images: string[];
  highlightsText: string;
  includesText: string;
  excludesText: string;
  category: string;
  featured: boolean;
  published: boolean;
}

const DEFAULT_DEP: Departure = { date: "", status: "open", maxPeople: 15, currentBookings: 0, registrationCloseDate: "" };

const DEFAULT: TourForm = {
  slug: "", titleVi: "", titleEn: "", titleZh: "",
  descVi: "", descEn: "", descZh: "",
  destination: "", duration: 5,
  departures: [{ ...DEFAULT_DEP }],
  coverImage: "",
  images: [],
  highlightsText: "", includesText: "", excludesText: "",
  category: "china", featured: false, published: true,
};

function toSlug(s: string) {
  return s.toLowerCase()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a")
    .replace(/[èéẹẻẽêềếệểễ]/g, "e")
    .replace(/[ìíịỉĩ]/g, "i")
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
    .replace(/[ùúụủũưừứựửữ]/g, "u")
    .replace(/[ỳýỵỷỹ]/g, "y")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function GalleryUpload({ images, onChange }: { images: string[]; onChange: (imgs: string[]) => void }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (res.ok) {
        const data = await res.json();
        uploaded.push(data.url);
      }
    }
    onChange([...images, ...uploaded]);
    setUploading(false);
  };

  const remove = (idx: number) => onChange(images.filter((_, i) => i !== idx));

  return (
    <div>
      <label className="block text-sm font-medium text-brand-brown mb-2">
        🖼 Bộ ảnh gallery <span className="text-gray-400 font-normal">({images.length} ảnh)</span>
      </label>

      {/* Grid of uploaded images */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-3">
          {images.map((img, i) => (
            <div key={i} className="relative h-24 rounded-xl overflow-hidden group border border-gray-100">
              <Image src={img} alt={`gallery-${i}`} fill className="object-cover" />
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={e => handleFiles(e.target.files)}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-brand-teal hover:text-brand-teal transition-colors cursor-pointer w-full justify-center"
      >
        {uploading ? (
          <><div className="w-4 h-4 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" /> Đang tải lên...</>
        ) : (
          <><Upload size={14} /> Chọn ảnh (có thể chọn nhiều)</>
        )}
      </button>
    </div>
  );
}

export default function TourModal({ tour, onClose, onSaved }: {
  tour: Record<string, unknown> | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<TourForm>(DEFAULT);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"basic" | "gallery" | "details" | "schedule">("basic");

  useEffect(() => {
    if (tour) {
      const t = tour as Record<string, unknown>;
      const title = t.title as Record<string, string>;
      const desc = t.description as Record<string, string> | undefined;
      const rawDeps = (t.departures as Record<string, unknown>[]) || [];
      setForm({
        slug: t.slug as string || "",
        titleVi: title?.vi || "", titleEn: title?.en || "", titleZh: title?.zh || "",
        descVi: desc?.vi || "", descEn: desc?.en || "", descZh: desc?.zh || "",
        destination: t.destination as string || "",
        duration: t.duration as number || 5,
        departures: rawDeps.length > 0 ? rawDeps.map(d => ({
          date: d.date as string || "",
          status: (d.status as "open" | "private" | "full") || "open",
          maxPeople: (d.maxPeople as number) ?? 15,
          currentBookings: (d.currentBookings as number) ?? 0,
          registrationCloseDate: d.registrationCloseDate as string || "",
        })) : [{ ...DEFAULT_DEP }],
        coverImage: t.coverImage as string || "",
        images: (t.images as string[]) || [],
        highlightsText: ((t.highlights as string[]) || []).join("\n"),
        includesText: ((t.includes as string[]) || []).join("\n"),
        excludesText: ((t.excludes as string[]) || []).join("\n"),
        category: t.category as string || "china",
        featured: t.featured as boolean || false,
        published: t.published as boolean ?? true,
      });
    } else {
      setForm(DEFAULT);
    }
  }, [tour]);

  const set = (key: keyof TourForm, val: unknown) => setForm(f => ({ ...f, [key]: val }));

  const addDeparture = () => set("departures", [...form.departures, { ...DEFAULT_DEP }]);
  const removeDeparture = (i: number) => set("departures", form.departures.filter((_, idx) => idx !== i));
  const updateDeparture = (i: number, key: keyof Departure, val: string | number) => {
    const updated = [...form.departures];
    updated[i] = { ...updated[i], [key]: val };
    set("departures", updated);
  };

  const save = async () => {
    if (!form.titleVi || !form.destination) {
      toast.error("Vui lòng điền tên tour và điểm đến");
      return;
    }
    setSaving(true);
    const payload = {
      slug: form.slug || toSlug(form.titleVi) + "-" + new Date().getFullYear(),
      title: { vi: form.titleVi, en: form.titleEn, zh: form.titleZh },
      description: { vi: form.descVi, en: form.descEn, zh: form.descZh },
      destination: form.destination,
      duration: form.duration,
      departures: form.departures.filter(d => d.date),
      coverImage: form.coverImage,
      images: form.images,
      highlights: form.highlightsText.split("\n").filter(Boolean),
      includes: form.includesText.split("\n").filter(Boolean),
      excludes: form.excludesText.split("\n").filter(Boolean),
      category: form.category,
      featured: form.featured,
      published: form.published,
    };

    const url = tour ? `/api/tours/${(tour as Record<string, string>)._id}` : "/api/tours";
    const method = tour ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) {
      toast.success(tour ? "Đã cập nhật tour!" : "Đã tạo tour mới!");
      onSaved();
    } else {
      toast.error("Có lỗi xảy ra");
    }
  };

  const tabs = [
    { key: "basic", label: "📝 Nội dung" },
    { key: "gallery", label: "🖼 Ảnh" },
    { key: "details", label: "✅ Chi tiết" },
    { key: "schedule", label: "📅 Lịch KH" },
  ] as const;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-display font-bold text-xl text-brand-brown">
            {tour ? "Chỉnh sửa Tour" : "Thêm Tour Mới"}
          </h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 cursor-pointer">
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-6">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                tab === t.key ? "border-brand-teal text-brand-teal" : "border-transparent text-gray-500 hover:text-brand-brown"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {tab === "basic" && (
            <>
              <ImageUpload value={form.coverImage} onChange={v => set("coverImage", v)} label="Ảnh bìa tour" />

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-brand-brown mb-1.5">Tên tour (Tiếng Việt) <span className="text-red-500">*</span></label>
                  <input value={form.titleVi} onChange={e => set("titleVi", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/30" placeholder="VD: Bắc Kinh – Cố Đô Ngàn Năm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-brown mb-1.5">Tên tour (English)</label>
                  <input value={form.titleEn} onChange={e => set("titleEn", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/30" placeholder="Beijing – The Ancient Capital" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-brown mb-1.5">Tên tour (中文)</label>
                  <input value={form.titleZh} onChange={e => set("titleZh", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/30" placeholder="北京——千年古都" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-brown mb-1.5">Điểm đến <span className="text-red-500">*</span></label>
                  <input value={form.destination} onChange={e => set("destination", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/30" placeholder="Bắc Kinh, Trung Quốc" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-brown mb-1.5">Số ngày</label>
                  <input type="number" min={1} value={form.duration} onChange={e => set("duration", Number(e.target.value))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/30" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-brown mb-1.5">Mô tả chi tiết (Tiếng Việt)</label>
                <textarea rows={4} value={form.descVi} onChange={e => set("descVi", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/30 resize-none"
                  placeholder="Mô tả hành trình, điểm nổi bật của tour..." />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-brand-brown mb-1.5">Danh mục</label>
                  <select value={form.category} onChange={e => set("category", e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-none">
                    <option value="china">🇨🇳 Tour Trung Quốc</option>
                    <option value="vietnam-guide">🇻🇳 Guide tại VN</option>
                    <option value="india">🇮🇳 Tour Ấn Độ</option>
                  </select>
                </div>
                <label className="flex items-center gap-2 cursor-pointer pt-6">
                  <input type="checkbox" checked={form.featured} onChange={e => set("featured", e.target.checked)}
                    className="w-4 h-4 accent-brand-rust" />
                  <span className="text-sm font-medium text-brand-brown">⭐ Nổi bật trang chủ</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer pt-6">
                  <input type="checkbox" checked={form.published} onChange={e => set("published", e.target.checked)}
                    className="w-4 h-4 accent-brand-teal" />
                  <span className="text-sm font-medium text-brand-brown">👁 Hiển thị</span>
                </label>
              </div>
            </>
          )}

          {tab === "gallery" && (
            <div className="space-y-5">
              <p className="text-sm text-brand-brown-light">Tải lên nhiều ảnh để tạo bộ sưu tập ảnh cho tour. Ảnh sẽ hiển thị trong gallery trên trang chi tiết tour.</p>
              <GalleryUpload images={form.images} onChange={imgs => set("images", imgs)} />
              {form.images.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                  <ImageIcon size={40} className="mb-3 opacity-30" />
                  <p className="text-sm">Chưa có ảnh gallery. Nhấn tải lên để thêm ảnh.</p>
                </div>
              )}
            </div>
          )}

          {tab === "details" && (
            <>
              <div>
                <label className="block text-sm font-medium text-brand-brown mb-1.5">✨ Điểm nổi bật <span className="text-gray-400 font-normal">(mỗi dòng một điểm)</span></label>
                <textarea rows={5} value={form.highlightsText} onChange={e => set("highlightsText", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/30 resize-none"
                  placeholder={"Chinh phục Vạn Lý Trường Thành đoạn Mutianyu\nKhám phá Tử Cấm Thành"} />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-brown mb-1.5">✅ Bao gồm trong giá <span className="text-gray-400 font-normal">(mỗi dòng một mục)</span></label>
                <textarea rows={5} value={form.includesText} onChange={e => set("includesText", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/30 resize-none"
                  placeholder={"Vé máy bay khứ hồi\nKhách sạn 4 sao\nHướng dẫn viên tiếng Việt"} />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-brown mb-1.5">❌ Không bao gồm <span className="text-gray-400 font-normal">(mỗi dòng một mục)</span></label>
                <textarea rows={4} value={form.excludesText} onChange={e => set("excludesText", e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/30 resize-none"
                  placeholder={"Chi phí cá nhân\nVisa Trung Quốc\nBảo hiểm du lịch"} />
              </div>
            </>
          )}

          {tab === "schedule" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-brand-brown">Các đợt khởi hành</p>
                <button type="button" onClick={addDeparture}
                  className="flex items-center gap-1.5 text-brand-teal text-sm hover:underline cursor-pointer">
                  <Plus size={14} /> Thêm đợt
                </button>
              </div>
              {form.departures.map((dep, i) => (
                <div key={i} className="bg-brand-cream rounded-xl p-4 space-y-3">
                  <div className="flex gap-3 items-center">
                    <input
                      value={dep.date}
                      onChange={e => updateDeparture(i, "date", e.target.value)}
                      placeholder="VD: 29/10-03/11/2026"
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand-teal/40 bg-white"
                    />
                    <select
                      value={dep.status}
                      onChange={e => updateDeparture(i, "status", e.target.value)}
                      className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none bg-white"
                    >
                      <option value="open">✅ Đã mở ĐKý</option>
                      <option value="private">🔒 Đoàn riêng</option>
                      <option value="full">❌ Hết chỗ</option>
                    </select>
                    <button type="button" onClick={() => removeDeparture(i)}
                      className="p-2 text-red-400 hover:bg-red-50 rounded-lg cursor-pointer">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-brand-brown-light mb-1">Tổng chỗ (max)</label>
                      <input
                        type="number" min={1} value={dep.maxPeople}
                        onChange={e => updateDeparture(i, "maxPeople", Number(e.target.value))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-brand-brown-light mb-1">Đã đặt</label>
                      <input
                        type="number" min={0} value={dep.currentBookings}
                        onChange={e => updateDeparture(i, "currentBookings", Number(e.target.value))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-brand-brown-light mb-1">Đóng ĐKý (DD/MM/YYYY)</label>
                      <input
                        value={dep.registrationCloseDate}
                        onChange={e => updateDeparture(i, "registrationCloseDate", e.target.value)}
                        placeholder="VD: 15/10/2026"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none bg-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-100">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer transition-colors">
            Hủy
          </button>
          <button onClick={save} disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? "Đang lưu..." : tour ? "Cập nhật" : "Tạo Tour"}
          </button>
        </div>
      </div>
    </div>
  );
}
