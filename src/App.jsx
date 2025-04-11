import { useState } from 'react';
import './App.css';
import TeamBuilder from './Components/TeamBuilder';
import ChoosePlayers from './Components/ChoosePlayers';
import AddPlayer from './Components/AddPlayer';
import Players from './Players.json';
import MatchScorer from './Components/MatchScorer';

function App() {
  const [players, setPlayers] = useState(Players);

  const handleAddPlayer = (newPlayer) => {
    setPlayers((prev) => [...prev, newPlayer]);
  };

  return (
    <div className="app-container">
      {/* You can uncomment components as needed */}
      {/* <AddPlayer onAdd={handleAddPlayer} /> */}
      {/* <TeamBuilder players={players} /> */}
      <h1 className="mobile-heading">Fucking Legends</h1>


      <ChoosePlayers />
      <MatchScorer />
    </div>
  );
}

export default App;
