import React, { useState, useRef, useEffect } from "react";
import styles from "./chatbot.module.css";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showGreeting, setShowGreeting] = useState(true);
  const [greetingText, setGreetingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [prefilled, setPrefilled] = useState(false);
  const [rawSelectedText, setRawSelectedText] = useState(null);

  const fullGreeting = "Hi there! Ask me about our book";
  const msgEndRef = useRef(null);
  const widgetRef = useRef(null);
  const inputRef = useRef(null);

  const BACKEND_URL =
    typeof window !== "undefined" && window.__CHATBACKEND_URL
      ? window.__CHATBACKEND_URL
      : import.meta.env?.VITE_CHATBACKEND_URL ||
        import.meta.env?.DOCUSAURUS_CHATBACKEND_URL ||
        process.env?.REACT_APP_CHATBACKEND_URL ||
        "https://robotics-book-hackathon-backend.vercel.app";

  const toggleChat = () => {
    setOpen((prev) => !prev);

    if (!open && messages.length === 0) {
      setMessages([
        {
          role: "bot",
          content: "Hello! Welcome to our Book Chat Assistant",
        },
      ]);
    }
  };

  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!showGreeting || open) {
      if (open) setShowGreeting(false);
      return;
    }

    let index = 0;
    setGreetingText("");
    const interval = setInterval(() => {
      setGreetingText(fullGreeting.slice(0, index + 1));
      index++;
      if (index >= fullGreeting.length) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, [showGreeting, open]);

  useEffect(() => {
    const openHandler = (e) => {
      const selectedText = window.__selectedText || e?.detail;
      setOpen(true);
      if (selectedText && typeof selectedText === "string") {
        const cleanText = selectedText.trim().slice(0, 500); 
        setInput(`Explain this text: ${cleanText}`);
        setPrefilled(true);
        setRawSelectedText(cleanText);
        window.__selectedText = null;
      }
    };

    window.addEventListener("open-chatbot", openHandler);
    return () => window.removeEventListener("open-chatbot", openHandler);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
        if (prefilled && inputRef.current) {
          const len = inputRef.current.value.length;
          inputRef.current.setSelectionRange(len, len);
        }
      }, 100);
    }
  }, [open, prefilled]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        open &&
        widgetRef.current &&
        !widgetRef.current.contains(e.target) &&
        !e.target.closest(`.${styles.chatBubble}`)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const sendMessage = async () => {
    if (!input.trim() || isSending) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setPrefilled(false);
    setIsSending(true);
    setIsTyping(true);
    setRawSelectedText(null);

    try {
      const res = await fetch(`${BACKEND_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: userMessage,
          selected_text: rawSelectedText || undefined,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: data.answer || "No response received.",
          sources: data.sources || [],
        },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Sorry, I couldn't connect to the server right now. Please try again later.",
        },
      ]);
    } finally {
      setIsSending(false);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {showGreeting && !open && (
        <div className={styles.greetingText}>{greetingText}</div>
      )}

      {!open && (
        <div className={styles.chatBubble} onClick={toggleChat}>
          Chat
        </div>
      )}

      {open && (
        <div ref={widgetRef} className={styles.chatBox}>
          <div className={styles.header}>
            <span>Book Chat Assistant</span>
            <button onClick={toggleChat} aria-label="Close chat">
              ×
            </button>
          </div>

          <div className={styles.messages}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${styles.msg} ${msg.role === "user" ? styles.user : styles.bot}`}
              >
                <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\n/g, "<br>") }} />
                {msg.sources && msg.sources.length > 0 && (
                  <div className={styles.sources}>
                    <small>
                      Sources: {msg.sources.map((s) => `${s.source_file} (#${s.chunk_id})`).join(", ")}
                    </small>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className={`${styles.msg} ${styles.bot}`}>
                <span className={styles.typing}>
                  Typing<span className={styles.dot}>.</span>
                  <span className={styles.dot}>.</span>
                  <span className={styles.dot}>.</span>
                </span>
              </div>
            )}

            <div ref={msgEndRef} />
          </div>

          <div className={styles.inputArea}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              placeholder="Ask about the book..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSending}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isSending || isTyping}
            >
              {isSending ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}