import connectMongodb from "@/database/connectMongodb";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        const data = await req.json();
        await connectMongodb();
        return NextResponse.json(data);
    }catch(error){
        console.log(error);
        return NextResponse.json({error: error.message});
    }
}


export async function GET(){
    try {
        return NextResponse.json({success: true});
    } catch (error) {
        return NextResponse.json({error: error.message});
    }
}