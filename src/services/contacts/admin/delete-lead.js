import { getDbClient, isDatabaseConfigured } from "@/lib/db";
import { enquiries } from "@/db/schema";
import { eq } from "drizzle-orm";
import { leadsStore, setLeadsStore } from "../store.js";

export async function deleteLead(id) {
  const db = getDbClient();

  if (!db || !isDatabaseConfigured()) {
    const prevLen = leadsStore.length;
    setLeadsStore(leadsStore.filter((l) => l.id !== id));
    return leadsStore.length < prevLen;
  }

  try {
    const [deleted] = await db
      .delete(enquiries)
      .where(eq(enquiries.id, id))
      .returning();

    return Boolean(deleted);
  } catch (err) {
    console.error("[deleteLead] Database delete failed:", err);
    return false;
  }
}
