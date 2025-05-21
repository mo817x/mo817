import React from "react";

export default function App() {
  return (
    <main style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#000",
      color: "#00FFCC",
      fontFamily: "monospace",
      textAlign: "center",
      padding: "2rem"
    }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        Welcome to Mo817
      </h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "600px" }}>
        The world’s first symbolic SaaS platform powered by the 8 → 1 → 7 transformation cycle.
      </p>
      <p style={{ marginTop: "2rem", fontSize: "1rem", color: "#999" }}>
        mo817.vercel.app
      </p>
    </main>
  );
}
