import { FileText } from "lucide-react";

export function LegalSidebar({ tableOfContents = [] }) {
  return (
    <aside className="lg:sticky lg:top-24">
      {/* Table of Contents Card */}
      <div className="rounded-2xl border border-line bg-white p-5 shadow-xs sm:p-6">
        <div className="flex items-center gap-2 border-b border-line pb-3.5 text-ink">
          <FileText className="size-4 text-maroon" aria-hidden="true" />
          <h2 className="text-sm font-semibold tracking-tight uppercase">
            Table of Contents
          </h2>
        </div>

        <nav aria-label="Document Sections" className="mt-4">
          <ol className="space-y-2 text-xs sm:text-[13px]">
            {tableOfContents.map((item, index) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="group flex items-start gap-2.5 rounded-control py-1 px-1.5 text-muted transition-colors duration-150 hover:bg-field hover:text-maroon"
                >
                  <span className="font-mono text-[11px] font-semibold text-orange-ink shrink-0 mt-0.5">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-snug group-hover:text-ink font-medium">
                    {item.label.replace(/^\d+\.\s*/, "")}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </aside>
  );
}
