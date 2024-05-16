import connectMongodb from "@/database/connectMongodb";
import studentModel from "@/model/studentModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const studentEmail = req.nextUrl.searchParams.get("studentEmail");
    await connectMongodb();

    let data;

    if (studentEmail) {
      data = await studentModel.find({ email: studentEmail });
      console.log(data);
      if (data.length > 0 ) {
        return NextResponse.json({ success: true, data });
      }

      return NextResponse.json({ success: false, data });
    } else {
      return NextResponse.json({ success: false, data });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
