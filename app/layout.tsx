import type { Metadata } from "next";
import { Providers } from "./providers";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Adro FarmLab IoT",
  description: "Smart farm monitoring and pump control dashboard.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
