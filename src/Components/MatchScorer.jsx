import React, { useState } from 'react';

const MatchScorer = () => {
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');
  const [targetScore, setTargetScore] = useState(25);

  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [winner, setWinner] = useState(null);
  const [isMatchStarted, setIsMatchStarted] = useState(false);

  const handleStartMatch = () => {
    if (!team1Name || !team2Name || targetScore <= 0) {
      alert('Please enter both team names and a valid target score');
      return;
    }
    setIsMatchStarted(true);
  };

  const handleScoreChange = (team, amount) => {
    if (winner) return;

    if (team === 'team1') {
      const newScore = Math.max(0, team1Score + amount);
      setTeam1Score(newScore);
      if (newScore >= targetScore) setWinner(team1Name);
    } else {
      const newScore = Math.max(0, team2Score + amount);
      setTeam2Score(newScore);
      if (newScore >= targetScore) setWinner(team2Name);
    }
  };

  const resetMatch = () => {
    setTeam1Score(0);
    setTeam2Score(0);
    setWinner(null);
    setTeam1Name('');
    setTeam2Name('');
    setTargetScore(25);
    setIsMatchStarted(false);
  };

  return (
    <div
      style={{
        padding: '16px',
        borderRadius: '12px',
        maxWidth: '100%',
        margin: 'auto',
        backgroundColor: '#f7f7f7',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Match Scorer</h2>

      {!isMatchStarted ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="text"
            placeholder="Team 1 Name"
            value={team1Name}
            onChange={(e) => setTeam1Name(e.target.value)}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Team 2 Name"
            value={team2Name}
            onChange={(e) => setTeam2Name(e.target.value)}
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Target Score"
            value={targetScore}
            min={1}
            onChange={(e) => setTargetScore(parseInt(e.target.value))}
            style={inputStyle}
          />
          <button onClick={handleStartMatch} style={buttonStyle}>
            Start Match
          </button>
        </div>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Team 1 */}
            <div style={teamBoxStyle}>
              <h3>{team1Name}</h3>
              <h2>{team1Score}</h2>
              <div style={scoreButtonsWrapper}>
                <button onClick={() => handleScoreChange('team1', 1)} style={scoreBtn}>
                  +
                </button>
                <button onClick={() => handleScoreChange('team1', -1)} style={scoreBtn}>
                  -
                </button>
              </div>
            </div>

            {/* Team 2 */}
            <div style={teamBoxStyle}>
              <h3>{team2Name}</h3>
              <h2>{team2Score}</h2>
              <div style={scoreButtonsWrapper}>
                <button onClick={() => handleScoreChange('team2', 1)} style={scoreBtn}>
                  +
                </button>
                <button onClick={() => handleScoreChange('team2', -1)} style={scoreBtn}>
                  -
                </button>
              </div>
            </div>
          </div>

          {winner && (
            <div
              style={{
                marginTop: '20px',
                color: 'green',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: '18px',
              }}
            >
              🏆 {winner} Wins!
            </div>
          )}

          <button onClick={resetMatch} style={{ ...buttonStyle, marginTop: '20px', width: '100%' }}>
            Reset Match
          </button>
        </div>
      )}
    </div>
  );
};

export default MatchScorer;

const inputStyle = {
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '16px',
  width: '100%',
};

const buttonStyle = {
  padding: '12px',
  borderRadius: '8px',
  backgroundColor: '#4CAF50',
  color: '#fff',
  border: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const teamBoxStyle = {
  width: '100%',
  backgroundColor: '#fff',
  borderRadius: '10px',
  padding: '16px',
  boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
  textAlign: 'center',
};

const scoreButtonsWrapper = {
  display: 'flex',
  justifyContent: 'center',
  gap: '12px',
  marginTop: '8px',
};

const scoreBtn = {
  padding: '10px 20px',
  fontSize: '20px',
  fontWeight: 'bold',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#2196F3',
  color: '#fff',
  cursor: 'pointer',
};
