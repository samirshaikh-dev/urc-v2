import "./globals.css";
import { Toaster } from "sonner";
import { rootMetadata, getRootJsonLd, getJsonLdScriptProps } from "@/lib/seo";

export const metadata = rootMetadata;

export default function RootLayout({ children }) {
  const rootJsonLd = getRootJsonLd();

  return (
    <html lang="en" data-scroll-behavior="smooth" className="h-full antialiased">
      <head>
        <script {...getJsonLdScriptProps(rootJsonLd)} />
      </head>
      <body className="flex min-h-full flex-col bg-page font-sans text-ink">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
