import { Suspense } from "react";
import { AdminLayoutContent } from "./admin-layout-content";

/**
 * Fallback shell shown while the pathname-dependent admin layout hydrates.
 * It deliberately matches the login-page surface (no sidebar) so the public
 * `/admin/login` page never flashes the authenticated sidebar.
 */
function AdminLayoutFallback({ children }) {
  return (
    <div className="min-h-screen bg-[#F7F8F2] text-[#111111] antialiased">
      {children}
    </div>
  );
}

export function AdminLayoutWrapper({ children }) {
  return (
    <Suspense fallback={<AdminLayoutFallback>{children}</AdminLayoutFallback>}>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </Suspense>
  );
}
