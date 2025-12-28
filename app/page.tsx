export const dynamic = "force-dynamic";

import { headers } from "next/headers";

export default function Home({
  searchParams,
}: {
  searchParams: { store?: string; product?: string };
}) {
  const store = searchParams.store ?? null;
  const product = searchParams.product ?? null;

  const userAgent = headers().get("user-agent");

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>TapEnroll</h1>

      <p><strong>STORE:</strong> {store ?? "NONE"}</p>
      <p><strong>PRODUCT:</strong> {product ?? "NONE"}</p>
      <p><strong>USER AGENT:</strong> {userAgent ?? "NONE"}</p>

      {/* Runtime-only call */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            fetch("/api/tap", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                store: ${JSON.stringify(store)},
                product: ${JSON.stringify(product)}
              })
            });
          `,
        }}
      />
    </main>
  );
}

