import connectMongodb from "@/database/connectMongodb";
import { NextResponse } from "next/server";
import classModel from "@/model/classModel";

// get route
export async function GET(req) {
  try {
    const chapterSlug = req.nextUrl.searchParams.get("chapterSlug");

    await connectMongodb();
    const data = await classModel.find({ chapterSlug });

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
    const data = await req.json();


    
      const result = await classModel.create(data);

      if (result) {
        return NextResponse.json({
          success: true,
          message: "Video uploaded",
          data,
        });
      }
    

    return NextResponse.json({
      success: false,
      message: "Video exists",
      data,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      message: "Error from class",
      error: error.message,
    });
  }
}

// Patch route
export async function PATCH(req) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    console.log({id});

    
    await connectMongodb();

    const data = await req.json();

    const result = await classModel.updateOne({ _id: id }, { $set: data });


    console.log({result});

    return NextResponse.json({
      success: true,
      message: "Video updated",
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      message: "Error from video",
      error: error.message,
    });
  }
}

// delete route
export async function DELETE(req) {
  try {
    await connectMongodb();
    const id = req.nextUrl.searchParams.get("id");

    const result = await classModel.deleteOne({ _id: id });

    return NextResponse.json({
      success: true,
      message: "video deleted",
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
