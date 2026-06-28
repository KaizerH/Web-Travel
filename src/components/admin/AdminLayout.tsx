"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Map, BookOpen, MessageSquare, Star, LogOut, ExternalLink } from "lucide-react";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/tours", icon: Map, label: "Quản lý Tours" },
  { href: "/admin/blog", icon: MessageSquare, label: "Bài viết Blog" },
  { href: "/admin/reviews", icon: Star, label: "Reviews" },
  { href: "/admin/bookings", icon: BookOpen, label: "Booking Requests" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!session) return null;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-brown flex-shrink-0 flex flex-col">
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={36} height={36} className="brightness-0 invert opacity-90" onError={() => {}} />
            <div>
              <p className="font-display font-bold text-white text-sm">Linh Đình Travel</p>
              <p className="text-white/40 text-xs">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? "bg-brand-teal text-white"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <a
            href="/vi"
            target="_blank"
            className="flex items-center gap-2 text-white/50 hover:text-white text-xs px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <ExternalLink size={14} />
            Xem website
          </a>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full flex items-center gap-2 text-white/50 hover:text-white text-xs px-3 py-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <LogOut size={14} />
            Đăng xuất ({session.user?.email})
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
