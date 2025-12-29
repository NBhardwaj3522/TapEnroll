"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const store = searchParams.get("store");

  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);

    await fetch("/api/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, store }),
    });

    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <main style={{ padding: "2rem", textAlign: "center" }}>
        <h2>🎉 You’re in!</h2>
        <p>Your reward has been sent to your phone.</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem", maxWidth: 400, margin: "0 auto" }}>
      <h1>Join Our Loyalty Program</h1>
      <p>Get exclusive offers sent straight to your phone.</p>

      <input
        type="tel"
        placeholder="Phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ width: "100%", padding: "12px", fontSize: "16px" }}
      />

      <button
        onClick={submit}
        disabled={loading || !phone}
        style={{
          marginTop: "1rem",
          width: "100%",
          padding: "12px",
          fontSize: "16px",
        }}
      >
        {loading ? "Sending..." : "Get My Reward"}
      </button>

      <p style={{ fontSize: 12, marginTop: 12 }}>
        By joining, you agree to receive recurring automated promotional SMS.
        Msg & data rates may apply.
      </p>
    </main>
  );
}


