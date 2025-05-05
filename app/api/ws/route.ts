
import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

// GET: Poll for document content updates
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { searchParams } = new URL(request.url);
  const docId = searchParams.get("docId");
  if (!docId) {
    return NextResponse.json({ error: "Document ID required" }, { status: 400 });
  }

  try {
    const result = await db.query("SELECT content FROM documents WHERE id = $1", [docId]);
    const document = result.rows[0];
    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }
    return NextResponse.json({ content: document.content });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

// POST: Update document content
export async function POST(request: Request) {
  const { docId, content } = await request.json();
  if (!docId || !content) {
    return NextResponse.json({ error: "Document ID and content required" }, { status: 400 });
  }

  try {
    await db.query("UPDATE documents SET content = $1 WHERE id = $2", [content, docId]);
    return NextResponse.json({ message: "Content updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}