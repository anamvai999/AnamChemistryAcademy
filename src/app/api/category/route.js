import connectMongodb from "@/database/connectMongodb";
import categoryModel from "@/model/categoryModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    await connectMongodb();

    const isFound = await categoryModel.findOne({ slug: data.slug });
    console.log(isFound);

    if (isFound) {
      return NextResponse.json({
        success: false,
        message: "Category slug already exists",
      });
    }

    await categoryModel.create({...data, chapters: []});
    return NextResponse.json({ success: true, message: "Category created" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Something went wrong!",
      error: error.message,
      success: false,
    });
  }
}

export async function GET() {
  try {
    await connectMongodb();
    const data = await categoryModel.find();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
