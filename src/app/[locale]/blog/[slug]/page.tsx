export const dynamic = "force-dynamic";

import { getTranslations } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations("blog");

  let post: Record<string, unknown> | null = null;
  try {
    await connectDB();
    post = (await Blog.findOne({ slug, published: true }).lean()) as Record<string, unknown> | null;
  } catch {
    // Not found fallback
  }

  if (!post) notFound();

  const title = (post.title as Record<string, string>)?.[locale] || (post.title as Record<string, string>)?.vi || "";
  const content = (post.content as Record<string, string>)?.[locale] || (post.content as Record<string, string>)?.vi || "";
  const date = post.createdAt
    ? new Date(post.createdAt as string).toLocaleDateString(
        locale === "zh" ? "zh-CN" : locale === "en" ? "en-US" : "vi-VN",
        { year: "numeric", month: "long", day: "numeric" }
      )
    : "";

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {(post.coverImage as string) && (
          <div className="relative h-64 md:h-96 bg-brand-brown">
            <Image src={post.coverImage as string} alt={title} fill className="object-cover opacity-60" />
          </div>
        )}

        <article className="max-w-3xl mx-auto px-4 py-12">
          <Link href={`/${locale}/blog`} className="flex items-center gap-1.5 text-brand-teal text-sm hover:underline mb-6 w-fit">
            <ArrowLeft size={14} />
            {t("backToBlog")}
          </Link>

          {date && (
            <p className="text-brand-brown-light text-sm flex items-center gap-1.5 mb-3">
              <Calendar size={14} /> {date}
            </p>
          )}

          <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-brown mb-8 leading-snug">{title}</h1>

          <div
            className="prose prose-lg max-w-none text-brand-brown leading-relaxed"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}
