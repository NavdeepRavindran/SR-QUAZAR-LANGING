import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SR Quazar Solutions | Intelligent Automotive & Healthcare Technology",
  description: "Transform your investment portfolio with SR Quazar Solutions - pioneering Artificial Automotive Intelligence (A2I) and healthcare technologies to revolutionize industries.",
  keywords: ["automotive AI", "healthcare technology", "investor relations", "A2I technology", "digital twin", "investor opportunity"],
  applicationName: "SR Quazar Solutions",
  authors: [{ name: "SR Quazar Solutions" }],
  themeColor: "#0052cc",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
