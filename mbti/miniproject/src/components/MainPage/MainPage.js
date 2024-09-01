import React, { useState, useEffect } from "react";
import "./MainPage.css";

function MainPage() {
  const [text, setText] = useState("");
  const fullText = "Hello World!";
  const typingSpeed = 150; // Time in milliseconds

  useEffect(() => {
    let i = 0;
    let typingTimeout;

    const typing = () => {
      if (i < fullText.length) {
        setText((prevText) => prevText + fullText.charAt(i));
        i++;
        typingTimeout = setTimeout(typing, typingSpeed);
      }
    };

    typing();

    // Cleanup function to clear timeout if the component unmounts
    return () => {
      clearTimeout(typingTimeout);
    };
  }, []); // Empty dependency array means this effect runs only once

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
