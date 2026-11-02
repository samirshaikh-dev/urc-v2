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
      <AdminSidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

