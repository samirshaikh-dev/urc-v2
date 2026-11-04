import "./globals.css";
import { Toaster } from "sonner";
import { rootMetadata, getRootJsonLd } from "@/lib/seo";

export const metadata = rootMetadata;

export default function RootLayout({ children }) {
  const rootJsonLd = getRootJsonLd();

  return (
    <html lang="en" data-scroll-behavior="smooth" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootJsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-page font-sans text-ink">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
