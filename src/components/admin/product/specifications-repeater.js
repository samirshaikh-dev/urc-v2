"use client";

import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";

export function SpecificationsRepeater({ specifications = [], onChange }) {
  const addSpec = () => {
    onChange([...specifications, { property: "", value: "" }]);
  };

  const updateSpec = (index, field, value) => {
    const updated = [...specifications];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeSpec = (index) => {
    const updated = specifications.filter((_, idx) => idx !== index);
    onChange(updated);
  };

  const moveSpec = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= specifications.length) return;
    const updated = [...specifications];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {specifications.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#D9DCD1] bg-[#F7F8F2] p-5 text-center">
          <p className="text-xs text-[#687080] mb-2.5">
            No technical specifications added yet.
          </p>
          <button
            type="button"
            onClick={addSpec}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#D9DCD1] bg-white px-3.5 py-1.5 text-xs font-medium text-[#111111] hover:bg-[#F1F2EA] transition-colors cursor-pointer shadow-2xs"
          >
            <Plus className="size-3.5" />
            <span>Add Specification</span>
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-2.5">
            {specifications.map((spec, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 rounded-xl border border-[#D9DCD1] bg-[#F7F8F2] p-2.5"
              >
                {/* Index & Reorder Controls */}
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-[11px] font-mono text-[#687080] w-6 text-center">
                    #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => moveSpec(index, -1)}
                    disabled={index === 0}
                    className="size-7 rounded-lg border border-[#D9DCD1] bg-white flex items-center justify-center text-[#687080] hover:bg-[#F1F2EA] hover:text-[#111111] disabled:opacity-25 transition-colors cursor-pointer"
                    title="Move up"
                  >
                    <ArrowUp className="size-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveSpec(index, 1)}
                    disabled={index === specifications.length - 1}
                    className="size-7 rounded-lg border border-[#D9DCD1] bg-white flex items-center justify-center text-[#687080] hover:bg-[#F1F2EA] hover:text-[#111111] disabled:opacity-25 transition-colors cursor-pointer"
                    title="Move down"
                  >
                    <ArrowDown className="size-3" />
                  </button>
                </div>

                {/* Property / Key */}
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={spec.property}
                    onChange={(e) => updateSpec(index, "property", e.target.value)}
                    placeholder="Property (e.g. Tensile Strength)"
                    className="w-full h-[42px] rounded-xl border border-[#D9DCD1] bg-white px-3.5 text-xs sm:text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:border-[#650510] focus:ring-1 focus:ring-[#650510] focus:outline-none transition-colors"
                  />
                </div>

                {/* Value */}
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => updateSpec(index, "value", e.target.value)}
                    placeholder="Value (e.g. 1.8 MPa / ASTM F152)"
                    className="w-full h-[42px] rounded-xl border border-[#D9DCD1] bg-white px-3.5 text-xs sm:text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:border-[#650510] focus:ring-1 focus:ring-[#650510] focus:outline-none transition-colors"
                  />
                </div>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => removeSpec(index)}
                  className="size-8 rounded-lg border border-[#D9DCD1] bg-white text-[#687080] hover:border-red-200 hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-colors cursor-pointer shrink-0 self-end sm:self-auto"
                  title="Remove specification"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addSpec}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#D9DCD1] bg-white px-4 py-2 text-xs sm:text-sm font-medium text-[#111111] hover:bg-[#F1F2EA] shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="size-3.5" />
            <span>Add Specification</span>
          </button>
        </>
      )}
    </div>
  );
}
