import { redirect } from "next/navigation";

export default function AdminContactRedirect() {
  redirect("/admin/leads");
}

