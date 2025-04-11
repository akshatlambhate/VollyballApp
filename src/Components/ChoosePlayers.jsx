import React from "react";
import PlayersArrary from "../Players.json";
import { useState } from "react";
import TeamBuilder from "./TeamBuilder";

const ChoosePlayers = () => {
  const [SelectedTeam, setSelectedTeam] = useState([]);

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '100%',
        margin: 'auto',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f5f5f5',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '16px' }}>
        Choose Players
      </h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          backgroundColor: '#fff',
          padding: '15px',
          borderRadius: '12px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          marginBottom: '20px',
        }}
      >
        {PlayersArrary.map((player, index) => (
          <label key={index} style={checkboxLabelStyle}>
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedTeam([...SelectedTeam, player]);
                } else {
                  setSelectedTeam(
                    SelectedTeam.filter((item) => item !== player)
                  );
                }
              }}
              style={checkboxStyle}
            />
            {player.name}
          </label>
        ))}
      </div>

      <div
        style={{
          marginBottom: '20px',
          backgroundColor: '#fff',
          padding: '15px',
          borderRadius: '12px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        }}
      >
        <h3 style={{ marginBottom: '10px' }}>Selected Players</h3>
        {SelectedTeam.length === 0 ? (
          <div style={{ color: '#888' }}>No players selected yet.</div>
        ) : (
          SelectedTeam.map((player, index) => (
            <div key={index} style={playerStyle}>
              {player.name}
            </div>
          ))
        )}
      </div>

      <TeamBuilder players={SelectedTeam} />
    </div>
  );
};

export default ChoosePlayers;

const checkboxLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  fontSize: '16px',
  gap: '10px',
};

const checkboxStyle = {
  width: '18px',
  height: '18px',
};

const playerStyle = {
  padding: '6px 0',
  borderBottom: '1px solid #eee',
  fontSize: '16px',
};
