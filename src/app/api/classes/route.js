import connectMongodb from "@/database/connectMongodb";
import categoryModel from "@/model/categoryModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req) {
  try {
    const chapterSlug = req.nextUrl.searchParams.get("chapterSlug");

    await connectMongodb();

    const res = await categoryModel.aggregate([
      { $match: { "chapters.slug": chapterSlug } }, // Match the document with the specified slug
      { $unwind: "$chapters" }, // Unwind the chapters array
      { $match: { "chapters.slug": chapterSlug } }, // Match the specific chapter within the unwound array
      { $project: { _id: 0, classes: "$chapters.classes" } }, // Project only the classes array
    ]);


    return NextResponse.json({ data: res[0].classes, success: "ok" });
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({ message: "Something went wrong!", err });
  }
}

export async function POST(req) {
  try {
    const chapterSlug = req.nextUrl.searchParams.get("chapterSlug");
    const data = await req.json();

    await connectMongodb();

    const res = await categoryModel.updateOne(
      {
        "chapters.slug": chapterSlug,
      },
      {
        $push: {
          "chapters.$.classes": data,
        },
      }
    );

    return NextResponse.json({ data: res, success: "ok" });
  } catch (err) {
    return NextResponse.json({ message: "Something went wrong!", err });
  }
}
