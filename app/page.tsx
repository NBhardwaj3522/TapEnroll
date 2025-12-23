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
