"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, Map, BookOpen, MessageSquare, Star, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({ tours: 0, bookings: 0, reviews: 0, posts: 0 });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      Promise.all([
        fetch("/api/tours").then(r => r.json()).catch(() => []),
        fetch("/api/bookings").then(r => r.json()).catch(() => []),
      ]).then(([tours, bookings]) => {
        setStats(s => ({
          ...s,
          tours: Array.isArray(tours) ? tours.length : 0,
          bookings: Array.isArray(bookings) ? bookings.length : 0,
        }));
      });
    }
  }, [status]);

  if (status === "loading") return <div className="flex items-center justify-center min-h-screen">Đang tải...</div>;
  if (!session) return null;

  const menuItems = [
    { href: "/admin/tours", icon: Map, label: "Quản lý Tours", count: stats.tours, color: "bg-brand-teal/10 text-brand-teal" },
    { href: "/admin/bookings", icon: BookOpen, label: "Booking Requests", count: stats.bookings, color: "bg-brand-rust/10 text-brand-rust" },
    { href: "/admin/blog", icon: MessageSquare, label: "Bài viết Blog", count: stats.posts, color: "bg-amber-50 text-amber-600" },
    { href: "/admin/reviews", icon: Star, label: "Reviews", count: stats.reviews, color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-brand-brown text-white px-6 py-4 flex items-center justify-between">
        <h1 className="font-display font-bold text-xl">Linh Đình Travel – Admin</h1>
        <div className="flex items-center gap-4">
          <span className="text-white/70 text-sm">{session.user?.email}</span>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm cursor-pointer"
          >
            <LogOut size={16} />
            Đăng xuất
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <LayoutDashboard className="text-brand-teal" size={24} />
          <h2 className="text-2xl font-display font-bold text-brand-brown">Dashboard</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {menuItems.map(({ href, icon: Icon, label, count, color }) => (
            <Link
              key={href}
              href={href}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
                  <Icon size={22} />
                </div>
                <div>
                  <p className="font-semibold text-brand-brown">{label}</p>
                  <p className="text-brand-brown-light text-sm">{count} mục</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400 group-hover:text-brand-teal transition-colors" />
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/" target="_blank" className="text-brand-teal text-sm hover:underline">
            Xem website → linhdinh.travel
          </Link>
        </div>
      </div>
    </div>
  );
}
