import React, { useState, useRef, useEffect } from "react";
import styles from "./chatbot.module.css";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showGreeting, setShowGreeting] = useState(true);
  const [greetingText, setGreetingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [prefilled, setPrefilled] = useState(false); 
  const [rawSelectedText, setRawSelectedText] = useState(null); 

  const fullGreeting = "👋 Hi there! Ask me about our book";
  const msgEndRef = useRef(null);
  const widgetRef = useRef(null);

  const toggleChat = () => {
    setOpen((prev) => !prev);
    if (!open && messages.length === 0) {
      setMessages([
        {
          role: "bot",
          content:
            "👋Hello! Welcome to our Book Chat Assistant🚀",
        },
      ]);
    }
    setShowGreeting(false);
  };

  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!showGreeting) return;
    let index = 0;
    const interval = setInterval(() => {
      setGreetingText(fullGreeting.slice(0, index + 1));
      index++;
      if (index === fullGreeting.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [showGreeting]);

  useEffect(() => {
    const openHandler = () => {
      setOpen(true);
      const selectedText = window.__selectedText;
      if (selectedText) {
        setInput(`Explain this text: ${selectedText}`);
        setPrefilled(true);
        setRawSelectedText(selectedText);
        window.__selectedText = null;
      }
    };

    window.addEventListener("open-chatbot", openHandler);
    return () => window.removeEventListener("open-chatbot", openHandler);
  }, []);

 const sendMessage = async () => {
  if (!input.trim()) return;

  const currentInput = input;
  setMessages((prev) => [...prev, { role: "user", content: currentInput }]);
  setInput("");
  setPrefilled(false);
  setIsTyping(true);

  try {
   const res = await fetch("https://robotics-book-hackathon-backend.vercel.app/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    query: currentInput,
    selected_text: rawSelectedText || currentInput,
  }),
});
    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "bot", content: data.answer, sources: data.sources },
    ]);

    setIsTyping(false);
    setRawSelectedText(null);
  } catch (err) {
    console.error(err);
    setMessages((prev) => [
      ...prev,
      { role: "bot", content: "❌ Error connecting to backend." },
    ]);
    setIsTyping(false);
  }
};

  return (
    <>
      {showGreeting && <div className={styles.greetingText}>{greetingText}</div>}

      {!open && (
        <div className={styles.chatBubble} onClick={toggleChat}>
          💬
        </div>
      )}

      {open && (
        <div ref={widgetRef} className={styles.chatBox}>
          <div className={styles.header}>
            <span>Chat Assistant</span>
            <button onClick={toggleChat}>×</button>
          </div>

          <div className={styles.messages}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${styles.msg} ${msg.role === "user" ? styles.user : styles.bot}`}
              >
                <div>{msg.content}</div>
                {msg.sources && (
                  <div className={styles.sources}>
                    <small>
                      Sources:{" "}
                      {msg.sources.map((s) => `${s.source_file} (Chunk: ${s.chunk_id})`).join(", ")}
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
              type="text"
              value={input}
              placeholder="Type your question..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} disabled={!input.trim()}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
