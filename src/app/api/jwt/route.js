import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const data = await req.json();
    const token = jwt.sign(data, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return NextResponse.json(cookies().set("token", token));
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message });
  }
}

export async function DELETE(req) {
  try {
    return NextResponse.json(cookies().delete("token"));
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message });
  }
}
