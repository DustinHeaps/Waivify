// import { NextResponse } from "next/server";
// import { renderToBuffer } from "@react-pdf/renderer";
// import { prisma } from "@/lib/prisma";

import { NextResponse } from "next/server";

// import WaiverPDF from "@/components/WaiverPDF";
// import { format } from "date-fns";
// import { createElement } from 'react';

// export const runtime = "nodejs";

export async function GET(req: Request) {
  //   const { searchParams } = new URL(req.url);
  //   const waiverId = searchParams.get("waiverId");

  //   if (!waiverId) return new NextResponse("Missing waiverId", { status: 400 });

  //   const waiver = await prisma.waiver.findUnique({
  //     where: { id: waiverId },
  //     include: { signature: true },
  //   });

  //   if (!waiver || !waiver.signature)
  //     return new NextResponse("Waiver or signature not found", { status: 404 });

  //   const formattedDate = format(waiver.signature.date, "MMMM d, yyyy");

  //   const pdfBuffer = await renderToBuffer(
  //     createElement(WaiverPDF, {
  //       name={waiver.signature.name}
  //       date={formattedDate}
  //       waiverId={waiver.signature.id}
  //       signatureUrl={`https://uploadthing.com/f/${waiver.signature.fileKey}`}
  //     })
  // );

  return NextResponse.json({ received: true });
}
