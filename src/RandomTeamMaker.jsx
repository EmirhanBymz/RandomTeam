import React, { useState } from "react";
import "./index.css";

const positions = ["Kaleci", "Defans", "Orta Saha", "Forvet"];

function App() {
  const [names, setNames] = useState("");
  const [teams, setTeams] = useState([]);
  const [matchResult, setMatchResult] = useState(null);
  const [teamNames, setTeamNames] = useState(["Takım 1", "Takım 2"]);

  const parsePlayers = () => {
    return names
      .split("\n")
      .map((line) => {
        const [name, skillStr, pos] = line.split(",").map((x) => x.trim());
        return {
          name,
          skill: skillStr ? Number(skillStr) : Math.floor(Math.random() * 10) + 1,
          position: positions.includes(pos) ? pos : positions[Math.floor(Math.random() * positions.length)],
        };
      })
      .filter((p) => p.name !== "");
  };

  const handleGenerate = () => {
    const allPlayers = parsePlayers();

    if (allPlayers.length < 14) {
      alert("İki takım için en az 7'şer oyuncu olmak üzere toplam en az 14 oyuncu girmelisiniz.");
      return;
    }

    // Pozisyonlara göre ayır
    const grouped = {
      Kaleci: [],
      Defans: [],
      "Orta Saha": [],
      Forvet: [],
    };

    allPlayers.forEach((p) => {
      if (grouped[p.position]) {
        grouped[p.position].push(p);
      }
    });

    if (grouped["Kaleci"].length < 2) {
      alert("Her takımda 1 kaleci olması için en az 2 kaleci girmelisiniz.");
      return;
    }

    // Takımlar
    const team1 = [];
    const team2 = [];

    // Öncelikle kalecileri kesin olarak dağıt
    team1.push(grouped["Kaleci"][0]);
    team2.push(grouped["Kaleci"][1]);

    // Kalan kaleciler varsa onları da sırayla dağıt
    for (let i = 2; i < grouped["Kaleci"].length; i++) {
      if (team1.length < team2.length) team1.push(grouped["Kaleci"][i]);
      else team2.push(grouped["Kaleci"][i]);
    }

    // Diğer pozisyon oyuncularını rastgele karıştır ve sırayla takımlara dağıt
    ["Defans", "Orta Saha", "Forvet"].forEach((pos) => {
      const players = grouped[pos].sort(() => Math.random() - 0.5);
      players.forEach((p) => {
        if (team1.length < team2.length) team1.push(p);
        else team2.push(p);
      });
    });

    // Eğer takımlardan biri 7 oyuncudan azsa, eksikliği tamamlamak için diğer pozisyonlardaki oyuncuları tekrar kontrol et
    const minSize = 7;
    const allPlayersCopy = [...allPlayers];

    // Burada zaten tüm oyuncular dağıtıldı ama yine de kontrol etmek için şöyle yapabiliriz:
    if (team1.length < minSize || team2.length < minSize) {
      alert("Oyuncu dağıtımında hata oluştu: Her takımda en az 7 oyuncu olmalı.");
      return;
    }

    setTeams([team1, team2]);
    setMatchResult(null);
  };

  const simulateMatch = () => {
    if (teams.length !== 2) return;

    const team1Skill = teams[0].reduce((sum, p) => sum + p.skill, 0);
    const team2Skill = teams[1].reduce((sum, p) => sum + p.skill, 0);

    const genGoals = (team, count) => {
      const goals = [];
      for (let i = 0; i < count; i++) {
        const scorer = team[Math.floor(Math.random() * team.length)];
        goals.push({
          minute: Math.floor(Math.random() * 90) + 1,
          scorer: scorer.name,
        });
      }
      return goals.sort((a, b) => a.minute - b.minute);
    };

    const goals1 = Math.floor(Math.random() * (team1Skill / 5 + 1));
    const goals2 = Math.floor(Math.random() * (team2Skill / 5 + 1));

    setMatchResult({
      score: [goals1, goals2],
      goalsTeam1: genGoals(teams[0], goals1),
      goalsTeam2: genGoals(teams[1], goals2),
    });
  };

  const resetAll = () => {
    setNames("");
    setTeams([]);
    setMatchResult(null);
    setTeamNames(["Takım 1", "Takım 2"]);
  };

  return (
    <div className="container">
      <h1>⚽ Takım Oluşturucu ve Maç Simülasyonu ⚽</h1>
      <textarea
        rows={6}
        placeholder='Her satıra: "Ad Soyad,Seviye(1-10),Pozisyon" yazın'
        value={names}
        onChange={(e) => setNames(e.target.value)}
      />
      <div className="team-inputs">
        <input
          value={teamNames[0]}
          onChange={(e) => setTeamNames([e.target.value, teamNames[1]])}
          placeholder="Takım 1"
        />
        <input
          value={teamNames[1]}
          onChange={(e) => setTeamNames([teamNames[0], e.target.value])}
          placeholder="Takım 2"
        />
      </div>
      <div className="buttons">
        <button className="generate" onClick={handleGenerate}>
          Takımları Oluştur
        </button>
        <button className="simulate" onClick={simulateMatch} disabled={teams.length !== 2}>
          Maçı Simüle Et
        </button>
        <button className="reset" onClick={resetAll}>
          Sıfırla
        </button>
      </div>
      {teams.length === 2 && (
        <div className="field-layout">
          <div className="team-side">
            <h2>{teamNames[0]}</h2>
            {positions.map((pos) => (
              <div key={pos}>
                <strong>{pos}</strong>
                <ul>
                  {teams[0].filter((p) => p.position === pos).map((p, i) => (
                    <li key={i}>
                      {p.name} ({p.skill})
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="match-center">
            <h2>
              {teamNames[0]} {matchResult?.score[0] ?? "-"} : {matchResult?.score[1] ?? "-"} {teamNames[1]}
            </h2>
            {matchResult && (
              <div className="goals-info">
                <div>
                  <h4>{teamNames[0]} Goller</h4>
                  <ul>
                    {matchResult.goalsTeam1.map((g, i) => (
                      <li key={i}>⚽ {g.minute}. dk - {g.scorer}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>{teamNames[1]} Goller</h4>
                  <ul>
                    {matchResult.goalsTeam2.map((g, i) => (
                      <li key={i}>⚽ {g.minute}. dk - {g.scorer}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          <div className="team-side">
            <h2>{teamNames[1]}</h2>
            {positions.map((pos) => (
              <div key={pos}>
                <strong>{pos}</strong>
                <ul>
                  {teams[1].filter((p) => p.position === pos).map((p, i) => (
                    <li key={i}>
                      {p.name} ({p.skill})
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
