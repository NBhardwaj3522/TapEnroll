export const dynamic = "force-dynamic";export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase";
import { headers } from "next/headers";

export default async function Home({
  searchParams,
}: {
  searchParams: { store?: string; product?: string };
}) {
  const store = searchParams.store ?? null;
  const product = searchParams.product ?? null;

  const userAgent = headers().get("user-agent");

  // This WILL now run on every request
  if (store || product) {
    await supabase.from("tap_events").insert({
      store_code: store,
      product_code: product,
      user_agent: userAgent,
    });
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>TapEnroll – Grocery Pilot</h1>
      <p>Thanks for tapping.</p>
    </main>
  );
}

import { supabase } from "@/lib/supabase";
import { headers } from "next/headers";

export default async function Home({
  searchParams,
}: {
  searchParams: { store?: string; product?: string };
}) {
  const store = searchParams.store ?? null;
  const product = searchParams.product ?? null;

  const userAgent = headers().get("user-agent");

  // Log the tap (fire-and-forget)
  if (store || product) {
    await supabase.from("tap_events").insert({
      store_code: store,
      product_code: product,
      user_agent: userAgent,
    });
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>TapEnroll – Grocery Pilot</h1>
      <p>Thanks for tapping.</p>
    </main>
  );
}
export default function Home() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>TapEnroll – Grocery Pilot</h1>
      <p>
        This is the MVP for the NFC grocery enrollment pilot.
      </p>
      <ul>
        <li>NFC-based enrollment flow</li>
        <li>QR / barcode generation</li>
        <li>SMS verification via Twilio</li>
        <li>Data storage via Supabase</li>
      </ul>
    </main>
  );
}
console.log("PAGE LOADED. PARAMS:", searchParams);

