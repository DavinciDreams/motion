'use client';
import { useState } from "react";

export default function Embed() {
  const [url, setUrl] = useState("");

  return (
    <div>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL to embed"
        className="border p-2 w-full"
      />
      {url && <iframe src={url} width="100%" height="400px" className="mt-2" />}
    </div>
  );
}