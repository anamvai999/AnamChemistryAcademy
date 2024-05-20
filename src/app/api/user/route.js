import { NextResponse } from "next/server";
import User from "@/model/user";
import mongodbConnect from "@/database/connectMongodb";
import MongodbConnect from "@/database/connectMongodb";

export async function POST(req) {
  try {
    const { userName, email, role, userId } = await req.json();
    await mongodbConnect();
    const exist = await User.findOne({ email });
    if (exist) {
      return NextResponse.json({ error: "User already exist" });
    } else {
      const result = await User.create({ userName, email, role, userId });
      return NextResponse.json({ result });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function GET(req) {
  try {
    const userId = await req.nextUrl.searchParams.get("userId");
    const search = await req.nextUrl.searchParams.get("search");
    MongodbConnect();

    var result;

    if (search !== null && search.includes("@")) {
      result = await User.find({ email: search });
      return NextResponse.json({ status: "ok", data: result });
    }

    if (search) {
      result = await User.find({ $text: { $search: search } });
      return NextResponse.json({ status: "ok", data: result });
    }

    if (userId) {
      result = await User.findOne({ userId });
      return NextResponse.json({ status: "ok", data: result });
    }

    result = await User.find();

    return NextResponse.json({ status: "ok", data: result });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err });
  }
}
export async function PATCH(req) {
  try {
    const email = await req.nextUrl.searchParams.get("email");
    const role = await req.nextUrl.searchParams.get("role");
    MongodbConnect();

    const query = { email };
    const result = await User.updateOne(query, { $set: { role } });

    return NextResponse.json({ status: "ok", data: result });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err });
  }
}
export async function DELETE(req) {
  try {
    const email = await req.nextUrl.searchParams.get("email");
    MongodbConnect();

    const query = { email };
    const result = await User.deleteOne(query);

    return NextResponse.json({ status: "ok", data: result });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err });
  }
}
