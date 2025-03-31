import { NextResponse } from "next/server";

// A 1x1 transparent GIF to return
const transparentGif = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
  "base64"
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const waiverId = searchParams.get("waiverId");

  return new NextResponse(transparentGif, {
    headers: {
      "Content-Type": "image/gif",
      "Content-Length": transparentGif.length.toString(),
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Expires: "0",
      Pragma: "no-cache",
    },
  });
}
