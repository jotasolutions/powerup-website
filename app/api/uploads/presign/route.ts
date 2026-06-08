import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ulid } from "ulid";
import { z } from "zod";

import { s3 } from "@/lib/s3";

export const runtime = "nodejs";

const BodySchema = z.object({
  files: z
    .array(
      z.object({
        name: z.string().optional(),
        type: z.string().default("image/jpeg"),
        size: z.number().positive(),
      })
    )
    .min(1),
  directory: z.string().min(1),
});

const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "application/pdf",
]);
const MAX_SIZE_BYTES = 25 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    const { files, directory } = BodySchema.parse(await req.json());
    const sanitizedDirectory = sanitizeDirectory(directory);

    for (const file of files) {
      if (!ALLOWED.has(file.type)) {
        throw new Error(`Tipo no permitido: ${file.type}`);
      }
      if (file.size > MAX_SIZE_BYTES) {
        throw new Error(`Archivo supera el límite (${MAX_SIZE_BYTES} bytes)`);
      }
    }

    const bucket = process.env.S3_BUCKET!;
    const uploads = [];

    for (const file of files) {
      const ext = mimeToExt(file.type);
      const key = `${sanitizedDirectory}/${ulid()}${ext}`;

      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        ContentType: file.type,
        ...(file.name
          ? { Metadata: { original_name: sanitizeMetadataValue(file.name) } }
          : {}),
      });

      const url = await getSignedUrl(s3, command, { expiresIn: 60 * 10 });
      uploads.push({
        key,
        url,
        publicUrl: `https://${bucket}.s3.${process.env.AWS_REGION || "eu-west-3"}.amazonaws.com/${key}`,
        headers: { "Content-Type": file.type },
      });
    }

    return NextResponse.json({ uploads });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Bad Request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

function sanitizeDirectory(directory: string) {
  return directory
    .replace(/\.\./g, "")
    .replace(/^\/+|\/+$/g, "")
    .replace(/\/+/g, "/");
}

function mimeToExt(mimeType: string) {
  if (mimeType === "image/jpeg") return ".jpg";
  if (mimeType === "image/png") return ".png";
  if (mimeType === "image/webp") return ".webp";
  if (mimeType === "image/heic") return ".heic";
  if (mimeType === "application/pdf") return ".pdf";
  return "";
}

function sanitizeMetadataValue(value: string) {
  return value.replace(/[^\x20-\x7E]/g, "").slice(0, 512);
}
