import React from "react";
import "./TeamPage.css";
import Navbar from "../Navbar/Navbar";

const teamMembers = [
  {
    name: "배승환",
    role: "팀장",
    image: "/images/bae.jpg",
    position: "left",
    description:
      "리더십: 팀을 이끄는 핵심 역할을 하며, 프로젝트의 방향과 목표를 설정합니다.\n" +
      "기획: 프로젝트의 전반적인 기획과 전략을 수립합니다.\n" +
      "프론트 개발: 사용자 인터페이스를 개발하고 개선합니다.",
    keywords: ["리더십", "기획", "프론트 개발"],
  },
  {
    name: "박지훈",
    role: "팀원",
    image: "/images/ji.jpg",
    position: "right",
    description:
      "프론트 개발: 웹사이트의 사용자 인터페이스를 디자인하고 개발합니다.\n" +
      "백엔드 개발: 서버와 데이터베이스를 관리하고 개발합니다.",
    keywords: ["프론트 개발", "백엔드 개발"],
  },
  {
    name: "이창준",
    role: "팀원",
    image: "/images/chang.jpg",
    position: "left",
    description:
      "프론트 개발: 웹 애플리케이션의 사용자 인터페이스를 구축합니다.",
    keywords: ["프론트 개발"],
  },
  {
    name: "명현재",
    role: "팀원",
    image: "/images/hyun.jpg",
    position: "right",
    description: "백엔드 개발: 서버 측의 로직과 데이터베이스를 관리합니다.",
    keywords: ["백엔드 개발"],
  },
  {
    name: "송민규",
    role: "팀원",
    image: "/images/song.jpg",
    position: "left",
    description: "백엔드 개발: 데이터베이스 설계와 서버 로직을 개발합니다.",
    keywords: ["백엔드 개발"],
  },
];

function TeamPage() {
  return (
    <div className="team-page">
      <Navbar />
      <div className="team-header">
        <h1>TEAM BAESH</h1>
        <h2>팀 소개</h2>
        <p className="subtitle">우리는 가능성을 믿습니다.</p>
      </div>
      <div className="team-content">
        <div className="team-members">
          {teamMembers.map((member, index) => (
            <div key={index} className={`team-member ${member.position}`}>
              <img src={member.image} alt={member.name} />
              <div className="team-info">
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="description">
                  {member.description.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line.split(", ").map((part, j) => (
                        <React.Fragment key={j}>
                          {member.keywords.includes(part) ? (
                            <span className="keyword">{part}</span>
                          ) : (
                            part
                          )}
                          {j < line.split(", ").length - 1 ? ", " : ""}
                        </React.Fragment>
                      ))}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamPage;
