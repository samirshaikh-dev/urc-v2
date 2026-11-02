"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronsLeft,
  ChevronsRight,
  Package,
  FileText,
  Inbox,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { logoutAdminAction } from "@/actions/admin-products";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    label: "Products",
    href: "/admin/products",
    icon: Package,
    matchPrefix: "/admin/products",
  },
  {
    label: "Blogs",
    href: "/admin/blogs",
    icon: FileText,
    matchPrefix: "/admin/blogs",
  },
  {
    label: "Leads",
    href: "/admin/leads",
    icon: Inbox,
    matchPrefix: "/admin/leads",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="flex md:hidden items-center justify-between border-b border-[#D9DCD1] bg-[#F7F8F2] px-4 py-3 sticky top-0 z-30 w-full">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#111111]">
            URC CMS
          </span>
          <span className="rounded-md bg-[#F1F2EA] px-1.5 py-0.5 text-[10px] font-medium text-[#687080]">
            Admin
          </span>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg border border-[#D9DCD1] bg-white p-1.5 text-[#111111] hover:bg-[#F1F2EA] transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "bg-[#F7F8F2] border-r border-[#D9DCD1] flex flex-col justify-between transition-all duration-200 z-40 select-none",
          // Desktop styles
          "hidden md:flex md:sticky md:top-0 md:h-screen shrink-0",
          collapsed ? "md:w-16" : "md:w-[230px]",
          // Mobile drawer styles
          mobileOpen &&
            "fixed inset-y-0 left-0 flex w-[230px] shadow-xl md:shadow-none"
        )}
      >
        {/* Top Header & Navigation */}
        <div className="flex flex-col flex-1 p-3.5 overflow-y-auto">
          {/* Header Row: MENU label and Collapse Toggle */}
          <div className="flex items-center justify-between px-2 pt-1 pb-4 border-b border-[#D9DCD1]/60">
            {!collapsed && (
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#687080]">
                MENU
              </span>
            )}
            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              className={cn(
                "hidden md:inline-flex items-center justify-center size-7 rounded-lg text-[#687080] hover:text-[#111111] hover:bg-[#F1F2EA] transition-colors",
                collapsed && "mx-auto"
              )}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <ChevronsRight className="size-4" />
              ) : (
                <ChevronsLeft className="size-4" />
              )}
            </button>
          </div>

          {/* Core Navigation Items: Products, Blogs, Leads */}
          <nav className="mt-4 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname?.startsWith(item.matchPrefix);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "group relative flex items-center gap-3 px-3 py-2 text-xs font-medium rounded-lg transition-all duration-150",
                    isActive
                      ? "bg-[#E9EAE1] text-[#111111] font-semibold shadow-2xs"
                      : "text-[#687080] hover:bg-[#F1F2EA] hover:text-[#111111]",
                    collapsed && "justify-center px-0"
                  )}
                  title={item.label}
                >
                  <Icon className="size-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions: View Public Site & Log Out */}
        <div className="p-3.5 border-t border-[#D9DCD1] space-y-1">
          {/* View Public Site */}
          <Link
            href="/"
            target="_blank"
            className={cn(
              "flex items-center gap-3 px-3 py-2 text-xs font-medium text-[#687080] hover:bg-[#F1F2EA] hover:text-[#111111] rounded-lg transition-colors",
              collapsed && "justify-center px-0"
            )}
            title="View Public Site (opens new tab)"
          >
            <ExternalLink className="size-4 shrink-0" />
            {!collapsed && <span>View Public Site</span>}
          </Link>

          {/* Logout Action */}
          <form action={logoutAdminAction}>
            <button
              type="submit"
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-[#687080] hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors cursor-pointer",
                collapsed && "justify-center px-0"
              )}
              title="Log Out"
            >
              <LogOut className="size-4 shrink-0" />
              {!collapsed && <span>Log Out</span>}
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}

