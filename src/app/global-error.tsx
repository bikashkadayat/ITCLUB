"use client";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "Inter, system-ui, sans-serif", background: "#fafaff", color: "#0b0d2a", display: "grid", placeItems: "center", minHeight: "100vh", margin: 0 }}>
        <div style={{ textAlign: "center", padding: 24 }}>
          <p style={{ fontSize: 12, color: "#5b5f7a" }}>Tech &amp; AI Innovation Club{error.digest ? ` · ref ${error.digest}` : ""}</p>
          <h1 style={{ fontSize: 28, margin: "12px 0" }}>Something went wrong</h1>
          <button onClick={reset} style={{ background: "#2027e3", color: "#fff", border: 0, borderRadius: 999, padding: "10px 20px", fontWeight: 500, cursor: "pointer" }}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
