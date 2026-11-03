"use client";

import { useState } from "react";
import {
  X,
  Building,
  Mail,
  Phone,
  Calendar,
  Layers,
  Send,
  Plus,
  MessageSquare,
} from "lucide-react";
import { addLeadNoteAction } from "@/api/contacts/admin/update-lead";
import { toast } from "sonner";

export function LeadDetailModal({ lead, onClose, onUpdate }) {
  const [noteText, setNoteText] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [notes, setNotes] = useState(lead.notes || []);

  if (!lead) return null;

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    setIsAddingNote(true);
    try {
      const res = await addLeadNoteAction(lead.id, noteText);
      if (res.success && res.lead) {
        setNotes(res.lead.notes || []);
        setNoteText("");
        toast.success("Internal note added.");
        onUpdate?.(res.lead);
      } else {
        toast.error(res.error || "Failed to save note.");
      }
    } catch {
      toast.error("Failed to save note.");
    } finally {
      setIsAddingNote(false);
    }
  };

  const mailtoHref = `mailto:${lead.email}?subject=${encodeURIComponent(
    `Quotation Response — ${lead.product || "United Rubber Cork"}`
  )}&body=${encodeURIComponent(
    `Dear ${lead.name},\n\nThank you for reaching out to United Rubber Cork regarding your requirement for ${lead.product || "industrial cork solutions"}.\n\n`
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-[#D9DCD1] bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#D9DCD1] bg-[#F7F8F2] px-6 py-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#650510]">
                Enquiry Details
              </span>
              <span className="text-[#D9DCD1]">•</span>
              <span className="text-xs text-[#687080]">
                ID: {lead.id}
              </span>
            </div>
            <h2 className="text-lg font-bold text-[#111111] mt-0.5">
              {lead.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-8 rounded-lg border border-[#D9DCD1] bg-white hover:bg-[#F1F2EA] flex items-center justify-center text-[#687080] hover:text-[#111111] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quick Contact Actions Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-xl border border-[#D9DCD1] bg-[#F1F2EA]/40 p-3.5">
            <span className="text-xs font-semibold text-[#111111]">
              Direct Contact Actions:
            </span>

            <div className="flex items-center gap-2">
              <a
                href={mailtoHref}
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-[#650510] hover:bg-[#4f040c] text-white text-xs font-semibold shadow-2xs transition-colors"
              >
                <Send className="size-3" />
                <span>Reply by Email</span>
              </a>

              {lead.phone && (
                <a
                  href={`tel:${lead.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border border-[#D9DCD1] bg-white hover:bg-[#F1F2EA] text-xs font-semibold text-[#111111] shadow-2xs transition-colors"
                >
                  <Phone className="size-3 text-[#687080]" />
                  <span>Call Buyer</span>
                </a>
              )}
            </div>
          </div>

          {/* Buyer Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-[#687080] uppercase tracking-wider flex items-center gap-1">
                <Building className="size-3" />
                <span>Company / Enterprise</span>
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#111111]">
                {lead.company || "Not provided"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-[#687080] uppercase tracking-wider flex items-center gap-1">
                <Mail className="size-3" />
                <span>Business Email</span>
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#111111]">
                {lead.email}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-[#687080] uppercase tracking-wider flex items-center gap-1">
                <Phone className="size-3" />
                <span>Phone / WhatsApp</span>
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#111111]">
                {lead.phone || "Not provided"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-[#687080] uppercase tracking-wider flex items-center gap-1">
                <Calendar className="size-3" />
                <span>Submitted Date</span>
              </span>
              <p className="text-xs sm:text-sm font-semibold text-[#111111]">
                {new Date(lead.createdAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
          </div>

          {/* Requested Material / Product */}
          <div className="rounded-xl border border-[#D9DCD1] bg-[#FFFFFF] p-4 shadow-2xs space-y-1.5">
            <span className="text-[11px] font-semibold text-[#687080] uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="size-3.5 text-[#650510]" />
              <span>Requested Material / Solution</span>
            </span>
            <p className="text-sm font-bold text-[#111111]">
              {lead.product || "General Industrial Inquiry"}
            </p>
          </div>

          {/* Full Requirement Message */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-[#687080] uppercase tracking-wider">
              Buyer Technical Specifications &amp; Requirement Notes
            </span>
            <div className="rounded-xl border border-[#D9DCD1] bg-[#F7F8F2] p-4 text-xs sm:text-sm leading-relaxed text-[#111111] whitespace-pre-wrap">
              {lead.message}
            </div>
          </div>

          {/* Internal Follow-Up Notes */}
          <div className="space-y-3 pt-2">
            <span className="text-[11px] font-semibold text-[#687080] uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="size-3.5 text-[#650510]" />
              <span>Internal Team Notes &amp; Follow-Up History</span>
            </span>

            {/* Add note form */}
            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Log a call, quotation number, or follow-up note..."
                className="flex-1 h-9 rounded-lg border border-[#D9DCD1] bg-white px-3 text-xs text-[#111111] placeholder:text-[#687080] focus:border-[#650510] focus:outline-none"
              />
              <button
                type="submit"
                disabled={isAddingNote || !noteText.trim()}
                className="h-9 px-3.5 rounded-lg border border-[#D9DCD1] bg-white hover:bg-[#F1F2EA] text-xs font-semibold text-[#111111] flex items-center gap-1.5 transition-colors disabled:opacity-40 cursor-pointer shadow-2xs"
              >
                <Plus className="size-3.5" />
                <span>Add Note</span>
              </button>
            </form>

            {/* Existing notes */}
            {notes.length === 0 ? (
              <p className="text-xs text-[#687080] italic">No internal notes logged yet.</p>
            ) : (
              <div className="space-y-2">
                {notes.map((n, idx) => (
                  <div
                    key={n.id || idx}
                    className="rounded-lg border border-[#D9DCD1] bg-white p-3 text-xs space-y-1 shadow-2xs"
                  >
                    <div className="flex items-center justify-between text-[10px] text-[#687080]">
                      <span className="font-semibold text-[#111111]">{n.author || "Admin"}</span>
                      <span>{new Date(n.createdAt).toLocaleDateString("en-IN")}</span>
                    </div>
                    <p className="text-xs text-[#111111]">{n.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end border-t border-[#D9DCD1] bg-[#F7F8F2] px-6 py-3">
          <button
            type="button"
            onClick={onClose}
            className="h-9 px-4 rounded-lg border border-[#D9DCD1] bg-white hover:bg-[#F1F2EA] text-xs font-medium text-[#111111] transition-colors cursor-pointer shadow-2xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
