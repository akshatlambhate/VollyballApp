import React, { useState } from 'react';
import PlayersArrary from '../Players.json';

const TeamBuilder = ({ players }) => {
  const [noTeam, setNoTeam] = useState(0);
  const [teams, setTeams] = useState([]);

  function shuffleArray(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function divideIntoTeams(players, numberOfTeams) {
    const sortedPlayers = [...players].sort((a, b) => b.skill - a.skill);

    const teams = Array.from({ length: numberOfTeams }, () => []);
    const teamSkills = Array(numberOfTeams).fill(0);

    sortedPlayers.forEach(player => {
      const minSkillIndex = teamSkills.indexOf(Math.min(...teamSkills));
      teams[minSkillIndex].push(player);
      teamSkills[minSkillIndex] += player.skill;
    });

    return teams.map(team => shuffleArray(team));
  }

  const handleSubmit = () => {
    const number = parseInt(noTeam);
    if (!number || number <= 0) {
      alert("Please enter a valid number of teams");
      return;
    }
    const result = divideIntoTeams(players, number);
    setTeams(result);
  };

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '100%',
        margin: 'auto',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
      }}
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <input
          type="number"
          value={noTeam}
          onChange={(e) => setNoTeam(e.target.value)}
          placeholder="Number of Teams"
          style={inputStyle}
        />
        <button type="button" onClick={handleSubmit} style={buttonStyle}>
          Submit
        </button>
      </form>

      <div>
        <h2 style={{ textAlign: 'center' }}>Teams</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {teams.map((team, index) => (
            <div key={index} style={teamCardStyle}>
              <h3 style={{ marginBottom: '10px' }}>Team {index + 1}</h3>
              {team.map((player, i) => (
                <div key={i} style={playerStyle}>
                  {player.name}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamBuilder;

const inputStyle = {
  width: '100%',
  maxWidth: '300px',
  padding: '10px',
  fontSize: '16px',
  borderRadius: '8px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#4CAF50',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  cursor: 'pointer',
};

const teamCardStyle = {
  padding: '16px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
};

const playerStyle = {
  padding: '6px 0',
  borderBottom: '1px solid #eee',
  fontSize: '16px',
};
