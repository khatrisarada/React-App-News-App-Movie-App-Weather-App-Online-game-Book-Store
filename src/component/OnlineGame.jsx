import React, { useState, useEffect } from 'react';

const apiKey = '8954d541295d45c7ae6b04196c30f370';
const url = `https://api.rawg.io/api/games?key=${apiKey}`;

function OnlineGame() {
  const [games, setGames] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setGames(data.results))
      .catch((error) => console.error('Error:', error));
  }, []);

  const fetchGameDescription = async (game) => {
    try {
      const response = await fetch(`https://api.rawg.io/api/games/${game.id}?key=${apiKey}`);
      const data = await response.json();
      setSelectedGame({ ...game, description: data.description_raw });
    } catch (error) {
      console.error('Error fetching game details:', error);
    }
  };

  const filteredGames = games.filter((game) => {
    if (filter === 'best-selling') return game.ratings_count > 1000;
    if (filter === 'trending') return game.added > 5000;
    if (filter === 'free') return game.price === 0;
    return true;
  });

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', color: '#333', minHeight: '100vh', padding: '20px' }}>
      <header style={{ padding: '20px', backgroundColor: '#2c3e50', color: 'white', textAlign: 'center', fontSize: '24px', fontWeight: 'bold', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
        Online Game Shop
      </header>
      
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <select onChange={(e) => setFilter(e.target.value)} value={filter} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', cursor: 'pointer', fontSize: '16px' }}>
          <option value="">All</option>
          <option value="best-selling">Best Selling</option>
          <option value="trending">Trending</option>
          <option value="free">Free Games</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {filteredGames.map((game) => (
          <div key={game.id} style={{ borderRadius: '10px', overflow: 'hidden', width: '250px', backgroundColor: '#fff', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s', cursor: 'pointer' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            onClick={() => fetchGameDescription(game)}>
            <img src={game.background_image} alt={game.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <div style={{ padding: '10px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '18px', margin: '10px 0', color: '#333' }}>{game.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {selectedGame && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', width: '90%', maxWidth: '400px', textAlign: 'center', position: 'relative', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)', animation: 'fadeIn 0.3s ease-in-out' }}>
            <button onClick={() => setSelectedGame(null)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'transparent', color: '#333', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✖</button>
            <h2 style={{ marginBottom: '10px', fontSize: '22px', color: '#2c3e50', fontWeight: 'bold' }}>{selectedGame.name}</h2>
            <img src={selectedGame.background_image} alt={selectedGame.name} style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }} />
            <p style={{ fontSize: '14px', color: '#555', maxHeight: '150px', overflowY: 'auto', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>{selectedGame.description || 'No description available.'}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default OnlineGame;