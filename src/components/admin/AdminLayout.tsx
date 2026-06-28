"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Map, BookOpen, MessageSquare, Star, LogOut, ExternalLink, Menu, X } from "lucide-react";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/tours", icon: Map, label: "Quản lý Tours" },
  { href: "/admin/blog", icon: MessageSquare, label: "Blog" },
  { href: "/admin/reviews", icon: Star, label: "Reviews" },
  { href: "/admin/bookings", icon: BookOpen, label: "Bookings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  // Close sidebar when route changes (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!session) return null;

  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="hidden md:flex w-64 bg-brand-brown flex-col fixed inset-y-0 left-0 z-30">
        <SidebarContent session={session} navItems={navItems} isActive={isActive} />
      </aside>

      {/* ── MOBILE OVERLAY ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── MOBILE DRAWER ── */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-brand-brown flex flex-col z-50 md:hidden transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo" width={32} height={32} className="h-8 w-auto" />
            <div>
              <p className="font-display font-bold text-white text-sm">Linh Đình Travel</p>
              <p className="text-white/40 text-xs">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white/60 hover:text-white p-1"
          >
            <X size={20} />
          </button>
        </div>
        <SidebarContent session={session} navItems={navItems} isActive={isActive} />
      </aside>

      {/* ── MOBILE TOP BAR ── */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-30 bg-brand-brown h-14 flex items-center px-4 gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-white/80 hover:text-white p-1"
        >
          <Menu size={22} />
        </button>
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Logo" width={28} height={28} className="h-7 w-auto" />
          <span className="font-display font-bold text-white text-sm">Linh Đình Travel</span>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="md:ml-64 pt-14 md:pt-0 min-h-screen overflow-auto">
        {children}
      </main>
    </div>
  );
}

function SidebarContent({
  session,
  navItems,
  isActive,
}: {
  session: { user?: { email?: string | null } };
  navItems: { href: string; icon: React.ElementType; label: string }[];
  isActive: (href: string) => boolean;
}) {
  return (
    <>
      {/* Logo — desktop only */}
      <div className="hidden md:block p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={36} height={36} className="h-9 w-auto" />
          <div>
            <p className="font-display font-bold text-white text-sm">Linh Đình Travel</p>
            <p className="text-white/40 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive(href)
                ? "bg-brand-teal text-white"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-1">
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
          <span className="truncate">Đăng xuất ({session.user?.email})</span>
        </button>
      </div>
    </>
  );
}
