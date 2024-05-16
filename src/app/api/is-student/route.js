import connectMongodb from "@/database/connectMongodb";
import studentModel from "@/model/studentModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const studentEmail = req.nextUrl.searchParams.get("studentEmail");
    await connectMongodb();

    console.log("from server: ", studentEmail);

    const data = await studentModel.findOne({ email: studentEmail });

    return NextResponse.json({ success: true, data});
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
