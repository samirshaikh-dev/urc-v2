"use server";

import { getAdminSession } from "@/lib/auth";
import { getAllLeads, getLeadById } from "@/services/contacts/admin/get-leads";

export async function getAdminLeadsAction(status = "all") {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized.");
  }
  return getAllLeads(status);
}

export async function getAdminLeadByIdAction(id) {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("Unauthorized.");
  }
  return getLeadById(id);
}

