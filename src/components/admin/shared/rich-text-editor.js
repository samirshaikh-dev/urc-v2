"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Undo,
  Redo,
} from "lucide-react";

export function RichTextEditor({ value = "", onChange, placeholder = "Enter content..." }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[180px] w-full rounded-b-xl bg-white p-4 text-xs sm:text-sm text-[#111111] outline-none focus:ring-0 prose prose-sm max-w-none leading-relaxed",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return (
      <div className="min-h-[220px] rounded-xl border border-[#D9DCD1] bg-[#F1F2EA]/30 p-4 animate-pulse text-xs text-[#687080]">
        Loading editor...
      </div>
    );
  }

  const btnClass = (isActive) =>
    `flex size-8 items-center justify-center rounded-lg text-xs transition-colors cursor-pointer ${
      isActive
        ? "bg-[#111111] text-white font-medium"
        : "text-[#687080] hover:bg-white hover:text-[#111111]"
    }`;

  return (
    <div className="overflow-hidden rounded-xl border border-[#D9DCD1] bg-[#F1F2EA]/40 focus-within:border-[#111111] transition-all">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-[#D9DCD1] bg-[#F1F2EA] px-3 py-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btnClass(editor.isActive("bold"))}
          title="Bold"
        >
          <Bold className="size-3.5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btnClass(editor.isActive("italic"))}
          title="Italic"
        >
          <Italic className="size-3.5" />
        </button>

        <div className="h-4 w-px bg-[#D9DCD1] mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={btnClass(editor.isActive("heading", { level: 2 }))}
          title="Heading 2"
        >
          <Heading2 className="size-3.5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={btnClass(editor.isActive("heading", { level: 3 }))}
          title="Heading 3"
        >
          <Heading3 className="size-3.5" />
        </button>

        <div className="h-4 w-px bg-[#D9DCD1] mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btnClass(editor.isActive("bulletList"))}
          title="Bullet List"
        >
          <List className="size-3.5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={btnClass(editor.isActive("orderedList"))}
          title="Numbered List"
        >
          <ListOrdered className="size-3.5" />
        </button>

        <div className="h-4 w-px bg-[#D9DCD1] mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="flex size-8 items-center justify-center rounded-lg text-xs text-[#687080] hover:bg-white hover:text-[#111111] disabled:opacity-30 transition-colors cursor-pointer"
          title="Undo"
        >
          <Undo className="size-3.5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="flex size-8 items-center justify-center rounded-lg text-xs text-[#687080] hover:bg-white hover:text-[#111111] disabled:opacity-30 transition-colors cursor-pointer"
          title="Redo"
        >
          <Redo className="size-3.5" />
        </button>
      </div>

      {/* Editor Content Area */}
      <EditorContent editor={editor} />
    </div>
  );
}

