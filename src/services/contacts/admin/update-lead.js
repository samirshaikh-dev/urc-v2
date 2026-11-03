import { leadsStore } from "../store.js";

export async function updateLeadStatus(id, newStatus) {
  const index = leadsStore.findIndex((l) => l.id === id);
  if (index === -1) return null;

  leadsStore[index] = {
    ...leadsStore[index],
    status: newStatus,
  };
  return leadsStore[index];
}

export async function addLeadNote(id, noteText, author = "Admin") {
  const index = leadsStore.findIndex((l) => l.id === id);
  if (index === -1) return null;

  const newNote = {
    id: `note-${Date.now()}`,
    author,
    text: noteText,
    createdAt: new Date(),
  };

  leadsStore[index] = {
    ...leadsStore[index],
    notes: [newNote, ...(leadsStore[index].notes || [])],
  };

  return leadsStore[index];
}

