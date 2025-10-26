import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

export async function POST(request: Request) {
  const formData = await request.formData();

  const imageFile = formData.get("file") as File;
  const userId = formData.get("userId") as string;
  // Basic validations
  if (!imageFile) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  if (!userId || userId.trim() === "") {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  if (
    imageFile.type !== "image/jpeg" &&
    imageFile.type !== "image/png" &&
    imageFile.type !== "image/jpg"
  ) {
    return NextResponse.json(
      { error: "Invalid image format. Use JPG, JPEG, or PNG." },
      { status: 400 }
    );
  }

  // Convert file to a Buffer (use Uint8Array / Buffer.from to preserve bytes correctly)
  const arrayBuffer = await imageFile.arrayBuffer();
  const buffer = Buffer.from(new Uint8Array(arrayBuffer));

  try {
    const results: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            public_id: `avatar_${userId}`,
            folder: "avatars",
            overwrite: true,
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(buffer);
    });

    return NextResponse.json(
      { message: "File uploaded successfully", result: results },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Upload error:", error);

    return NextResponse.json(
      { error: error?.message ?? "Upload failed" },
      { status: 500 }
    );
  }
}
