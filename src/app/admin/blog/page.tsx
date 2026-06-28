"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import BlogModal from "./BlogModal";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

interface Post {
  _id: string;
  slug: string;
  title: { vi: string };
  excerpt: { vi: string };
  coverImage?: string;
  published: boolean;
  createdAt: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editPost, setEditPost] = useState<Post | null>(null);

  const load = async () => {
    const res = await fetch("/api/blog");
    const data = await res.json();
    setPosts(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const deletePost = async (id: string, title: string) => {
    if (!confirm(`Xóa bài "${title}"?`)) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    toast.success("Đã xóa bài viết");
    load();
  };

  const togglePublished = async (id: string, current: boolean) => {
    await fetch(`/api/blog/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !current }),
    });
    load();
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-brand-brown">Bài viết Blog</h1>
            <p className="text-brand-brown-light text-sm mt-1">{posts.length} bài viết</p>
          </div>
          <button onClick={() => { setEditPost(null); setModalOpen(true); }} className="btn-primary">
            <Plus size={18} /> Viết bài mới
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {posts.map((post) => (
              <div key={post._id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex gap-4">
                <div className="w-20 h-16 rounded-xl overflow-hidden bg-brand-cream flex-shrink-0">
                  {post.coverImage ? (
                    <Image src={post.coverImage} alt={post.title.vi} width={80} height={64} className="object-cover w-full h-full" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-brand-brown-light">Chưa có ảnh</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-brand-brown line-clamp-1">{post.title.vi}</h3>
                      <p className="text-brand-brown-light text-sm mt-0.5 line-clamp-1">{post.excerpt?.vi}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                        {" · "}
                        <span className={post.published ? "text-brand-teal" : "text-gray-400"}>
                          {post.published ? "Đã đăng" : "Bản nháp"}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => togglePublished(post._id, post.published)}
                        className={`p-2 rounded-lg cursor-pointer ${post.published ? "bg-brand-teal/10 text-brand-teal" : "bg-gray-50 text-gray-400"}`}>
                        {post.published ? <Eye size={16} /> : <EyeOff size={16} />}
                      </button>
                      <button onClick={() => { setEditPost(post); setModalOpen(true); }}
                        className="p-2 rounded-lg bg-brand-cream text-brand-brown hover:bg-brand-teal/10 hover:text-brand-teal cursor-pointer">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => deletePost(post._id, post.title.vi)}
                        className="p-2 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 cursor-pointer">
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
        <BlogModal
          post={editPost as Record<string, unknown> | null}
          onClose={() => setModalOpen(false)}
          onSaved={() => { setModalOpen(false); load(); }}
        />
      )}
    </AdminLayout>
  );
}
