import { leadsStore, setLeadsStore } from "../store.js";

export async function deleteLead(id) {
  const prevLen = leadsStore.length;
  setLeadsStore(leadsStore.filter((l) => l.id !== id));
  return leadsStore.length < prevLen;
}

