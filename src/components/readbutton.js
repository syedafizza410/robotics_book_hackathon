import { useState, useRef, useEffect } from "react";

export default function ReadChapterButton() {
  const [isReading, setIsReading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);

  const getChapterText = () => {
    const article = document.querySelector("article") || 
                    document.querySelector(".markdown") || 
                    document.querySelector("main");
    if (!article) return "No content found.";

    let text = article.innerText;
    text = text
      .replace(/Copy/g, "")
      .replace(/```[\s\S]*?```/g, "")
      .replace(/^\d+\./gm, "")
      .replace(/Previous|Next|Edit|Share/g, "")
      .trim();

    return text.length > 100 ? text : "Nothing to read.";
  };

  const startReading = async () => {
    if (isReading || isLoading) return;
    const text = getChapterText();
    if (!text || text.length < 50) {
      alert("Koi content nahi mila padhne ke liye!");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("https://robotics-book-hackathon-tts.vercel.app/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("Server error");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }

      const audio = new Audio(url);
      audioRef.current = audio;
      audio.play();
      setIsReading(true);
      setIsLoading(false);

      audio.onended = () => {
        setIsReading(false);
        URL.revokeObjectURL(url);
      };

    } catch (err) {
      alert("Backend nahi chal raha ya error aaya");
      setIsLoading(false);
    }
  };

  const stopReading = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    setIsReading(false);
    setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "25px 0" }}>
      {!isReading ? (
        <button
          onClick={startReading}
          disabled={isLoading}
          style={{
            padding: "14px 30px",
            fontSize: "16px",
            fontWeight: "bold",
            background: isLoading ? "#999" : "#6a1b9a",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Preparing..." : "Read This Chapter"}
        </button>
      ) : (
        <button 
          onClick={stopReading} 
          style={{
            padding: "14px 30px",
            fontSize: "16px",
            fontWeight: "bold",
            background: "#c62828",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
          }}
        >
          Stop Reading
        </button>
      )}
    </div>
  );
}