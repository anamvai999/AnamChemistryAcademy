import connectMongodb from "@/database/connectMongodb";
import categoryModel from "@/model/categoryModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    await connectMongodb();
    await categoryModel.create(data);
    return NextResponse.json({ success: true, message: data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}

export async function GET() {
  try {
    await connectMongodb();
    const data = await categoryModel.find();
    return NextResponse.json({ success: true, data});
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
