import { NextResponse } from "next/server";
import { format } from "date-fns";

import { renderToBuffer } from "@react-pdf/renderer";
import { prisma } from '@/lib/prisma';
import { createElement } from 'react';
import WaiverPDF from '@/components/WaiverPDF';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const waiverId = searchParams.get("waiverId");

    if (!waiverId) {
        return new NextResponse("Missing waiverId", { status: 400 });
    }

    try {
        const waiver = await prisma.waiver.findUnique({
            where: { id: waiverId },
            include: { signature: true },
        });

        if (!waiver || !waiver.signature) {
            return new NextResponse("Waiver or signature not found.", { status: 404 });
        }

        const formattedDate = format(waiver.signature.date, "MMMM d, yyyy");

        const pdfBuffer = await renderToBuffer(
            createElement(WaiverPDF, {
              name: waiver.signature.name,
              date: formattedDate,
              waiverId: waiver.signature.id,
              signatureUrl: `https://uploadthing.com/f/${waiver.signature.fileKey}`,
            }) as React.ReactElement
          );

        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename=waiver-${waiverId}.pdf`,
            },
        });

    } catch (err) {
        console.error("PDF generation error:", err);
        return new NextResponse("Failed to generate PDF", { status: 500 });
    }
}
