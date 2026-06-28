"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = "Ảnh bìa" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (data.url) {
        onChange(data.url);
        toast.success("Upload ảnh thành công!");
      } else {
        toast.error("Upload thất bại");
      }
    } catch {
      toast.error("Lỗi kết nối");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-brand-brown mb-2">{label}</label>

      {value ? (
        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-brand-cream-dark">
          <Image src={value} alt="Preview" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-white/90 hover:bg-white text-brand-rust rounded-full p-1.5 cursor-pointer shadow"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="w-full h-48 border-2 border-dashed border-brand-teal/40 rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-brand-teal hover:bg-brand-teal/5 transition-colors"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-brand-brown-light">Đang upload...</p>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 bg-brand-teal/10 rounded-full flex items-center justify-center">
                <Upload size={22} className="text-brand-teal" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-brand-brown">Kéo thả ảnh vào đây</p>
                <p className="text-xs text-brand-brown-light mt-1">hoặc click để chọn file</p>
                <p className="text-xs text-brand-brown-light">JPG, PNG, WebP • Tối đa 5MB</p>
              </div>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
      />

      {/* Or enter URL manually */}
      <div className="mt-2 flex gap-2 items-center">
        <ImageIcon size={14} className="text-brand-brown-light flex-shrink-0" />
        <input
          type="text"
          placeholder="Hoặc dán link ảnh URL..."
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 text-xs border border-brand-cream-dark rounded-lg px-3 py-2 text-brand-brown focus:outline-none focus:ring-1 focus:ring-brand-teal/40 bg-brand-cream"
        />
      </div>
    </div>
  );
}
