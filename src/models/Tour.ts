import mongoose, { Schema, model, models } from "mongoose";

const TourSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: {
      vi: { type: String, required: true },
      en: { type: String, required: true },
      zh: { type: String, required: true },
    },
    description: {
      vi: String,
      en: String,
      zh: String,
    },
    destination: { type: String, required: true },
    duration: { type: Number, required: true },
    departures: [
      {
        date: String,
        status: { type: String, enum: ["open", "private", "full"], default: "open" },
      },
    ],
    price: Number,
    currency: { type: String, default: "VND" },
    images: [String],
    coverImage: String,
    itinerary: [
      {
        day: Number,
        titleVi: String,
        titleEn: String,
        titleZh: String,
        descVi: String,
        descEn: String,
        descZh: String,
      },
    ],
    highlights: [String],
    includes: [String],
    excludes: [String],
    category: { type: String, enum: ["china", "vietnam-guide", "india"], default: "china" },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Tour = models.Tour || model("Tour", TourSchema);
