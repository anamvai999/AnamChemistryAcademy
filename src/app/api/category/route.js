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


export async function PATCH(req) {
  try {
    const categoryId = await req.nextUrl.searchParams.get("id");
    const data = await req.json();
    await connectMongodb();

    const query = {_id: categoryId};

    const result = await categoryModel.updateOne(query, { $set: data });
    
    return NextResponse.json({ success: true, message: "Category updated" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Something went wrong!",
      error: error.message,
      success: false,
    });
  }
}
export async function DELETE(req) {
  try {
    const categoryId = await req.nextUrl.searchParams.get("id");
    await connectMongodb();

    const query = {_id: categoryId};

    const result = await categoryModel.deleteOne(query);
    
    return NextResponse.json({ success: true, message: "Category Deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Something went wrong!",
      error: error.message,
      success: false,
    });
  }
}