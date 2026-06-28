import { Schema, model, models } from "mongoose";

const BookingSchema = new Schema(
  {
    tourId: { type: Schema.Types.ObjectId, ref: "Tour" },
    tourTitle: String,
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: String,
    preferredDate: String,
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    source: { type: String, default: "website" },
  },
  { timestamps: true }
);

export const Booking = models.Booking || model("Booking", BookingSchema);
