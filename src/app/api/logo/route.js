import connectMongodb from "@/database/connectMongodb";
import LogoModel from "@/model/logoModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongodb();
    const data = await LogoModel.find({});

    return NextResponse.json({
      success: true,
      message: "Data Logo Fetched ",
      data: data,
    });
  } catch (error) {
    return NextResponse.json({
      succes: false,
      message: "Something went wrong in fetching logo",
      error: error.message,
    });
  }
}

// Post r

export async function PATCH(req) {
  try {
    await connectMongodb();

    const data = await req.json();

    const result = await LogoModel.updateOne(
      { _id: "665005796b2c82a21a105587" },
      { $set: data }
    );

    console.log("hitting");

    return NextResponse.json({
      success: true,
      message: "Logo updated",
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      success: false,
      message: "Error from logo",
      error: error.message,
    });
  }
}
