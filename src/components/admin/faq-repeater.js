"use client";

import { Plus, Trash2, ArrowUp, ArrowDown, HelpCircle } from "lucide-react";

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
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-semibold text-[#111111] flex items-center gap-1.5">
            <HelpCircle className="size-4 text-[#111111]" />
            <span>5. Product FAQs</span>
          </label>
          <p className="text-xs text-[#687080] mt-0.5">
            Add frequent technical questions and answers. These appear in an accordion on the product detail page.
          </p>
        </div>

        <button
          type="button"
          onClick={addFaq}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#D9DCD1] bg-[#F1F2EA] px-3 py-1.5 text-xs font-semibold text-[#111111] hover:bg-[#E9EAE1] transition-colors cursor-pointer"
        >
          <Plus className="size-3.5" />
          <span>Add FAQ</span>
        </button>
      </div>

      {faqs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#D9DCD1] bg-[#F1F2EA]/30 p-6 text-center">
          <p className="text-xs text-[#687080]">No FAQs added yet.</p>
          <button
            type="button"
            onClick={addFaq}
            className="mt-2 text-xs font-semibold text-[#111111] hover:underline cursor-pointer"
          >
            + Add your first question
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl border border-[#D9DCD1] bg-white p-4 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-[#D9DCD1]/60 pb-2.5">
                <span className="text-xs font-semibold text-[#111111] uppercase tracking-wider">
                  FAQ #{index + 1}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveFaq(index, -1)}
                    disabled={index === 0}
                    className="flex size-7 items-center justify-center rounded-lg border border-[#D9DCD1] text-[#687080] hover:bg-[#F1F2EA] hover:text-[#111111] disabled:opacity-30 transition-colors"
                    title="Move up"
                  >
                    <ArrowUp className="size-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => moveFaq(index, 1)}
                    disabled={index === faqs.length - 1}
                    className="flex size-7 items-center justify-center rounded-lg border border-[#D9DCD1] text-[#687080] hover:bg-[#F1F2EA] hover:text-[#111111] disabled:opacity-30 transition-colors"
                    title="Move down"
                  >
                    <ArrowDown className="size-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => removeFaq(index)}
                    className="flex size-7 items-center justify-center rounded-lg border border-[#D9DCD1] text-[#687080] hover:border-red-200 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
                    title="Remove FAQ"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => updateFaq(index, "question", e.target.value)}
                  placeholder="e.g. What is the maximum operating temperature?"
                  className="w-full rounded-lg border border-[#D9DCD1] bg-[#F1F2EA]/40 px-3.5 py-2 text-xs sm:text-sm text-[#111111] placeholder:text-[#687080] focus:border-[#111111] focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <textarea
                  rows={2}
                  value={faq.answer}
                  onChange={(e) => updateFaq(index, "answer", e.target.value)}
                  placeholder="e.g. It withstands up to 125°C in continuous oil immersion without degradation."
                  className="w-full rounded-lg border border-[#D9DCD1] bg-[#F1F2EA]/40 px-3.5 py-2 text-xs sm:text-sm text-[#111111] placeholder:text-[#687080] focus:border-[#111111] focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
