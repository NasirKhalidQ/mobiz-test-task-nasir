import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
import { AppContextProvider } from "@/context";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: any) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Toaster />
        <AppContextProvider>{children}</AppContextProvider>
      </body>
    </html>
  );
}
