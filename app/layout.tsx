import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TapEnroll – Grocery Pilot",
  description: "NFC enrollment MVP for grocery pilot"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
