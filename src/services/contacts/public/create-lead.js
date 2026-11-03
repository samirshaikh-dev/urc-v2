import { leadsStore, setLeadsStore } from "../store.js";

export async function createLead(payload) {
  const newLead = {
    id: `lead-${Date.now()}`,
    name: payload.name.trim(),
    company: payload.company.trim(),
    email: payload.email.trim(),
    phone: payload.phone?.trim() || "",
    product: payload.product?.trim() || "General Inquiry / Other",
    message: payload.message.trim(),
    status: "new",
    notes: [],
    createdAt: new Date(),
  };

  setLeadsStore([newLead, ...leadsStore]);
  return newLead;
}

