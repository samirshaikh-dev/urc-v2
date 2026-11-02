import { AdminLayoutWrapper } from "@/components/admin/layout/admin-layout-wrapper";

export const metadata = {
  title: "Admin Portal | United Rubber Cork",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
