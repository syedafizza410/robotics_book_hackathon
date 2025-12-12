import React, { useEffect, useState } from "react";

export default function AskAISelectionBubble() {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (!selection) return;

      const text = selection.toString().trim();
      if (text.length === 0) {
        setVisible(false);
        return;
      }

      try {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        setPos({
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY - 45,
        });

        setSelectedText(text);
        setVisible(true);
      } catch {
        setVisible(false);
      }
    };

    document.addEventListener("selectionchange", handleSelection);
    return () => document.removeEventListener("selectionchange", handleSelection);
  }, []);

  const handleClick = () => {
    if (!selectedText) return;

    window.__selectedText = selectedText;
    window.__promptText = `Explain this text: ${selectedText}`;
    window.dispatchEvent(new CustomEvent("open-chatbot"));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <button
      onClick={handleClick}
      style={{
        position: "absolute",
        top: pos.y,
        left: pos.x,
        background: "#6a00ff",
        color: "white",
        padding: "6px 12px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        zIndex: 9999,
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        transform: "translateX(-50%)",
      }}
    >
      Ask AI 💬
    </button>
  );
}
