import { NextRequest, NextResponse } from "next/server";
import { analyzeImage } from "@/lib/ai-service";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body?.imageRef) {
      return NextResponse.json(
        { error: "No image provided. Upload or capture a photo before analyzing." },
        { status: 400 }
      );
    }

    const result = await analyzeImage(body.imageRef);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Scan analysis failed:", err);
    return NextResponse.json(
      { error: "AI analysis is temporarily unavailable. Please try again." },
      { status: 502 }
    );
  }
}
