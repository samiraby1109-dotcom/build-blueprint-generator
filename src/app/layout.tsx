import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HighLevel Build Blueprint Generator | The Funnel Flippers",
  description:
    "Discover what custom HighLevel systems we could build for your business. Take the quiz and get your personalized build blueprint.",
  keywords: [
    "HighLevel",
    "automation",
    "business systems",
    "custom builds",
    "The Funnel Flippers",
    "GoHighLevel",
  ],
  openGraph: {
    title: "HighLevel Build Blueprint Generator",
    description:
      "Discover what custom HighLevel systems we could build for your business.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
