import React, { useState } from 'react';

const AddPlayer = ({ onAddPlayer }) => {
  const [name, setName] = useState('');
  const [skill, setSkill] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !skill || skill < 1 || skill > 5) {
      alert('Please enter a name and skill between 1-5');
      return;
    }

    const newPlayer = {
      id: Date.now(), // Unique ID
      name,
      skill: parseInt(skill)
    };

    onAddPlayer(newPlayer);
    setName('');
    setSkill('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Player Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Skill (1-5)"
        min="1"
        max="5"
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        required
      />
      <button type="submit">Add Player</button>
    </form>
  );
};

export default AddPlayer;
