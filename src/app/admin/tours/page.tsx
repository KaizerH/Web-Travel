"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import TourModal from "./TourModal";
import { Plus, Pencil, Trash2, Eye, EyeOff, Star } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

interface Tour extends Record<string, unknown> {
  _id: string;
  slug: string;
  title: { vi: string; en: string; zh: string };
  destination: string;
  duration: number;
  departures: { date: string; status: string }[];
  coverImage?: string;
  featured: boolean;
  published: boolean;
}

export default function AdminToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTour, setEditTour] = useState<Record<string, unknown> | null>(null);

  const load = async () => {
    const res = await fetch("/api/tours?all=1");
    const data = await res.json();
    setTours(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const deleteTour = async (id: string, title: string) => {
    if (!confirm(`Xóa tour "${title}"?`)) return;
    await fetch(`/api/tours/${id}`, { method: "DELETE" });
    toast.success("Đã xóa tour");
    load();
  };

  const toggleField = async (id: string, field: "published" | "featured", current: boolean) => {
    await fetch(`/api/tours/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: !current }),
    });
    load();
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-brand-brown">Quản lý Tours</h1>
            <p className="text-brand-brown-light text-sm mt-1">{tours.length} tour trong hệ thống</p>
          </div>
          <button
            onClick={() => { setEditTour(null); setModalOpen(true); }}
            className="btn-primary"
          >
            <Plus size={18} />
            Thêm Tour Mới
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {tours.map((tour) => (
              <div key={tour._id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex gap-4 items-start">
                {/* Cover image */}
                <div className="w-24 h-20 rounded-xl overflow-hidden bg-brand-cream flex-shrink-0">
                  {tour.coverImage ? (
                    <Image src={tour.coverImage} alt={tour.title.vi} width={96} height={80} className="object-cover w-full h-full" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-brown-light text-xs">Chưa có ảnh</div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-brand-brown">{tour.title.vi}</h3>
                      <p className="text-brand-brown-light text-sm mt-0.5">📍 {tour.destination} • ⏱ {tour.duration} ngày</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {tour.departures?.map((d, i) => (
                          <span key={i} className={`text-xs px-2 py-0.5 rounded-full ${
                            d.status === "open" ? "bg-brand-teal/10 text-brand-teal" :
                            d.status === "private" ? "bg-brand-rust/10 text-brand-rust" :
                            "bg-gray-100 text-gray-500"
                          }`}>{d.date}</span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => toggleField(tour._id, "featured", tour.featured)}
                        title={tour.featured ? "Bỏ nổi bật" : "Đặt nổi bật"}
                        className={`p-2 rounded-lg cursor-pointer transition-colors ${tour.featured ? "bg-amber-50 text-amber-500" : "bg-gray-50 text-gray-400 hover:text-amber-500"}`}
                      >
                        <Star size={16} fill={tour.featured ? "currentColor" : "none"} />
                      </button>
                      <button
                        onClick={() => toggleField(tour._id, "published", tour.published)}
                        title={tour.published ? "Ẩn tour" : "Hiện tour"}
                        className={`p-2 rounded-lg cursor-pointer transition-colors ${tour.published ? "bg-brand-teal/10 text-brand-teal" : "bg-gray-50 text-gray-400"}`}
                      >
                        {tour.published ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                      <button
                        onClick={() => { setEditTour(tour); setModalOpen(true); }}
                        className="p-2 rounded-lg bg-brand-cream text-brand-brown hover:bg-brand-teal/10 hover:text-brand-teal cursor-pointer transition-colors"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => deleteTour(tour._id, tour.title.vi)}
                        className="p-2 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 cursor-pointer transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <TourModal
          tour={editTour}
          onClose={() => setModalOpen(false)}
          onSaved={() => { setModalOpen(false); load(); }}
        />
      )}
    </AdminLayout>
  );
}
