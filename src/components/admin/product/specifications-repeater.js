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
    <div className="space-y-4">
      {specifications.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[#D9DCD1] bg-[#F7F8F2]/60 p-6 text-center">
          <p className="text-xs text-[#687080]">
            No technical specifications added yet.
          </p>
          <button
            type="button"
            onClick={addSpec}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#650510] hover:underline cursor-pointer"
          >
            <Plus className="size-3.5" />
            <span>Add first technical specification</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {specifications.map((spec, index) => (
            <div
              key={index}
              className="group flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 rounded-lg border border-[#D9DCD1] bg-[#FFFFFF] p-3 shadow-2xs"
            >
              {/* Index & Reorder Controls */}
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-[11px] font-mono text-[#687080] w-5 text-center">
                  #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => moveSpec(index, -1)}
                  disabled={index === 0}
                  className="size-7 rounded border border-[#D9DCD1] flex items-center justify-center text-[#687080] hover:bg-[#F1F2EA] hover:text-[#111111] disabled:opacity-25 transition-colors"
                  title="Move up"
                >
                  <ArrowUp className="size-3" />
                </button>
                <button
                  type="button"
                  onClick={() => moveSpec(index, 1)}
                  disabled={index === specifications.length - 1}
                  className="size-7 rounded border border-[#D9DCD1] flex items-center justify-center text-[#687080] hover:bg-[#F1F2EA] hover:text-[#111111] disabled:opacity-25 transition-colors"
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
                  className="w-full h-[46px] rounded-lg border border-[#D9DCD1] bg-[#FFFFFF] px-3.5 text-xs sm:text-sm text-[#111111] placeholder:text-[#687080]/60 focus:border-[#650510] focus:ring-1 focus:ring-[#650510] focus:outline-none transition-colors"
                />
              </div>

              {/* Value */}
              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  value={spec.value}
                  onChange={(e) => updateSpec(index, "value", e.target.value)}
                  placeholder="Value (e.g. 1.8 MPa / ASTM F152)"
                  className="w-full h-[46px] rounded-lg border border-[#D9DCD1] bg-[#FFFFFF] px-3.5 text-xs sm:text-sm text-[#111111] placeholder:text-[#687080]/60 focus:border-[#650510] focus:ring-1 focus:ring-[#650510] focus:outline-none transition-colors"
                />
              </div>

              {/* Delete */}
              <button
                type="button"
                onClick={() => removeSpec(index)}
                className="size-8 rounded-lg border border-[#D9DCD1] text-[#687080] hover:border-red-200 hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-colors cursor-pointer shrink-0 self-end sm:self-auto"
                title="Remove specification"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={addSpec}
        className="inline-flex items-center gap-1.5 h-[40px] px-3.5 rounded-lg border border-[#D9DCD1] bg-[#FFFFFF] hover:bg-[#F1F2EA] text-xs font-semibold text-[#111111] shadow-2xs transition-colors cursor-pointer"
      >
        <Plus className="size-3.5" />
        <span>Add Specification</span>
      </button>
    </div>
  );
}

