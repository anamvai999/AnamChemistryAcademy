import connectMongodb from "@/database/connectMongodb";
import chapterModel from "@/model/chapterModel";
import { NextResponse } from "next/server";
import { ObjectId } from 'mongodb';


// get route
export async function GET(req) {
  try {
    const categorySlug = req.nextUrl.searchParams.get("categorySlug");

    await connectMongodb();
    const data = await chapterModel.find({ categorySlug });


    return NextResponse.json({
      success: true,
      message: "Data Fetched ",
      data: data,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}


// Post route
export async function POST(req) {
  try {
    await connectMongodb();
    const categorySlug = req.nextUrl.searchParams.get("categorySlug");
    const data = await req.json();

    const finalData = {
      ...data,
      categorySlug,
    };

    const chaptersData = await chapterModel.findOne({ slug: finalData.slug });


    if(!chaptersData){
      const result = await chapterModel.create(finalData);


      if(result){
        return NextResponse.json({
          success: true,
          message: "Chapters created",
          finalData,
        });
      }
    }

    return NextResponse.json({
      success: false,
      message: "Slug exists",
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


// Patch route
export async function PATCH(req) {
  try {
    await connectMongodb();
    const id = req.nextUrl.searchParams.get("id");
    const data = await req.json();

   const result  = await chapterModel.updateOne({_id: id}, {$set: data});

    return NextResponse.json({
      success: true,
      message: "Chapters updated",
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      message: "Error from chapters",
      error: error.message,
    });
  }
}

// delete route
export async function DELETE(req) {
  try {
    await connectMongodb();
    const id = req.nextUrl.searchParams.get("id");

   const result  = await chapterModel.deleteOne({_id: id});

    return NextResponse.json({
      success: true,
      message: "Chapter deleted",
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      message: "Error from chapters",
      error: error.message,
    });
  }
}


