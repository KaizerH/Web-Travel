"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Trash2, Eye, EyeOff, Star, X } from "lucide-react";
import toast from "react-hot-toast";

interface Review {
  _id: string;
  name: string;
  rating: number;
  content: string;
  tourTitle?: string;
  published: boolean;
  createdAt: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", rating: 5, content: "", tourTitle: "" });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const res = await fetch("/api/reviews");
    const data = await res.json();
    setReviews(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const toggle = async (id: string, current: boolean) => {
    await fetch(`/api/reviews/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !current }),
    });
    load();
  };

  const del = async (id: string) => {
    if (!confirm("Xóa review này?")) return;
    await fetch(`/api/reviews/${id}`, { method: "DELETE" });
    toast.success("Đã xóa");
    load();
  };

  const save = async () => {
    if (!form.name || !form.content) { toast.error("Vui lòng điền đầy đủ"); return; }
    setSaving(true);
    await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, published: true }),
    });
    setSaving(false);
    toast.success("Đã thêm review!");
    setShowForm(false);
    setForm({ name: "", rating: 5, content: "", tourTitle: "" });
    load();
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-brand-brown">Reviews</h1>
            <p className="text-brand-brown-light text-sm mt-1">{reviews.length} đánh giá</p>
          </div>
          <button onClick={() => setShowForm(true)} className="btn-primary">
            <Plus size={18} /> Thêm Review
          </button>
        </div>

        {/* Add form */}
        {showForm && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-brand-brown">Thêm đánh giá mới</h3>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded cursor-pointer"><X size={18} /></button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-brand-brown mb-1.5">Tên khách hàng *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/30"
                  placeholder="Nguyễn Thị Hương" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-brown mb-1.5">Tour đã đi</label>
                <input value={form.tourTitle} onChange={e => setForm(f => ({ ...f, tourTitle: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/30"
                  placeholder="Tân Cương – Miền Tây Hoang Dã" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-brand-brown mb-2">Số sao</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(s => (
                  <button key={s} type="button" onClick={() => setForm(f => ({ ...f, rating: s }))}
                    className="cursor-pointer">
                    <Star size={24} className={s <= form.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"} />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-brand-brown mb-1.5">Nội dung đánh giá *</label>
              <textarea rows={3} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/30 resize-none"
                placeholder="Khách hàng chia sẻ cảm nhận về chuyến đi..." />
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer">Hủy</button>
              <button onClick={save} disabled={saving} className="btn-primary disabled:opacity-60">
                {saving ? "Đang lưu..." : "Thêm Review"}
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {reviews.map((r) => (
              <div key={r._id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-semibold text-brand-brown">{r.name}</p>
                      <div className="flex gap-0.5">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${r.published ? "bg-brand-teal/10 text-brand-teal" : "bg-gray-100 text-gray-500"}`}>
                        {r.published ? "Hiển thị" : "Ẩn"}
                      </span>
                    </div>
                    <p className="text-brand-brown text-sm italic">"{r.content}"</p>
                    {r.tourTitle && <p className="text-brand-teal text-xs mt-1">{r.tourTitle}</p>}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => toggle(r._id, r.published)}
                      className={`p-2 rounded-lg cursor-pointer ${r.published ? "bg-brand-teal/10 text-brand-teal" : "bg-gray-50 text-gray-400"}`}>
                      {r.published ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                    <button onClick={() => del(r._id)} className="p-2 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 cursor-pointer">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
