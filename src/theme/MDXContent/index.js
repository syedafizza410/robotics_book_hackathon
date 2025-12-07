// src/theme/MDXContent.js
import React from 'react';
import MDXContent from '@theme-original/MDXContent';
import Chatbot from '@site/src/components/chatbot';
import ReadChapterButton from '@site/src/components/readbutton'; 
import AskAISelectionBubble from "@site/src/components/askaibubble";

export default function MDXContentWrapper(props) {
  const openChatbotWithSelected = (selectedText) => {
    window.__selectedText = selectedText;

    window.dispatchEvent(new CustomEvent("open-chatbot"));
  };

  return (
    <>
      <AskAISelectionBubble onAsk={openChatbotWithSelected} />
      <div>
        <ReadChapterButton />
      </div>
      <MDXContent {...props} />

      <div style={{ 
        margin: '60px 0 40px', 
        padding: '20px', 
        borderTop: '2px solid #eee',
        borderRadius: '12px',
        backgroundColor: '#f9f9f9'
      }}>
        <Chatbot />
      </div>
    </>
  );
}