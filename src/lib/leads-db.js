export const LEAD_STATUSES = [
  { id: "all", name: "All Enquiries" },
  { id: "new", name: "New / Unread", color: "bg-blue-500", text: "text-blue-700" },
  { id: "review", name: "In Review", color: "bg-amber-500", text: "text-amber-700" },
  { id: "quoted", name: "Quotation Sent", color: "bg-purple-500", text: "text-purple-700" },
  { id: "converted", name: "PO Converted", color: "bg-[#00A85A]", text: "text-[#00A85A]" },
  { id: "archived", name: "Archived", color: "bg-gray-400", text: "text-gray-600" },
];

export const INITIAL_LEADS = [
  {
    id: "lead-1",
    name: "Rajesh Sharma",
    company: "VoltPower Transformers Pvt Ltd",
    email: "rajesh.sharma@voltpower.in",
    phone: "+91 98201 44521",
    product: "Rubberised Cork Sheets (RC Sheets)",
    message: "We need 500 sheets of 6mm NBR-bound rubberised cork sheets conforming to IS:4253 Part II for our 33kV distribution transformers. Please send mill test certificate and bulk quotation for Vadodara plant.",
    status: "new",
    notes: [
      {
        id: "note-1",
        author: "Admin",
        text: "Sent technical datasheet via email. Waiting on confirmation of flange dimensional drawings.",
        createdAt: new Date("2026-10-28T11:00:00.000Z"),
      },
    ],
    createdAt: new Date("2026-10-27T09:30:00.000Z"),
  },
  {
    id: "lead-2",
    name: "Ananya Deshmukh",
    company: "Studio Metaphor Architects",
    email: "ananya@studiometaphor.com",
    phone: "+91 97654 32190",
    product: "Acoustic Cork Wall Tiles",
    message: "Specifying acoustic cork wall tiles (hexagonal pattern, 300mm x 300mm) for an auditorium project in Bangalore. Need acoustic test reports (NRC) and flame-spread certification.",
    status: "quoted",
    notes: [
      {
        id: "note-2",
        author: "Admin",
        text: "Sample kit and NRC test report dispatched via courier on Oct 24.",
        createdAt: new Date("2026-10-24T15:20:00.000Z"),
      },
    ],
    createdAt: new Date("2026-10-23T14:15:00.000Z"),
  },
  {
    id: "lead-3",
    name: "Vikramaditya Rao",
    company: "Southern Gaskets & Seals",
    email: "procurement@southerngaskets.co.in",
    phone: "+91 94440 88219",
    product: "Transformer Gaskets, Strips & Endless Rings",
    message: "Urgent requirement for 1,200 continuous dovetail endless rings (OD 450mm, ID 410mm, thickness 8mm) in oil-grade rubber cork. CAD drawing ready for fabrication.",
    status: "review",
    notes: [],
    createdAt: new Date("2026-10-20T16:45:00.000Z"),
  },
  {
    id: "lead-4",
    name: "Pooja Malhotra",
    company: "GreenTech Solutions India",
    email: "pooja.m@greentech.org",
    phone: "+91 99100 12345",
    product: "Eco-Friendly Lifestyle Cork Gifts",
    message: "Inquiring about 350 custom conference gift hampers for our upcoming annual climate summit in New Delhi. Each hamper to include A5 cork notebook, cork coaster set, and sleeve with laser-engraved company logo.",
    status: "converted",
    notes: [
      {
        id: "note-3",
        author: "Admin",
        text: "PO #GT-2026-89 received and advance payment cleared. Production batch scheduled.",
        createdAt: new Date("2026-10-18T10:30:00.000Z"),
      },
    ],
    createdAt: new Date("2026-10-15T10:00:00.000Z"),
  },
  {
    id: "lead-5",
    name: "Karthik Subramanian",
    company: "Apex Infra & Bridges Corp",
    email: "karthik.sub@apexinfra.com",
    phone: "+91 98840 55678",
    product: "Cork Expansion Joint Filler Boards",
    message: "Requirement for 2,000 running meters of 25mm non-extruding cork expansion joint filler board for flyover expansion joints complying with ASTM D1752 Type II.",
    status: "new",
    notes: [],
    createdAt: new Date("2026-10-12T11:10:00.000Z"),
  },
];

let leadsCache = [...INITIAL_LEADS];

export async function getAllLeads(status = "all") {
  let list = [...leadsCache];
  if (status && status !== "all") {
    list = list.filter((l) => l.status === status);
  }
  return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function getLeadById(id) {
  return leadsCache.find((l) => l.id === id) || null;
}

export async function updateLeadStatus(id, newStatus) {
  const index = leadsCache.findIndex((l) => l.id === id);
  if (index === -1) return null;
  leadsCache[index] = {
    ...leadsCache[index],
    status: newStatus,
  };
  return leadsCache[index];
}

export async function addLeadNote(id, noteText, author = "Admin") {
  const index = leadsCache.findIndex((l) => l.id === id);
  if (index === -1) return null;

  const newNote = {
    id: `note-${Date.now()}`,
    author,
    text: noteText,
    createdAt: new Date(),
  };

  leadsCache[index] = {
    ...leadsCache[index],
    notes: [newNote, ...(leadsCache[index].notes || [])],
  };

  return leadsCache[index];
}

export async function deleteLead(id) {
  const prevLen = leadsCache.length;
  leadsCache = leadsCache.filter((l) => l.id !== id);
  return leadsCache.length < prevLen;
}

