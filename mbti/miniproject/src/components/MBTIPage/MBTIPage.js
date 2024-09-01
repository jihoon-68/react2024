import React, { useState } from "react";
import "./MBTIPage.css";
import Navbar from "../Navbar/Navbar";

const MBTIPage = ({ questions }) => {
  const [answers, setAnswers] = useState({ EI: 0, SN: 0, TF: 0, JP: 0 });
  const [selected, setSelected] = useState({});
  const [result, setResult] = useState(null);

  const handleAnswer = (questionIndex, type, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [type]: prevAnswers[type] + value,
    }));

    setSelected((prevSelected) => ({
      ...prevSelected,
      [questionIndex]: value,
    }));
  };

  const calculateResult = () => {
    const { EI, SN, TF, JP } = answers;
    const mbti = `${EI >= 0 ? "E" : "I"}${SN > 0 ? "S" : "N"}${
      TF > 0 ? "T" : "F"
    }${JP > 0 ? "J" : "P"}`;
    setResult(mbti);
  };

  const resetQuiz = () => {
    setAnswers({ EI: 0, SN: 0, TF: 0, JP: 0 });
    setSelected({});
    setResult(null);
  };

  return (
    <div className="mbti-page">
      <Navbar />
      <div className="mbti-content">
        <h1>MBTI 검사</h1>
        <div className="questions">
          {questions.map((question, index) => (
            <div key={index} className="question">
              <p>{question.text}</p>
              <button
                className={`answer-button ${
                  selected[index] === 2 ? "selected" : ""
                }`}
                onClick={() => handleAnswer(index, question.type, 2)}
              >
                매우 좋음
              </button>
              <button
                className={`answer-button ${
                  selected[index] === 1 ? "selected" : ""
                }`}
                onClick={() => handleAnswer(index, question.type, 1)}
              >
                좋음
              </button>
              <button
                className={`answer-button ${
                  selected[index] === -1 ? "selected" : ""
                }`}
                onClick={() => handleAnswer(index, question.type, -1)}
              >
                싫음
              </button>
              <button
                className={`answer-button ${
                  selected[index] === -2 ? "selected" : ""
                }`}
                onClick={() => handleAnswer(index, question.type, -2)}
              >
                매우싫음
              </button>
            </div>
          ))}
        </div>
        <button className="submit-btn" onClick={calculateResult}>
          결과 보기
        </button>
        {result && (
          <div className="result">
            <h2>당신의 MBTI 유형은:</h2>
            <p>{result}</p>
            <button className="reset-btn" onClick={resetQuiz}>
              다시 검사하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MBTIPage;
