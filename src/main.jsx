import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://vqueynunlfaxvgmxfben.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxdWV5bnVubGZheHZnbXhmYmVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc3OTAwODksImV4cCI6MjA2MzM2NjA4OX0.IdbxeDSj4S91ykajiYzK4OWYZ4dUvKtQALX-4QmbH5k"
);

function generateSymbolicToken() {
  const base = Math.random().toString(36).substring(2, 10).toUpperCase();
  const timestamp = Date.now().toString(36).toUpperCase();
  return `SYMB-${base}-${timestamp}`;
}

export default function App() {
  const [symbolicToken, setSymbolicToken] = useState("");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const token = generateSymbolicToken();
    setSymbolicToken(token);
  }, []);

  const handleAsk = async () => {
    if (question.trim() === "") return;
    const symbolicAnswer = `Symbolic Response to: "${question}" → Suggested Tool: RUKU-17 (Cycle: 8→1→7)`;
    setResponse(symbolicAnswer);

    const entry = {
      token: symbolicToken,
      question: question,
      response: symbolicAnswer,
      created_at: new Date().toISOString(),
    };

    setHistory([entry, ...history]);
    setQuestion("");

    await supabase.from("symbolic_interactions").insert([entry]);
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif", background: "#000", color: "#fff", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Mo817.ai</h1>
      <p style={{ marginBottom: "1rem" }}>Ask a symbolic question and receive insight:</p>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a symbolic question..."
        style={{ padding: "0.5rem", width: "100%", marginBottom: "1rem" }}
      />
      <button onClick={handleAsk} style={{ padding: "0.5rem 1rem", marginBottom: "1rem" }}>
        Submit to NSAI
      </button>
      {response && <div style={{ background: "#222", padding: "1rem", borderRadius: "0.5rem" }}>{response}</div>}
      {history.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Symbolic Memory</h2>
          <ul>
            {history.map((entry, idx) => (
              <li key={idx} style={{ marginBottom: "1rem" }}>
                <div>{entry.created_at} – Token: {entry.token}</div>
                <div>Q: {entry.question}</div>
                <div>A: {entry.response}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
