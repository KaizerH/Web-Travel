export const dynamic = "force-dynamic";

import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("blog");

  let posts: Array<Record<string, unknown>> = [];
  try {
    await connectDB();
    posts = (await Blog.find({ published: true }).sort({ createdAt: -1 }).lean()) as Array<Record<string, unknown>>;
  } catch {
    posts = SAMPLE_POSTS;
  }
  if (posts.length === 0) posts = SAMPLE_POSTS;

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <div className="bg-brand-brown py-16 text-center">
          <h1 className="font-display text-4xl font-bold text-white mb-2">{t("title")}</h1>
          <p className="text-white/70">{t("subtitle")}</p>
        </div>

        <section className="py-16 bg-brand-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const title = (post.title as Record<string, string>)?.[locale] || (post.title as Record<string, string>)?.vi || "";
                const excerpt = (post.excerpt as Record<string, string>)?.[locale] || (post.excerpt as Record<string, string>)?.vi || "";
                const date = post.createdAt ? new Date(post.createdAt as string).toLocaleDateString(locale === "zh" ? "zh-CN" : locale === "en" ? "en-US" : "vi-VN", { year: "numeric", month: "long", day: "numeric" }) : "";

                return (
                  <div key={post.slug as string} className="card group">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={(post.coverImage as string) || "/images/placeholder-blog.jpg"}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      {date && (
                        <p className="text-xs text-brand-brown-light flex items-center gap-1.5 mb-2">
                          <Calendar size={12} /> {date}
                        </p>
                      )}
                      <h2 className="font-display font-bold text-brand-brown text-lg mb-2 line-clamp-2">{title}</h2>
                      <p className="text-brand-brown-light text-sm leading-relaxed line-clamp-3 mb-4">{excerpt}</p>
                      <Link
                        href={`/${locale}/blog/${post.slug as string}`}
                        className="flex items-center gap-1.5 text-brand-teal font-semibold text-sm hover:gap-2.5 transition-all"
                      >
                        {t("readMore")} <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const SAMPLE_POSTS = [
  {
    slug: "kinh-nghiem-du-lich-tan-cuong",
    title: { vi: "Kinh nghiệm du lịch Tân Cương cho người đi lần đầu", en: "Xinjiang Travel Tips for First-Timers", zh: "初次游新疆的旅行经验分享" },
    excerpt: { vi: "Tân Cương – vùng đất phía tây Trung Quốc với những cảnh quan hùng vĩ, nền văn hóa đa dạng và ẩm thực độc đáo...", en: "Xinjiang – western China with magnificent landscapes and unique cuisine...", zh: "新疆——中国西部有着壮丽景观..." },
    coverImage: "/images/xinjiang.jpg",
    createdAt: "2026-05-01",
  },
  {
    slug: "top-mon-an-phai-thu-o-thuong-hai",
    title: { vi: "Top 10 món ăn nhất định phải thử khi đến Thượng Hải", en: "Top 10 Must-Try Foods in Shanghai", zh: "上海必尝的10道美食" },
    excerpt: { vi: "Thượng Hải là thiên đường ẩm thực với sự pha trộn giữa phong cách truyền thống Giang Nam và hiện đại quốc tế...", en: "Shanghai is a culinary paradise...", zh: "上海是美食天堂..." },
    coverImage: "/images/shanghai.jpg",
    createdAt: "2026-04-15",
  },
  {
    slug: "chup-anh-dep-o-bac-kinh",
    title: { vi: "Hướng dẫn chụp ảnh đẹp tại các điểm nổi tiếng ở Bắc Kinh", en: "Photography Guide to Beijing's Famous Spots", zh: "北京著名景点摄影指南" },
    excerpt: { vi: "Bắc Kinh không chỉ là thủ đô lịch sử mà còn là bối cảnh lý tưởng cho nhiếp ảnh du lịch...", en: "Beijing is not only the historic capital but also an ideal photography backdrop...", zh: "北京不仅是历史名城，也是旅游摄影的理想背景..." },
    coverImage: "/images/beijing.jpg",
    createdAt: "2026-03-20",
  },
];
