"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function EnrollClient() {
  const searchParams = useSearchParams();
  const store = searchParams.get("store");

  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function submit() {
    await fetch("/api/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, store }),
    });

    setSubmitted(true);
  }

  if (submitted) {
    return <h2>Thanks! Check your phone 📱</h2>;
  }

  return (
    <div style={{ padding: 32 }}>
      <h1>Join our loyalty program</h1>
      <p>Enter your phone number to get your reward.</p>

      <input
        type="tel"
        placeholder="+1XXXXXXXXXX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ padding: 12, width: "100%", marginBottom: 12 }}
      />

      <button onClick={submit} style={{ padding: 12, width: "100%" }}>
        Get My Reward
      </button>
    </div>
  );
}
