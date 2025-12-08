import React, { useEffect, useState } from "react";
import "./AskAISelectionBubble.css"; 

export default function AskAISelectionBubble() {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState("");

  useEffect(() => {
    const handleSelection = () => {
      const text = window.getSelection()?.toString().trim();
      if (text?.length > 0) {
        const rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
        setPos({
          x: Math.min(rect.left + window.scrollX, window.innerWidth - 150),
          y: rect.top + window.scrollY - 45,
        });
        setSelectedText(text);
        setVisible(true);
      } else {
        setVisible(false);
        setSelectedText("");
      }
    };

    document.addEventListener("mouseup", handleSelection);
    document.addEventListener("keyup", handleSelection);
    document.addEventListener("touchend", handleSelection); 

    return () => {
      document.removeEventListener("mouseup", handleSelection);
      document.removeEventListener("keyup", handleSelection);
      document.removeEventListener("touchend", handleSelection);
    };
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
      className="ask-ai-bubble" 
      style={{ top: pos.y, left: pos.x }}
      onClick={handleClick}
    >
      Ask AI 💬
    </button>
  );
}
