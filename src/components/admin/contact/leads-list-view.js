"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Inbox,
  Mail,
  Phone,
  Eye,
  Trash2,
  Building,
  Calendar,
} from "lucide-react";
import { deleteLeadAction } from "@/actions/admin-leads";
import { LeadDetailModal } from "./lead-detail-modal";
import { toast } from "sonner";

export function LeadsListView({ initialLeads = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [leads, setLeads] = useState(initialLeads);
  const [selectedLead, setSelectedLead] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Filter leads by search query
  const filteredLeads = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return leads;
    return leads.filter((lead) => {
      return (
        lead.name.toLowerCase().includes(q) ||
        lead.company?.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.phone?.toLowerCase().includes(q) ||
        lead.product?.toLowerCase().includes(q) ||
        lead.message?.toLowerCase().includes(q)
      );
    });
  }, [leads, searchQuery]);

  const handleDelete = async (leadId, buyerName) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the enquiry from "${buyerName}"?`
    );
    if (!confirmed) return;

    setDeletingId(leadId);
    try {
      const res = await deleteLeadAction(leadId);
      if (res.success) {
        setLeads((prev) => prev.filter((l) => l.id !== leadId));
        toast.success(`Enquiry from "${buyerName}" deleted.`);
      } else {
        toast.error(res.error || "Failed to delete enquiry.");
      }
    } catch {
      toast.error("Failed to delete enquiry.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
            Leads &amp; Quotation Enquiries
          </h1>
          <p className="mt-1 text-xs text-[#687080]">
            Review inbound material RFQs, specification requests, and corporate customer inquiries.
          </p>
        </div>
      </div>

      {/* Count & Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
        <div className="text-xs font-medium text-[#687080]">
          Total Inquiries:{" "}
          <span className="font-semibold text-[#111111]">{leads.length}</span>
        </div>

        {/* Live Search Field */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by buyer, company, product..."
            className="w-full rounded-lg border border-[#D9DCD1] bg-[#F1F2EA]/60 px-3 py-1.5 pl-8 text-xs text-[#111111] placeholder:text-[#687080] focus:border-[#111111] focus:bg-white focus:outline-none transition-colors"
          />
          <Search className="absolute left-2.5 top-2 size-3.5 text-[#687080]" />
        </div>
      </div>

      {/* Leads Table */}
      <div className="overflow-x-auto rounded-xl border border-[#D9DCD1] bg-[#F7F8F2] shadow-2xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#D9DCD1] text-[11px] font-semibold text-[#687080] uppercase tracking-wider bg-[#F1F2EA]/40">
              <th scope="col" className="py-3 px-4 sm:px-6">
                Buyer &amp; Company
              </th>
              <th scope="col" className="py-3 px-4 hidden md:table-cell">
                Requested Solution
              </th>
              <th scope="col" className="py-3 px-4 hidden lg:table-cell">
                Contact Details
              </th>
              <th scope="col" className="py-3 px-4 hidden sm:table-cell">
                Date
              </th>
              <th scope="col" className="py-3 px-4 sm:px-6 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D9DCD1]">
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Inbox className="size-10 text-[#687080]/40" />
                    <p className="mt-3 text-sm font-semibold text-[#111111]">
                      No enquiries found
                    </p>
                    <p className="mt-1 text-xs text-[#687080] max-w-sm">
                      {searchQuery
                        ? `No inquiries match "${searchQuery}".`
                        : "No quotation enquiries exist yet."}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => {
                const isDeleting = deletingId === lead.id;
                const mailtoHref = `mailto:${lead.email}?subject=${encodeURIComponent(
                  `Quotation Response — ${lead.product || "United Rubber Cork"}`
                )}`;

                return (
                  <tr
                    key={lead.id}
                    className="group hover:bg-[#F1F2EA]/60 transition-colors duration-100"
                  >
                    {/* Buyer & Company */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="space-y-0.5">
                        <button
                          type="button"
                          onClick={() => setSelectedLead(lead)}
                          className="text-left font-semibold text-xs sm:text-sm text-[#111111] hover:text-[#650510] hover:underline cursor-pointer block truncate max-w-xs sm:max-w-sm"
                        >
                          {lead.name}
                        </button>
                        <span className="flex items-center gap-1 text-[11px] text-[#687080] truncate max-w-xs">
                          <Building className="size-3 shrink-0" />
                          <span>{lead.company || "Direct Individual"}</span>
                        </span>
                      </div>
                    </td>

                    {/* Requested Solution */}
                    <td className="py-3.5 px-4 text-xs text-[#111111] hidden md:table-cell">
                      <span className="font-medium block truncate max-w-[220px]" title={lead.product}>
                        {lead.product || "Industrial Inquiry"}
                      </span>
                      <span className="text-[11px] text-[#687080] block truncate max-w-[220px]">
                        {lead.message?.slice(0, 50)}...
                      </span>
                    </td>

                    {/* Contact Details */}
                    <td className="py-3.5 px-4 text-xs text-[#687080] hidden lg:table-cell">
                      <div className="space-y-0.5">
                        <span className="block text-[11px] text-[#111111] font-mono truncate max-w-[180px]">
                          {lead.email}
                        </span>
                        {lead.phone && (
                          <span className="block text-[11px] text-[#687080] font-mono">
                            {lead.phone}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Submitted Date */}
                    <td className="py-3.5 px-4 text-xs text-[#687080] whitespace-nowrap hidden sm:table-cell">
                      {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-1.5">
                        {/* View Details Modal Button */}
                        <button
                          type="button"
                          onClick={() => setSelectedLead(lead)}
                          className="size-7 sm:size-8 rounded-lg border border-[#D9DCD1] bg-white hover:bg-[#F1F2EA] flex items-center justify-center text-[#111111] transition-colors shadow-2xs cursor-pointer"
                          title="View Full Enquiry"
                        >
                          <Eye className="size-3.5" />
                        </button>

                        {/* Reply Email */}
                        <a
                          href={mailtoHref}
                          className="size-7 sm:size-8 rounded-lg border border-[#D9DCD1] bg-white hover:bg-[#F1F2EA] flex items-center justify-center text-[#687080] hover:text-[#650510] transition-colors shadow-2xs"
                          title="Send Email Reply"
                        >
                          <Mail className="size-3.5" />
                        </a>

                        {/* Call */}
                        {lead.phone && (
                          <a
                            href={`tel:${lead.phone.replace(/\s+/g, "")}`}
                            className="size-7 sm:size-8 rounded-lg border border-[#D9DCD1] bg-white hover:bg-[#F1F2EA] flex items-center justify-center text-[#687080] hover:text-[#111111] transition-colors shadow-2xs"
                            title="Call Phone"
                          >
                            <Phone className="size-3.5" />
                          </a>
                        )}

                        {/* Delete */}
                        <button
                          type="button"
                          disabled={isDeleting}
                          onClick={() => handleDelete(lead.id, lead.name)}
                          className="size-7 sm:size-8 rounded-lg border border-[#D9DCD1] bg-white hover:border-red-200 hover:bg-red-50 hover:text-red-700 flex items-center justify-center text-[#687080] transition-colors shadow-2xs disabled:opacity-50 cursor-pointer"
                          title="Delete enquiry"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Selected Lead Modal */}
      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdate={(updatedLead) => {
            setLeads((prev) =>
              prev.map((l) => (l.id === updatedLead.id ? updatedLead : l))
            );
            setSelectedLead(updatedLead);
          }}
        />
      )}
    </div>
  );
}
