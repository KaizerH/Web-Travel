import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Booking } from "@/models/Booking";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, tour, message } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();
    await Booking.create({
      name,
      email,
      phone,
      tourTitle: tour,
      message,
      status: "pending",
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const bookings = await Booking.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(bookings);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
