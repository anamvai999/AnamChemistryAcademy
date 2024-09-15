import connectMongodb from "@/database/connectMongodb";
import ExamModel from "@/model/examModel";
import { NextResponse } from "next/server";

// get route
export async function GET(req) {
  try {
    const examSlug = req.nextUrl.searchParams.get("examSlug");

    await connectMongodb();

    let data = [];

    if (examSlug !== null && examSlug?.length) {
      data = await ExamModel.findOne({ _id: examSlug });
    } else {
      data = await ExamModel.find({ examSlug });
    }


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
    const result = await ExamModel.create(data);
    if (result) {
      return NextResponse.json({
        success: true,
        message: "Exam created",
        data,
      });
    }


    return NextResponse.json({
      success: false,
      message: "Exam exists",
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

    await connectMongodb();

    const data = await req.json();

    const result = await ExamModel.updateOne({ _id: id }, { $set: data });


    console.log({ result });

    return NextResponse.json({
      success: true,
      message: "Exam updated",
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      message: "Error from Exam",
      error: error.message,
    });
  }
}

// delete route
export async function DELETE(req) {
  try {
    await connectMongodb();
    const id = req.nextUrl.searchParams.get("id");

    const result = await ExamModel.deleteOne({ _id: id });

    return NextResponse.json({
      success: true,
      message: "Exam deleted",
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      message: "Error from Exam",
      error: error.message,
    });
  }
}
