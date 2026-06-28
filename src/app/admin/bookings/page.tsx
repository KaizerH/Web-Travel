"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Clock } from "lucide-react";

interface Booking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  tourTitle?: string;
  message?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

const statusColor = { pending: "bg-amber-50 text-amber-600", confirmed: "bg-green-50 text-green-600", cancelled: "bg-red-50 text-red-600" };
const statusLabel = { pending: "Chờ xử lý", confirmed: "Đã xác nhận", cancelled: "Đã hủy" };

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/bookings").then(r => r.json())
      .then(data => { setBookings(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-display font-bold text-brand-brown mb-2">Booking Requests</h1>
        <p className="text-brand-brown-light text-sm mb-8">{bookings.length} yêu cầu đặt tour</p>

        {loading ? (
          <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" /></div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20">
            <Clock size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-brand-brown-light">Chưa có booking nào</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
            <table className="w-full text-sm">
              <thead className="bg-brand-cream text-brand-brown">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold">Khách hàng</th>
                  <th className="text-left px-5 py-3 font-semibold">Liên hệ</th>
                  <th className="text-left px-5 py-3 font-semibold">Tour quan tâm</th>
                  <th className="text-left px-5 py-3 font-semibold">Ngày gửi</th>
                  <th className="text-left px-5 py-3 font-semibold">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-medium text-brand-brown">{b.name}</td>
                    <td className="px-5 py-4 text-brand-brown-light">
                      <p>{b.email}</p><p>{b.phone}</p>
                    </td>
                    <td className="px-5 py-4 text-brand-brown-light">{b.tourTitle || "—"}</td>
                    <td className="px-5 py-4 text-brand-brown-light">{new Date(b.createdAt).toLocaleDateString("vi-VN")}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor[b.status]}`}>{statusLabel[b.status]}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
