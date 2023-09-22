import { NextResponse } from "next/server";
export async function POST(request: any){
    const data = await request.formData()
    return NextResponse.json("imagem subida")
}