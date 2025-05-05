import { db } from "../../../../lib/db";
import { verifyPassword, generateToken } from "../../../../lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { email, password } = await request.json();
  const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  const user = result.rows[0];
  if (user && (await verifyPassword(password, user.password))) {
    const token = generateToken(user.id);
    return NextResponse.json({ token });
  }
  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}