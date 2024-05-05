import connectMongodb from "@/database/connectMongodb";
import categoryModel from "@/model/categoryModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongodb();
    const slug = req.nextUrl.searchParams.get("categorySlug");
    const data = await req.json();

    const finalData = {
      ...data,
      classes: [],
    };
    const categoryData = await categoryModel.findOne({ slug });

    if (categoryData) {
      console.log(categoryData);
      console.log(categoryData.chapters.includes(finalData.slug));

      if (
        !categoryData.chapters.some(
          (chapter) => chapter.slug === finalData.slug
        )
      ) {
        categoryData.chapters.push(finalData);
        categoryData.save();
      } else {
        return NextResponse.json({
          success: false,
          message: "Chapters slug exists",
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Chapters created",
      finalData,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      message: "Error from chaptgers",
      error: error.message,
    });
  }
}
export async function GET(req) {
  try {
    const slug = req.nextUrl.searchParams.get("slug");

    await connectMongodb();
    const data = await categoryModel.findOne({ slug });

    let finalData = [];

    if (data) {
      finalData.push(...data.chapters);
    }

    return NextResponse.json({
      success: true,
      message: "Data Fetched ",
      data: finalData,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}
