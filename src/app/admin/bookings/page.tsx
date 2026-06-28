"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle, XCircle } from "lucide-react";

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

const statusColor = {
  pending: "bg-amber-50 text-amber-600",
  confirmed: "bg-green-50 text-green-600",
  cancelled: "bg-red-50 text-red-600",
};

const statusLabel = {
  pending: "Chờ xử lý",
  confirmed: "Đã xác nhận",
  cancelled: "Đã hủy",
};

export default function AdminBookingsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/bookings")
        .then((r) => r.json())
        .then((data) => { setBookings(Array.isArray(data) ? data : []); setLoading(false); })
        .catch(() => setLoading(false));
    }
  }, [status]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-brand-brown text-white px-6 py-4">
        <h1 className="font-display font-bold text-xl">Linh Đình Travel – Admin</h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/admin" className="flex items-center gap-1.5 text-brand-teal text-sm hover:underline">
            <ArrowLeft size={16} /> Dashboard
          </Link>
          <span className="text-gray-400">/</span>
          <h2 className="text-xl font-display font-bold text-brand-brown">Booking Requests</h2>
        </div>

        {loading ? (
          <p className="text-center text-brand-brown-light py-20">Đang tải...</p>
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
                  <th className="text-left px-5 py-3 font-semibold">Tên</th>
                  <th className="text-left px-5 py-3 font-semibold">Email / SĐT</th>
                  <th className="text-left px-5 py-3 font-semibold">Tour</th>
                  <th className="text-left px-5 py-3 font-semibold">Ngày</th>
                  <th className="text-left px-5 py-3 font-semibold">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-medium text-brand-brown">{b.name}</td>
                    <td className="px-5 py-4 text-brand-brown-light">
                      <p>{b.email}</p>
                      <p>{b.phone}</p>
                    </td>
                    <td className="px-5 py-4 text-brand-brown-light">{b.tourTitle || "—"}</td>
                    <td className="px-5 py-4 text-brand-brown-light">
                      {new Date(b.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor[b.status]}`}>
                        {statusLabel[b.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
