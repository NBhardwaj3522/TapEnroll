export const dynamic = "force-dynamic";

import { supabase } from "./lib/supabase";
import { headers } from "next/headers";

export default async function Home({
  searchParams,
}: {
  searchParams: { store?: string; product?: string };
}) {
  const store = searchParams.store ?? null;
  const product = searchParams.product ?? null;

  const userAgent = headers().get("user-agent");

  let insertResult: string = "NOT ATTEMPTED";

  try {
    if (store || product) {
      const { error } = await supabase.from("tap_events").insert({
        store_code: store,
        product_code: product,
        user_agent: userAgent,
      });

      if (error) {
        insertResult = `SUPABASE ERROR: ${error.message}`;
      } else {
        insertResult = "INSERT SUCCESS";
      }
    } else {
      insertResult = "NO STORE OR PRODUCT PARAM";
    }
  } catch (err: any) {
    insertResult = `EXCEPTION: ${err.message}`;
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>TapEnroll – Debug Mode</h1>

      <p><strong>STORE PARAM:</strong> {store ?? "NONE"}</p>
      <p><strong>PRODUCT PARAM:</strong> {product ?? "NONE"}</p>
      <p><strong>USER AGENT:</strong> {userAgent ?? "NONE"}</p>
      <p><strong>SUPABASE INSERT:</strong> {insertResult}</p>
      <p><strong>RENDERED AT:</strong> {new Date().toISOString()}</p>
    </main>
  );
}
