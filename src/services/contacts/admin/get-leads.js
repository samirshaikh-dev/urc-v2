import { leadsStore } from "../store.js";

export async function getAllLeads(status = "all") {
  let list = [...leadsStore];
  if (status && status !== "all") {
    list = list.filter((lead) => lead.status === status);
  }
  return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function getLeadById(id) {
  return leadsStore.find((lead) => lead.id === id) || null;
}

