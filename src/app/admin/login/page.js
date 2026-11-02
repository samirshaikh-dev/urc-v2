"use client";

import { useActionState } from "react";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { loginAdminAction } from "@/actions/admin-products";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdminAction, null);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F8F2] px-4 py-12 text-[#111111]">
      <div className="w-full max-w-md rounded-2xl border border-[#D9DCD1] bg-white p-8 shadow-xs sm:p-10">
        {/* Brand Header */}
        <div className="text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl border border-[#D9DCD1] bg-[#F1F2EA] text-[#111111]">
            <Lock className="size-5" />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#111111]">
            Admin Portal
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#687080]">
            United Rubber Cork &bull; Product Catalog CMS
          </p>
        </div>

        {/* Error Notification */}
        {state?.error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-700">
            {state.error}
          </div>
        )}

        {/* Form */}
        <form action={formAction} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#111111] uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                defaultValue="admin@unitedrubbercork.com"
                placeholder="admin@unitedrubbercork.com"
                className="w-full rounded-xl border border-[#D9DCD1] bg-[#F1F2EA]/50 px-3.5 py-2.5 pl-10 text-xs sm:text-sm text-[#111111] placeholder:text-[#687080] focus:border-[#111111] focus:bg-white focus:outline-none transition-colors"
              />
              <Mail className="absolute left-3.5 top-3 size-4 text-[#687080]" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111111] uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                required
                placeholder="Enter password"
                className="w-full rounded-xl border border-[#D9DCD1] bg-[#F1F2EA]/50 px-3.5 py-2.5 pl-10 text-xs sm:text-sm text-[#111111] placeholder:text-[#687080] focus:border-[#111111] focus:bg-white focus:outline-none transition-colors"
              />
              <Lock className="absolute left-3.5 top-3 size-4 text-[#687080]" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#111111] py-2.5 text-xs sm:text-sm font-semibold text-white shadow-2xs hover:bg-black disabled:opacity-50 transition-colors cursor-pointer"
            >
              <span>{isPending ? "Signing in..." : "Log In to Portal"}</span>
              <ArrowRight className="size-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
