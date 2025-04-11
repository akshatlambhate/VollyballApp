import React, { useState } from 'react';
import './MatchScorer.css';

const MatchScorer = () => {
  // Basic match settings
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');
  const [targetScore, setTargetScore] = useState(25);

  // Scores and match state
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [winner, setWinner] = useState(null);
  const [isMatchStarted, setIsMatchStarted] = useState(false);

  // Dues mode state
  const [duesActive, setDuesActive] = useState(false);
  // lastDuesScorer: 'team1' or 'team2' or null (no advantage)
  const [lastDuesScorer, setLastDuesScorer] = useState(null);
  // Count of consecutive points in dues
  const [consecutivePoints, setConsecutivePoints] = useState(0);

  const handleStartMatch = () => {
    if (!team1Name || !team2Name || targetScore <= 0) {
      alert('Please enter both team names and a valid target score');
      return;
    }
    setIsMatchStarted(true);
  };

  // Check if dues should be activated (i.e. both teams are at targetScore - 1)
  const checkDuesActivation = (score1, score2) => {
    if (score1 === targetScore - 1 && score2 === targetScore - 1) {
      setDuesActive(true);
      setLastDuesScorer(null);
      setConsecutivePoints(0);
    }
  };

  const handleScoreChange = (team, amount) => {
    if (winner) return;

    let newTeam1Score = team1Score;
    let newTeam2Score = team2Score;

    if (team === 'team1') {
      newTeam1Score = Math.max(0, team1Score + amount);
      setTeam1Score(newTeam1Score);
    } else {
      newTeam2Score = Math.max(0, team2Score + amount);
      setTeam2Score(newTeam2Score);
    }

    // Check for dues activation if not already active.
    if (!duesActive) {
      checkDuesActivation(newTeam1Score, newTeam2Score);
      // Normal win condition (outside dues)
      if (newTeam1Score >= targetScore && (newTeam1Score - newTeam2Score) >= 2) {
        setWinner(team1Name);
        return;
      } else if (newTeam2Score >= targetScore && (newTeam2Score - newTeam1Score) >= 2) {
        setWinner(team2Name);
        return;
      }
    }

    // If dues mode is active, apply dues logic.
    if (duesActive) {
      // If no team currently holds advantage
      if (lastDuesScorer === null) {
        // Do not automatically grant advantage on this point.
        // Instead, wait for the next point to start a streak.
        setLastDuesScorer(team);
        setConsecutivePoints(1);
      } else if (lastDuesScorer === team) {
        // Same team scores consecutively in dues.
        setConsecutivePoints(prev => {
          const newCount = prev + 1;
          if (newCount >= 2) {
            setWinner(team === 'team1' ? team1Name : team2Name);
          }
          return newCount;
        });
      } else {
        // Opponent scores while one team has advantage.
        // This resets the dues advantage.
        setLastDuesScorer(null);
        setConsecutivePoints(0);
      }
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
    setDuesActive(false);
    setLastDuesScorer(null);
    setConsecutivePoints(0);
  };

  // Helper to show current status in dues mode.
  const renderDuesStatus = () => {
    if (duesActive && !winner) {
      if (lastDuesScorer) {
        return <p className="dues-text">Advantage: {lastDuesScorer === 'team1' ? team1Name : team2Name}</p>;
      }
      return <p className="dues-text">Dues Active - No Advantage</p>;
    }
    return null;
  };

  return (
    <div className="match-container">
      <h2 className="match-heading">🏐 Match Scorer</h2>

      {!isMatchStarted ? (
        <div className="input-section">
          <input
            type="text"
            placeholder="Team 1 Name"
            value={team1Name}
            onChange={(e) => setTeam1Name(e.target.value)}
          />
          <input
            type="text"
            placeholder="Team 2 Name"
            value={team2Name}
            onChange={(e) => setTeam2Name(e.target.value)}
          />
          <input
            type="number"
            placeholder="Target Score"
            value={targetScore}
            min={1}
            onChange={(e) => setTargetScore(parseInt(e.target.value))}
          />
          <button onClick={handleStartMatch}>Start Match</button>
        </div>
      ) : (
        <div className="score-section">
          <div className="team">
            <h3>{team1Name}</h3>
            <h1 className="score">{team1Score}</h1>
            <div className="button-group">
              <button onClick={() => handleScoreChange('team1', 1)}>+</button>
              <button onClick={() => handleScoreChange('team1', -1)}>-</button>
            </div>
          </div>

          <div className="team">
            <h3>{team2Name}</h3>
            <h1 className="score">{team2Score}</h1>
            <div className="button-group">
              <button onClick={() => handleScoreChange('team2', 1)}>+</button>
              <button onClick={() => handleScoreChange('team2', -1)}>-</button>
            </div>
          </div>

          {renderDuesStatus()}

          {winner && (
            <div className="winner-indicator">
              🏆 <strong>{winner}</strong> Wins!
            </div>
          )}

          <button className="reset-button" onClick={resetMatch}>
            Reset Match
          </button>
        </div>
      )}
    </div>
  );
};

export default MatchScorer;
