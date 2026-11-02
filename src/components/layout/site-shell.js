import { cacheLife } from "next/cache";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

// Cache Components disallows `new Date()` during prerendering, so the footer
// year is cached instead of evaluated on every render.
async function getCurrentYear() {
  "use cache";
  cacheLife("weeks");
  return new Date().getFullYear();
}

/**
 * Public site chrome (skip link, navbar, main landmark, footer).
 *
 * Kept out of the root layout so the admin route tree can render without the
 * marketing navbar and footer.
 */
export async function SiteShell({ children }) {
  const currentYear = await getCurrentYear();

  return (
    <>
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
    </>
  );
}
