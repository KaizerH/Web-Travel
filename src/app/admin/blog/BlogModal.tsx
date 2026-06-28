"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import toast from "react-hot-toast";

interface BlogForm {
  slug: string;
  titleVi: string; titleEn: string; titleZh: string;
  excerptVi: string;
  contentVi: string;
  coverImage: string;
  tags: string;
  published: boolean;
}

const DEFAULT: BlogForm = {
  slug: "", titleVi: "", titleEn: "", titleZh: "",
  excerptVi: "", contentVi: "", coverImage: "", tags: "", published: false,
};

function toSlug(s: string) {
  return s.toLowerCase()
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a").replace(/[èéẹẻẽêềếệểễ]/g, "e")
    .replace(/[ìíịỉĩ]/g, "i").replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
    .replace(/[ùúụủũưừứựửữ]/g, "u").replace(/[ỳýỵỷỹ]/g, "y").replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

export default function BlogModal({ post, onClose, onSaved }: {
  post: Record<string, unknown> | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<BlogForm>(DEFAULT);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (post) {
      const title = post.title as Record<string, string>;
      const excerpt = post.excerpt as Record<string, string> | undefined;
      const content = post.content as Record<string, string> | undefined;
      setForm({
        slug: post.slug as string || "",
        titleVi: title?.vi || "", titleEn: title?.en || "", titleZh: title?.zh || "",
        excerptVi: excerpt?.vi || "",
        contentVi: content?.vi || "",
        coverImage: post.coverImage as string || "",
        tags: ((post.tags as string[]) || []).join(", "),
        published: post.published as boolean ?? false,
      });
    }
  }, [post]);

  const set = (key: keyof BlogForm, val: unknown) => setForm(f => ({ ...f, [key]: val }));

  const save = async () => {
    if (!form.titleVi) { toast.error("Vui lòng nhập tiêu đề"); return; }
    setSaving(true);
    const payload = {
      slug: form.slug || toSlug(form.titleVi),
      title: { vi: form.titleVi, en: form.titleEn, zh: form.titleZh },
      excerpt: { vi: form.excerptVi },
      content: { vi: form.contentVi },
      coverImage: form.coverImage,
      tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
      published: form.published,
    };

    const url = post ? `/api/blog/${post._id}` : "/api/blog";
    const method = post ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) {
      toast.success(post ? "Đã cập nhật bài viết!" : "Đã đăng bài viết!");
      onSaved();
    } else {
      toast.error("Có lỗi xảy ra");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-display font-bold text-xl text-brand-brown">
            {post ? "Chỉnh sửa bài viết" : "Viết bài mới"}
          </h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 cursor-pointer"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <ImageUpload value={form.coverImage} onChange={v => set("coverImage", v)} label="Ảnh bìa bài viết" />

          <div>
            <label className="block text-sm font-medium text-brand-brown mb-1.5">Tiêu đề <span className="text-red-500">*</span></label>
            <input value={form.titleVi} onChange={e => set("titleVi", e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/30"
              placeholder="VD: Kinh nghiệm du lịch Tân Cương" />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-brown mb-1.5">Mô tả ngắn <span className="text-gray-400 font-normal">(hiển thị trên danh sách blog)</span></label>
            <textarea rows={2} value={form.excerptVi} onChange={e => set("excerptVi", e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/30 resize-none"
              placeholder="Tóm tắt ngắn gọn nội dung bài viết..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-brown mb-1.5">
              Nội dung bài viết
              <span className="text-gray-400 font-normal ml-2">(hỗ trợ HTML: &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;, &lt;li&gt;)</span>
            </label>
            <textarea rows={12} value={form.contentVi} onChange={e => set("contentVi", e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/30 resize-none font-mono"
              placeholder={"<h2>Tiêu đề phần 1</h2>\n<p>Nội dung đoạn văn...</p>\n\n<h2>Tiêu đề phần 2</h2>\n<p>Nội dung tiếp theo...</p>"} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-brown mb-1.5">Tags <span className="text-gray-400 font-normal">(cách nhau bằng dấu phẩy)</span></label>
              <input value={form.tags} onChange={e => set("tags", e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/30"
                placeholder="tân cương, trung quốc, du lịch" />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={e => set("published", e.target.checked)}
                  className="w-4 h-4 accent-brand-teal" />
                <span className="text-sm font-medium text-brand-brown">👁 Đăng bài ngay</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t border-gray-100">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer">Hủy</button>
          <button onClick={save} disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? "Đang lưu..." : post ? "Cập nhật" : "Đăng bài"}
          </button>
        </div>
      </div>
    </div>
  );
}
