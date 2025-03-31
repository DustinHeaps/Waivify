import { downloadWaiverPdf } from '@/app/actions/waiver';
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const waiverId = searchParams.get("waiverId");

  if (!waiverId) {
    return new NextResponse("Missing waiverId", { status: 400 });
  }

  try {
    const pdf = await downloadWaiverPdf(waiverId);

    return new NextResponse(pdf, {
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
