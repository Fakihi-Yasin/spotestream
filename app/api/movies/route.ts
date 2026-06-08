import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const dir = path.join(process.cwd(), "public", "movies");
  const files = fs.readdirSync(dir).filter(f =>
    /\.(jpe?g|png|webp|avif|gif)$/i.test(f)
  );
  return NextResponse.json(files);
}
