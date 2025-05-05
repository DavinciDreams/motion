'use client';
import { useRef, useEffect } from "react";
import { upload } from "@vercel/blob/client";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let drawing = false;

    const startDrawing = () => (drawing = true);
    const stopDrawing = () => (drawing = false);
    const draw = (e: MouseEvent) => {
      if (!drawing) return;
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mousemove", draw);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mousemove", draw);
    };
  }, []);

  const saveDrawing = async () => {
    const canvas = canvasRef.current!;
    const blob = await new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b!), "image/png"));
    
    const { url } = await upload("drawing.png", blob, {
      access: "public",
      handleUploadUrl: async (url: string) => {
        // Perform the upload using a fetch request to the signed URL
        const response = await fetch(url, {
          method: "PUT",
          body: blob,
          headers: {
            "Content-Type": "image/png",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to upload blob");
        }
        return response;
      },
    });

    console.log("Drawing saved:", url);
  };

  return (
    <div>
      <canvas ref={canvasRef} width={800} height={400} className="border" />
      <button onClick={saveDrawing} className="mt-2 p-2 bg-blue-500 text-white">
        Save Drawing
      </button>
    </div>
  );
}