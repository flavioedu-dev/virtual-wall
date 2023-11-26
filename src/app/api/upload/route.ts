import { NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { Buffer } from "buffer";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: 'dfmdiobwa',
  api_key: '565637417433824',
  api_secret: 'R4eo0yVZ9xwPWY8ocV69Bph00Q0'
});

export async function POST(request: any) {
  try {
    console.log("Iniciando processamento da requisição...");

    interface CloudinaryUploadResponse {
      secure_url: string;
    }

    const data = await request.formData();
    const file = data.get("file");

    if (!file) {
      console.error("Nenhum arquivo foi enviado");
      return NextResponse.json({ error: "Nenhum arquivo foi enviado" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadPromise = new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (err: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
          if (err) {
            console.error("Erro durante upload:", err);
            reject({ error: "Erro ao fazer upload do arquivo" });
          }

          if (result) {
            const cloudinaryResult = result as CloudinaryUploadResponse;
            console.log("Upload bem-sucedido. URL:", cloudinaryResult.secure_url);
            resolve({
              message: "Arquivo subido com sucesso",
              url: cloudinaryResult.secure_url
            });
          } else {
            console.error("Resultado inesperado durante upload");
            reject({ error: "Erro ao fazer upload do arquivo" });
          }
        }
      );

      const readableStream = new Readable();
      readableStream.push(buffer);
      readableStream.push(null);

      readableStream.pipe(stream);
    });

    // Aguardar a conclusão do upload antes de retornar a resposta
    const uploadResult = await uploadPromise;

    console.log("Requisição processada com sucesso.");
    return NextResponse.json(uploadResult);
  } catch (error) {
    console.error("Erro no processamento da requisição:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

