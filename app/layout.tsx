import type { Metadata } from "next";
import { Cairo, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const cairo = Cairo({ variable: "--font-arabic", subsets: ["arabic", "latin"], weight: ["400", "500", "600", "700", "900"] });

export const metadata: Metadata = {
  title: "Mohammad Adib Armouch — Software Engineer",
  description: "Software Engineer — Full-Stack, Mobile & LLM Applications. Based in Riyadh, Saudi Arabia.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} noise antialiased`}>
        {children}
      </body>
    </html>
  );
}
