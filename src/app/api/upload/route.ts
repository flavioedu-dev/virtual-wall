import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import {UploadApiResponse, v2 as cloudinary} from 'cloudinary';
import path, { resolve } from "path";
import { rejects } from "assert";
          
cloudinary.config({ 
  cloud_name: 'dfmdiobwa', 
  api_key: '565637417433824', 
  api_secret: 'R4eo0yVZ9xwPWY8ocV69Bph00Q0' 
});

export async function POST(request: any) {
  interface CloudinaryUploadResponse {
    secure_url: string;
  }
  const data = await request.formData();
  const image = data.get("image");

  if (!image) {
    return NextResponse.json({ error: "Não se subiu nenhuma imagem" }, { status: 400 });
  }

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const response:CloudinaryUploadResponse|UploadApiResponse | undefined = await new Promise((resolve, rejects) => {
    cloudinary.uploader.upload_stream({},(err, result) => {
      if(err){
        rejects(err)
      }
      resolve(result)
    }).end(buffer)

  })

  if (response) {
    return NextResponse.json({ 
      message: "Imagem subida com sucesso",
      url: response.secure_url
    });
  } else {
    return NextResponse.json({ error: "Erro ao fazer upload da imagem" }, { status: 500 });
  }
}
