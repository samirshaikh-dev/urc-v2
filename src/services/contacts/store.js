export const LEAD_STATUSES = [
  { id: "all", name: "All Enquiries" },
  { id: "new", name: "New / Unread", color: "bg-blue-500", text: "text-blue-700" },
  { id: "review", name: "In Review", color: "bg-amber-500", text: "text-amber-700" },
  { id: "quoted", name: "Quotation Sent", color: "bg-purple-500", text: "text-purple-700" },
  { id: "converted", name: "PO Converted", color: "bg-[#00A85A]", text: "text-[#00A85A]" },
  { id: "archived", name: "Archived", color: "bg-gray-400", text: "text-gray-600" },
];

export let leadsStore = [];

export function setLeadsStore(newStore) {
  leadsStore = newStore;
}
