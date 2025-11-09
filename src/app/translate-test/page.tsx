// app/test-translate/page.tsx
"use client";
import { useState } from "react";

export default function TestTranslate() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const testTranslation = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          word: "hello",
          from: "en",
          to: "es",
        }),
      });

      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult("Error: " + error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Test Translation API</h1>

        <button
          onClick={testTranslation}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Testing..." : "Test Translation"}
        </button>

        {result && (
          <pre className="mt-6 p-4 bg-gray-100 rounded-lg overflow-auto">
            {result}
          </pre>
        )}
      </div>
    </div>
  );
}
