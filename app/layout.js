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

export const metadata = {
  title: "Progress 2025",
  description: "-",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer className="py-4 text-center bg-base-300 mt-8"><a className="link link-primary link-hover text-sm" href="https://brice-eliasse.com" target="_blank">Brice Eliasse</a></footer>
      </body>
    </html>
  );
}
