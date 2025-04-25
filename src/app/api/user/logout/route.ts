import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
  const response = NextResponse.json({
    message: "Logout successful",
  });

  response.cookies.delete("token");

  return response;
}
