import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
  const response = NextResponse.json({
    message: "Logout successful",
  });

  response.cookies.delete("token");

  return response;
}
