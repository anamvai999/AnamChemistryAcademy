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
        MongodbConnect();
        const result = await User.findOne({ userId });
        return NextResponse.json({ status: "ok", data: result });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: err });
    }
}
