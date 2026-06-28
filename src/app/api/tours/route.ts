export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Tour } from "@/models/Tour";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const filter: Record<string, unknown> = { published: true };
    if (category) filter.category = category;
    const tours = await Tour.find(filter).sort({ featured: -1, createdAt: -1 }).lean();
    return NextResponse.json(tours);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const tour = await Tour.create(body);
    return NextResponse.json(tour, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
