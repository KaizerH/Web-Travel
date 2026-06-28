import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: {
      vi: { type: String, required: true },
      en: String,
      zh: String,
    },
    excerpt: {
      vi: String,
      en: String,
      zh: String,
    },
    content: {
      vi: String,
      en: String,
      zh: String,
    },
    coverImage: String,
    tags: [String],
    published: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Blog = models.Blog || model("Blog", BlogSchema);
