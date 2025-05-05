'use client';
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

interface EditorProps {
  content: string;
  onUpdate: (content: string) => void;
}

export default function Editor({ content, onUpdate }: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => onUpdate(editor.getHTML()),
  });

  useEffect(() => {
    if (!editor) return;
    const ws = new WebSocket("ws://localhost:3000/api/ws");
    ws.onmessage = (event) => {
      editor.commands.setContent(event.data);
    };
    return () => ws.close();
  }, [editor]);

  return <EditorContent editor={editor} />;
}