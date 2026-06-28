export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  const body = await req.json();
  const post = await Blog.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(post);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await connectDB();
  await Blog.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
