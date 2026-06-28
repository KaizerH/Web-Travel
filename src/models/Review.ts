import { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema(
  {
    name: { type: String, required: true },
    avatar: String,
    rating: { type: Number, min: 1, max: 5, default: 5 },
    content: { type: String, required: true },
    tourTitle: String,
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Review = models.Review || model("Review", ReviewSchema);
