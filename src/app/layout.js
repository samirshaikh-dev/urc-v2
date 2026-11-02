import "./globals.css";
import { Toaster } from "sonner";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata();

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-page font-sans text-ink">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
