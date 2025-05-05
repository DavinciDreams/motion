'use client';
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useCallback } from "react";

interface EditorProps {
  content: string;
  docId: string;
  onUpdate: (content: string) => void;
}

export default function Editor({ content, docId, onUpdate }: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      onUpdate(newContent);
      // Send update to server
      fetch("/api/ws", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ docId, content: newContent }),
      });
    },
  });

  // Poll for updates every 5 seconds
  useEffect(() => {
    if (!editor) return;

    const pollUpdates = async () => {
      const response = await fetch(`/api/ws?docId=${docId}`);
      const data = await response.json();
      if (data.content && data.content !== editor.getHTML()) {
        editor.commands.setContent(data.content);
      }
    };

    const interval = setInterval(pollUpdates, 5000);
    return () => clearInterval(interval);
  }, [editor, docId]);

  return <EditorContent editor={editor} />;
}