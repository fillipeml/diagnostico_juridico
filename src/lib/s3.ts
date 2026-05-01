import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION || "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToS3(
  buffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<string> {
  const sanitized = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  const key = `processos/${Date.now()}-${sanitized}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
    })
  );

  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}
