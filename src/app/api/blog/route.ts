import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";

export async function GET() {
  await connectDB();
  const posts = await Blog.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const post = await Blog.create(body);
  return NextResponse.json(post, { status: 201 });
}
