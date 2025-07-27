import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const EditorComponent = ({ value, onChange, readOnly = false }) => {
  const containerRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || quillRef.current) return;

    // ✅ Create container dynamically (Quill requires a DOM node)
    const editorContainer = document.createElement("div");
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(editorContainer);

    const modulesConfig = {
      history: {
        delay: 1000,
        maxStack: 500,
        userOnly: false,
      },
    };

    // ✅ Show toolbar ONLY if not readOnly
    if (!readOnly) {
      modulesConfig.toolbar = [
        [{ header: [1, 2, 3, 4, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image", "video"],
        ["code-block", "blockquote"],
        [{ align: [] }],
        ["clean"],
      ];
    }

    const quill = new Quill(editorContainer, {
      theme: "snow",
      modules: modulesConfig,
      readOnly,
    });

    quillRef.current = quill;

    // ✅ Set initial content if provided
    if (value) {
      quill.setContents(value);
    }

    // ✅ Sync changes back to parent (only if NOT readOnly)
    if (!readOnly && onChange) {
      quill.on("text-change", () => {
        const delta = quill.getContents(); // Full Delta
        onChange(delta);
      });
    }

    return () => {
      quillRef.current = null; // cleanup
    };
  }, []);

  // ✅ If readOnly state changes, toggle enable/disable
  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.enable(!readOnly);
      // Hide toolbar dynamically if readOnly true
      const toolbarEl = containerRef.current.querySelector(".ql-toolbar");
      if (toolbarEl) toolbarEl.style.display = readOnly ? "none" : "block";
    }
  }, [readOnly]);

  // ✅ Update content externally (if parent changes `value`)
  useEffect(() => {
    if (quillRef.current && value) {
      const current = quillRef.current.getContents();
      if (JSON.stringify(current.ops) !== JSON.stringify(value.ops)) {
        quillRef.current.setContents(value);
      }
    }
  }, [value]);

  return <div className="bg-gray-100 border-t-1 border-gray-300" ref={containerRef} />;
};

export default EditorComponent;
