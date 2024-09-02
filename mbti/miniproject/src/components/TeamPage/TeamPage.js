import React, { useState } from "react";
import "./TeamPage.css";
import Navbar from "../Navbar/Navbar";

const logoUrl = "../../images/logo2.png";

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
    email: "baesh6778@gmail.com",
    blog: "https://baesh.tistory.com/"
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
    email: "20201168@kiu.kr",
    blog: "https://github.com/jihoon-68"
  },
  {
    name: "이창준",
    role: "팀원",
    image: "/images/chang.jpg",
    position: "left",
    description:
      "프론트 개발: 웹 애플리케이션의 사용자 인터페이스를 구축합니다.",
    keywords: ["프론트 개발"],
    email: "dlckdwns7196@naver.com",
    blog: "https://github.com/Leecj0402"
  },
  {
    name: "명현재",
    role: "팀원",
    image: "/images/hyun.jpg",
    position: "right",
    description: "백엔드 개발: 서버 측의 로직과 데이터베이스를 관리합니다.",
    keywords: ["백엔드 개발"],
    email: "endjoy0@naver.com",
    blog: "https://lightnow1205.tistory.com/"
    
  },
  {
    name: "송민규",
    role: "팀원",
    image: "/images/song.jpg",
    position: "left",
    description: "백엔드 개발: 데이터베이스 설계와 서버 로직을 개발합니다.",
    keywords: ["백엔드 개발"],
    email: "ji@example.com",
    blog: "https://example.com/ji"
  },
  // 다른 팀원 데이터 추가
];

function TeamPage() {
  const [activeMember, setActiveMember] = useState(null);

  const handleClick = (index) => {
    // 현재 클릭된 팀원이 이미 활성화된 상태라면 비활성화 (null 설정)
    if (activeMember === index) {
      setActiveMember(null);
    } else {
      // 새로운 팀원 클릭 시 해당 팀원을 활성화
      setActiveMember(index);
    }
  };

  return (
    <div className="team-page">

      <div className="team-header">
        <img src={logoUrl} alt="Logo" className="logo" />
        <h2>TEAM BAESH</h2>
        <p className="subtitle">"우리는 가능성을 믿습니다."</p>
      </div>
      <div className="team-content">
        <div className="team-members">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`team-member ${member.position} ${activeMember === index ? 'active' : ''}`}
              onClick={() => handleClick(index)}
            >
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
                {activeMember === index && (
                  <div className="additional-info">
                    <p>Email: <a href={`mailto:${member.email}`}>{member.email}</a></p>
                    <p>Blog: <a href={member.blog} target="_blank" rel="noopener noreferrer">{member.blog}</a></p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamPage;
