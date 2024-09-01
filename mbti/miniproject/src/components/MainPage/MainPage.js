import React, { useState, useEffect, useRef } from "react";
import "./MainPage.css";

function MainPage() {
  const [text, setText] = useState("");
  const typingTimeoutRef = useRef(null);
  const indexRef = useRef(0);
  const fullText = '"H ello_World!"';
  const typingSpeed = 200; // Time in milliseconds

  useEffect(() => {
    // Ensure the ref starts at 0 when fullText changes
    indexRef.current = 0;
    setText(""); // Clear the text when fullText changes

    const typing = () => {
      if (indexRef.current < fullText.length) {
        setText((prevText) => prevText + fullText.charAt(indexRef.current));
        indexRef.current++;
        typingTimeoutRef.current = setTimeout(typing, typingSpeed);
      }
    };

    typing();

    // Cleanup function to clear timeout if the component unmounts
    return () => {
      clearTimeout(typingTimeoutRef.current);
    };
  }, [fullText, typingSpeed]); // Empty dependency array means this effect runs only once

  return (
    <div className="main-page">
      <header className="main-header">
        <h1 className="typing">{text}</h1>
        <h2 className="subtitle">우리는 가능성을 믿습니다.</h2>
      </header>
    </div>
  );
}

export default MainPage;
