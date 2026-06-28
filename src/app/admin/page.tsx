"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import { Map, BookOpen, MessageSquare, Star } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ tours: 0, bookings: 0, reviews: 0, posts: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/tours").then(r => r.json()).catch(() => []),
      fetch("/api/bookings").then(r => r.json()).catch(() => []),
      fetch("/api/reviews").then(r => r.json()).catch(() => []),
      fetch("/api/blog").then(r => r.json()).catch(() => []),
    ]).then(([tours, bookings, reviews, posts]) => {
      setStats({
        tours: Array.isArray(tours) ? tours.length : 0,
        bookings: Array.isArray(bookings) ? bookings.length : 0,
        reviews: Array.isArray(reviews) ? reviews.length : 0,
        posts: Array.isArray(posts) ? posts.length : 0,
      });
    });
  }, []);

  const cards = [
    { href: "/admin/tours", icon: Map, label: "Tours", count: stats.tours, color: "bg-brand-teal/10 text-brand-teal", desc: "Thêm, sửa, xóa tour" },
    { href: "/admin/blog", icon: MessageSquare, label: "Blog", count: stats.posts, color: "bg-amber-50 text-amber-600", desc: "Viết và đăng bài" },
    { href: "/admin/reviews", icon: Star, label: "Reviews", count: stats.reviews, color: "bg-purple-50 text-purple-600", desc: "Quản lý đánh giá" },
    { href: "/admin/bookings", icon: BookOpen, label: "Bookings", count: stats.bookings, color: "bg-brand-rust/10 text-brand-rust", desc: "Yêu cầu đặt tour" },
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-display font-bold text-brand-brown mb-2">Dashboard</h1>
        <p className="text-brand-brown-light text-sm mb-8">Chào mừng bạn quay lại, Linh Đình Travel!</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {cards.map(({ href, icon: Icon, label, count, color, desc }) => (
            <Link key={href} href={href}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
                <Icon size={20} />
              </div>
              <p className="text-2xl font-bold text-brand-brown">{count}</p>
              <p className="font-semibold text-brand-brown text-sm">{label}</p>
              <p className="text-gray-400 text-xs mt-0.5">{desc}</p>
            </Link>
          ))}
        </div>

        {/* Quick guide */}
        <div className="bg-gradient-to-br from-brand-teal/10 to-brand-rust/5 rounded-2xl p-6 border border-brand-teal/20">
          <h2 className="font-display font-bold text-brand-brown text-lg mb-4">📖 Hướng dẫn nhanh</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-brand-brown">
            <div className="space-y-2">
              <p className="font-semibold text-brand-teal">Quản lý Tours</p>
              <p>1. Vào <strong>Quản lý Tours</strong> → Click <strong>"Thêm Tour Mới"</strong></p>
              <p>2. Upload ảnh bìa bằng cách kéo thả</p>
              <p>3. Điền tên, điểm đến, số ngày</p>
              <p>4. Thêm lịch khởi hành trong tab <strong>"Lịch khởi hành"</strong></p>
              <p>5. Bật <strong>"Hiển thị"</strong> để tour xuất hiện trên web</p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-brand-rust">Viết Blog</p>
              <p>1. Vào <strong>Bài viết Blog</strong> → Click <strong>"Viết bài mới"</strong></p>
              <p>2. Upload ảnh bìa, nhập tiêu đề và mô tả ngắn</p>
              <p>3. Viết nội dung (có thể dùng HTML đơn giản)</p>
              <p>4. Tick <strong>"Đăng bài ngay"</strong> để hiện trên web</p>
              <p>5. Click <strong>"Đăng bài"</strong> để lưu</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
