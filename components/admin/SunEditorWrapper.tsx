"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

// Dynamically import SunEditor to avoid SSR issues
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse flex items-center justify-center">
      <span className="text-gray-500 dark:text-gray-400">Loading editor...</span>
    </div>
  ),
});

interface SunEditorWrapperProps {
  value?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  disabled?: boolean;
}

const buttonList = [
  ["undo", "redo"],
  ["font", "fontSize", "formatBlock"],
  ["bold", "underline", "italic", "strike", "subscript", "superscript"],
  ["fontColor", "hiliteColor"],
  ["removeFormat"],
  "/",
  ["outdent", "indent"],
  ["align", "horizontalRule", "list", "lineHeight"],
  ["table", "link", "image", "video"],
  ["fullScreen", "showBlocks", "codeView"],
  ["preview", "print"],
];

export default function SunEditorWrapper({
  value = "",
  onChange,
  placeholder = "Start writing...",
  height = "400px",
  minHeight = "200px",
  maxHeight = "600px",
  disabled = false,
}: SunEditorWrapperProps) {
  const [mounted, setMounted] = useState(false);
  const editorRef = useRef<typeof SunEditor | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (content: string) => {
    if (onChange) {
      onChange(content);
    }
  };

  if (!mounted) {
    return (
      <div className="w-full h-64 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse flex items-center justify-center">
        <span className="text-gray-500 dark:text-gray-400">Loading editor...</span>
      </div>
    );
  }

  return (
    <div className="sun-editor-wrapper">
      <SunEditor
        setContents={value}
        onChange={handleChange}
        placeholder={placeholder}
        disable={disabled}
        setOptions={{
          height,
          minHeight,
          maxHeight,
          buttonList,
          defaultStyle: "font-family: inherit; font-size: 16px;",
          resizingBar: true,
          showPathLabel: false,
          charCounter: true,
          charCounterLabel: "Characters: ",
          imageUploadSizeLimit: 5 * 1024 * 1024, // 5MB
          videoFileInput: false,
          tabDisable: false,
          attributesWhitelist: {
            all: "style|class",
            table: "cellpadding|cellspacing|border|width|height",
            img: "alt|title|loading",
            a: "target|rel",
          },
        }}
      />
      <style jsx global>{`
        .sun-editor-wrapper .sun-editor {
          border-radius: 0.5rem;
          border-color: rgb(229 231 235);
        }
        .dark .sun-editor-wrapper .sun-editor {
          border-color: rgb(55 65 81);
        }
        .sun-editor-wrapper .sun-editor .se-toolbar {
          border-radius: 0.5rem 0.5rem 0 0;
          background-color: rgb(249 250 251);
        }
        .dark .sun-editor-wrapper .sun-editor .se-toolbar {
          background-color: rgb(31 41 55);
        }
        .sun-editor-wrapper .sun-editor .se-wrapper {
          border-radius: 0 0 0.5rem 0.5rem;
        }
        .sun-editor-wrapper .sun-editor .se-resizing-bar {
          border-radius: 0 0 0.5rem 0.5rem;
        }
        .dark .sun-editor-wrapper .sun-editor .se-wrapper-inner {
          background-color: rgb(17 24 39);
          color: rgb(229 231 235);
        }
        .dark .sun-editor-wrapper .sun-editor .se-toolbar button {
          color: rgb(209 213 219);
        }
        .dark .sun-editor-wrapper .sun-editor .se-toolbar button:hover {
          background-color: rgb(55 65 81);
        }
        .dark .sun-editor-wrapper .sun-editor .se-btn-module-border {
          border-color: rgb(55 65 81);
        }
        .dark .sun-editor-wrapper .sun-editor .se-resizing-bar {
          background-color: rgb(31 41 55);
          border-color: rgb(55 65 81);
        }
      `}</style>
    </div>
  );
}
