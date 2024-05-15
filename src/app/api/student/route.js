import connectMongodb from "@/database/connectMongodb";
import studentModel from "@/model/studentModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    await connectMongodb();

    const res = await studentModel.findOne({ email: data.email });

    if (res) {
      return NextResponse.json({ success: false, message: "Student exists" });
    }
    await studentModel.create({ ...data });
    return NextResponse.json({ success: true, message: "Student added" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Something went wrong!",
      error: error.message,
      success: false,
    });
  }
}

export async function GET(req) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    await connectMongodb();

    let data;
    console.log(email);

    if (email) {
      // Ensure you have an index on the 'email' field for regex queries
      // e.g., studentModel.createIndex({ email: 1 })

      // Use regex with indexed search for improved performance
      const regex = new RegExp(email, "i"); // 'i' flag for case-insensitive search
      data = await studentModel.find({ email: { $regex: regex } });
    } else {
      data = await studentModel.find();
    }

    console.log(data);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function DELETE(req) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    await connectMongodb();

    const res = await studentModel.deleteOne({ email });

    return NextResponse.json({ success: true, data: res, message: "Succesfully deleted!" });
  } catch (error) {
    return NextResponse.json({ error: error.message , message: "Error while deleting"});
  }
}
