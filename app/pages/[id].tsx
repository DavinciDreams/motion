
'use client';
import { useState, useEffect } from "react";
import Editor from "../components/Editor";
import Canvas from "../components/Canvas";
import Embed from "../components/Embed";

interface Props {
  params: { id: string };
}

export default function Document({ params }: Props) {
  const [content, setContent] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`/api/documents/${params.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((doc) => setContent(doc.content));
  }, [params.id]);

  const updateContent = async (newContent: string) => {
    const token = localStorage.getItem("token");
    await fetch(`/api/documents/${params.id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ content: newContent }),
    });
    setContent(newContent);
  };

  return (
    <div className="p-4 space-y-4">
      <Editor content={content} docId={params.id} onUpdate={updateContent} />
      <Canvas />
      <Embed />
    </div>
  );
}