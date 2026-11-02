"use client";

import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";

export function FaqRepeater({ faqs = [], onChange }) {
  const addFaq = () => {
    onChange([...faqs, { question: "", answer: "" }]);
  };

  const updateFaq = (index, field, value) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeFaq = (index) => {
    const updated = faqs.filter((_, idx) => idx !== index);
    onChange(updated);
  };

  const moveFaq = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= faqs.length) return;
    const updated = [...faqs];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {faqs.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[#D9DCD1] bg-[#F7F8F2]/60 p-6 text-center">
          <p className="text-xs text-[#687080]">No FAQs added yet.</p>
          <button
            type="button"
            onClick={addFaq}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#650510] hover:underline cursor-pointer"
          >
            <Plus className="size-3.5" />
            <span>Add first question</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg border border-[#D9DCD1] bg-[#FFFFFF] p-4 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-[#D9DCD1] pb-2.5">
                <span className="text-xs font-semibold text-[#111111] uppercase tracking-wider">
                  FAQ #{index + 1}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveFaq(index, -1)}
                    disabled={index === 0}
                    className="size-7 rounded border border-[#D9DCD1] flex items-center justify-center text-[#687080] hover:bg-[#F1F2EA] hover:text-[#111111] disabled:opacity-25 transition-colors"
                    title="Move up"
                  >
                    <ArrowUp className="size-3" />
                  </button>

                  <button
                    type="button"
                    onClick={() => moveFaq(index, 1)}
                    disabled={index === faqs.length - 1}
                    className="size-7 rounded border border-[#D9DCD1] flex items-center justify-center text-[#687080] hover:bg-[#F1F2EA] hover:text-[#111111] disabled:opacity-25 transition-colors"
                    title="Move down"
                  >
                    <ArrowDown className="size-3" />
                  </button>

                  <button
                    type="button"
                    onClick={() => removeFaq(index)}
                    className="size-7 rounded border border-[#D9DCD1] flex items-center justify-center text-[#687080] hover:border-red-200 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
                    title="Remove FAQ"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#687080] mb-1">
                  Question
                </label>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => updateFaq(index, "question", e.target.value)}
                  placeholder="e.g. What is the maximum operating temperature?"
                  className="w-full h-[46px] rounded-lg border border-[#D9DCD1] bg-[#FFFFFF] px-3.5 text-xs sm:text-sm text-[#111111] placeholder:text-[#687080]/60 focus:border-[#650510] focus:ring-1 focus:ring-[#650510] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#687080] mb-1">
                  Answer
                </label>
                <textarea
                  rows={2}
                  value={faq.answer}
                  onChange={(e) => updateFaq(index, "answer", e.target.value)}
                  placeholder="e.g. It withstands up to 125°C in continuous oil immersion without degradation."
                  className="w-full rounded-lg border border-[#D9DCD1] bg-[#FFFFFF] px-3.5 py-2.5 text-xs sm:text-sm text-[#111111] placeholder:text-[#687080]/60 focus:border-[#650510] focus:ring-1 focus:ring-[#650510] focus:outline-none transition-colors"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={addFaq}
        className="inline-flex items-center gap-1.5 h-[40px] px-3.5 rounded-lg border border-[#D9DCD1] bg-[#FFFFFF] hover:bg-[#F1F2EA] text-xs font-semibold text-[#111111] shadow-2xs transition-colors cursor-pointer"
      >
        <Plus className="size-3.5" />
        <span>Add FAQ</span>
      </button>
    </div>
  );
}
