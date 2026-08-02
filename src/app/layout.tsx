import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dastoor — Dressed by Tradition",
  description: "Premium gents wear. Shirts, pants, belts, and more. Cash on delivery across Pakistan.",
  keywords: "dastoor, men clothing, shirts, pants, gents wear, pakistan, online shopping",
  openGraph: {
    title: "Dastoor — Dressed by Tradition",
    description: "Premium gents wear. Cash on delivery across Pakistan.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
