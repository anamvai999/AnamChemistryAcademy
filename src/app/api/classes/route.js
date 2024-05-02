import { NextResponse } from "next/server";

export async function POST(){
    try{
        return NextResponse.json({message: "king no queen"});
    }catch{
        return NextResponse.json({message: "yo"});
    }
}