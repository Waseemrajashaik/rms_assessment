import ContextProvider from "@/providers/ContextProvider";
import { QueryClientProvider } from "@/providers/QueryClientProvider";

import "./globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description: "A dashboard showing recent earthquake data",
  title: "Earthquake Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <QueryClientProvider>{children}</QueryClientProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
