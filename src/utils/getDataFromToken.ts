import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getDataFromToken = async (request: NextRequest) => {
  const token =
    request.cookies.get("token")?.value ||
    request.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    throw new Error("No token found");
  }

  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as any;

  return decodedToken.id;
};
