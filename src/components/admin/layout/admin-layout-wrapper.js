"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "./admin-sidebar";

export function AdminLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-[#F7F8F2] text-[#111111] antialiased">
        {children}
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F7F8F2] text-[#111111] antialiased">
      <a
        href="#admin-main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-control focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-maroon"
      >
        Skip to content
      </a>
      <AdminSidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <main
          id="admin-main-content"
          tabIndex={-1}
          className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto focus:outline-none"
        >
          {children}
        </main>
      </div>
    </div>
  );
}

