"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Undo,
  Redo,
  Minus,
  Quote,
  Code,
  List,
  ListOrdered,
} from "lucide-react";

export function RichTextEditor({
  value = "",
  onChange,
  placeholder = "Enter product description...",
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[220px] w-full rounded-b-xl bg-[#F7F8F2] p-4 text-xs sm:text-sm text-[#111111] outline-none focus:ring-0 prose prose-sm max-w-none leading-relaxed",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return (
      <div className="min-h-[260px] rounded-xl border border-[#D9DCD1] bg-[#F7F8F2] p-4 animate-pulse text-xs text-[#687080]">
        Loading editor...
      </div>
    );
  }

  const btnClass = (isActive) =>
    `size-7 sm:size-8 rounded-md border text-xs font-semibold flex items-center justify-center transition-colors cursor-pointer select-none ${
      isActive
        ? "border-[#111111] bg-[#111111] text-white"
        : "border-[#D9DCD1] bg-white text-[#4B5563] hover:bg-[#F1F2EA] hover:text-[#111111]"
    }`;

  return (
    <div className="overflow-hidden rounded-xl border border-[#D9DCD1] bg-[#F7F8F2] focus-within:border-[#650510] focus-within:ring-1 focus-within:ring-[#650510] transition-all">
      {/* Editor Toolbar (matching the reference screenshot) */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-[#D9DCD1] bg-[#F7F8F2] px-3 py-2.5">
        {/* Bold */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btnClass(editor.isActive("bold"))}
          title="Bold (Ctrl+B)"
        >
          <span className="font-bold">B</span>
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btnClass(editor.isActive("italic"))}
          title="Italic (Ctrl+I)"
        >
          <span className="italic font-serif">I</span>
        </button>

        {/* Strike */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={btnClass(editor.isActive("strike"))}
          title="Strikethrough"
        >
          <span className="line-through">S</span>
        </button>

        <div className="h-4 w-px bg-[#D9DCD1] mx-0.5" />

        {/* H1 */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={btnClass(editor.isActive("heading", { level: 1 }))}
          title="Heading 1"
        >
          <span className="text-[11px] font-bold">H1</span>
        </button>

        {/* H2 */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={btnClass(editor.isActive("heading", { level: 2 }))}
          title="Heading 2"
        >
          <span className="text-[11px] font-bold">H2</span>
        </button>

        <div className="h-4 w-px bg-[#D9DCD1] mx-0.5" />

        {/* Bullet List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btnClass(editor.isActive("bulletList"))}
          title="Bullet List"
        >
          <List className="size-3.5" />
        </button>

        {/* Ordered List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={btnClass(editor.isActive("orderedList"))}
          title="Numbered List"
        >
          <ListOrdered className="size-3.5" />
        </button>

        {/* Blockquote */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={btnClass(editor.isActive("blockquote"))}
          title="Blockquote"
        >
          <Quote className="size-3" />
        </button>

        {/* Code block */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={btnClass(editor.isActive("code"))}
          title="Code"
        >
          <Code className="size-3.5" />
        </button>

        {/* Horizontal Rule */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={btnClass(false)}
          title="Horizontal Rule"
        >
          <Minus className="size-3.5" />
        </button>

        <div className="h-4 w-px bg-[#D9DCD1] mx-0.5" />

        {/* Undo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="size-7 sm:size-8 rounded-md border border-[#D9DCD1] bg-white text-[#4B5563] hover:bg-[#F1F2EA] hover:text-[#111111] flex items-center justify-center text-xs transition-colors disabled:opacity-30 cursor-pointer"
          title="Undo"
        >
          <Undo className="size-3" />
        </button>

        {/* Redo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="size-7 sm:size-8 rounded-md border border-[#D9DCD1] bg-white text-[#4B5563] hover:bg-[#F1F2EA] hover:text-[#111111] flex items-center justify-center text-xs transition-colors disabled:opacity-30 cursor-pointer"
          title="Redo"
        >
          <Redo className="size-3" />
        </button>
      </div>

      {/* Editor Content Area */}
      <EditorContent editor={editor} />
    </div>
  );
}
