"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.ok) {
      router.push("/admin");
    } else {
      setError("Email hoặc mật khẩu không đúng");
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Image src="/logo.png" alt="Linh Đình Travel" width={60} height={60} className="mx-auto mb-4" />
          <h1 className="font-display font-bold text-2xl text-brand-brown">Admin Panel</h1>
          <p className="text-brand-brown-light text-sm mt-1">Linh Đình Travel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-brown mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-brand-cream-dark rounded-xl px-4 py-3 text-sm text-brand-brown focus:outline-none focus:ring-2 focus:ring-brand-teal/40 bg-brand-cream"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-brown mb-1.5">Mật khẩu</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-brand-cream-dark rounded-xl px-4 py-3 text-sm text-brand-brown focus:outline-none focus:ring-2 focus:ring-brand-teal/40 bg-brand-cream"
            />
          </div>
          {error && <p className="text-brand-rust text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center disabled:opacity-60"
          >
            <Lock size={16} />
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}
