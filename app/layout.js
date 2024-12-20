import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <h1 className="text-center mt-8">
          <Link href="/">Brice vs 2025</Link>

        </h1>
        <main className="grow">
          {children}
        </main>
        <footer className="p-4 text-center bg-base-300 mt-8 ">
          <div className=" flex justify-between items-center max-w-screen-lg m-auto">

            <a className="link link-primary link-hover text-sm" href="https://brice-eliasse.com" target="_blank">Brice Eliasse</a>
            <Link className="link link-primary link-hover text-sm" href="/data">Data</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
