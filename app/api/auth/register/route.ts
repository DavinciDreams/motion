import { db } from "../../../../lib/db";
import { hashPassword } from "../../../../lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { email, password } = await request.json();
  const hashedPassword = await hashPassword(password);
  try {
    await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, hashedPassword]);
    return NextResponse.json({ message: "Registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "User exists" }, { status: 400 });
  }
}