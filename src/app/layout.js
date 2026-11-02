import "./globals.css";
import { cacheLife } from "next/cache";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata();

// Cache Components disallows `new Date()` during prerendering, so the footer
// year is cached instead of evaluated on every render.
async function getCurrentYear() {
  "use cache";
  cacheLife("weeks");
  return new Date().getFullYear();
}

export default async function RootLayout({ children }) {
  const currentYear = await getCurrentYear();

  return (
    <html lang="en" data-scroll-behavior="smooth" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-page font-sans text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-control focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-maroon"
        >
          Skip to content
        </a>
        <Navbar />
        <main
          id="main-content"
          tabIndex={-1}
          className="flex flex-1 flex-col focus:outline-none"
        >
          {children}
        </main>
        <Footer currentYear={currentYear} />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
