import { db } from "../../../lib/db";
import { verifyToken } from "../../../lib/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { userId } = verifyToken(token) as { userId: string };
  const result = await db.query("SELECT * FROM documents WHERE user_id = $1", [userId]);
  return NextResponse.json(result.rows);
}

export async function POST(request: Request): Promise<NextResponse> {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { userId } = verifyToken(token) as { userId: string };
  const { title, content } = await request.json();
  const result = await db.query(
    "INSERT INTO documents (user_id, title, content) VALUES ($1, $2, $3) RETURNING *",
    [userId, title, content]
  );
  return NextResponse.json(result.rows[0], { status: 201 });
}