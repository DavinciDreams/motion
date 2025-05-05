import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface Document {
  id: string;
  title: string;
}

export default function Home() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/documents", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then(setDocuments);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Documents</h1>
      <ul className="mt-4">
        {documents.map((doc) => (
          <li
            key={doc.id}
            onClick={() => router.push(`/${doc.id}`)}
            className="cursor-pointer p-2 hover:bg-gray-100"
          >
            {doc.title}
          </li>
        ))}
      </ul>
    </div>
  );
}