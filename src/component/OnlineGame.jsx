
import React, { useState, useEffect } from 'react';

const apiKey = '8954d541295d45c7ae6b04196c30f370';
const url = `https://api.rawg.io/api/games?key=${apiKey}`;

function OnlineGame() {
  const [games, setGames] = useState([]);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishlist')) || []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setGames(data.results))
      .catch((error) => console.error('Error:', error));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (game) => {
    if (!cart.find((item) => item.id === game.id)) {
      setCart([...cart, game]);
    }
  };

  const addToWishlist = (game) => {
    if (!wishlist.find((item) => item.id === game.id)) {
      setWishlist([...wishlist, game]);
    }
  };

  const filteredGames = games.filter((game) => {
    if (filter === 'best-selling') return game.ratings_count > 1000;
    if (filter === 'trending') return game.added > 5000;
    if (filter === 'free') return game.price === 0;
    return true;
  });

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', color: '#333' }}>
      <header
        style={{
          padding: '15px',
          backgroundColor: 'silver',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1 style={{ marginLeft:'50%'  }}><b>Online Game Shop</b></h1>
        <nav>
          <button style={{ margin: '0 5px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 12px', cursor: 'pointer' }}>
            Cart ({cart.length})
          </button>
          <button style={{ margin: '0 5px', backgroundColor: '#ff5722', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 12px', cursor: 'pointer' }}>
            Wishlist ({wishlist.length})
          </button>
        </nav>
      </header>

      <div
        style={{
          padding: '15px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fff',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        }}
      >
        <select
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          style={{
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            cursor: 'pointer',
          }}
        >
          <option value="">All</option>
          <option value="best-selling">Best Selling</option>
          <option value="trending">Trending</option>
          <option value="free">Free Games</option>
        </select>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          padding: '15px',
          justifyContent: 'center',
          backgroundColor: '#fafafa',
        }}
      >
        {filteredGames.map((game) => (
          <div
            key={game.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              overflow: 'hidden',
              width: '250px',
              backgroundColor: '#fff',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <img
              src={game.background_image}
              alt={game.name}
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <div style={{ padding: '10px' }}>
              <h3 style={{ fontSize: '18px', margin: '10px 0', color: '#333' }}>{game.name}</h3>
              <button
                onClick={() => addToCart(game)}
                style={{
                  margin: '5px 0',
                  width: '100%',
                  backgroundColor: '#4caf50',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '10px',
                  cursor: 'pointer',
                }}
              >
                Add to Cart
              </button>
              <button
                onClick={() => addToWishlist(game)}
                style={{
                  margin: '5px 0',
                  width: '100%',
                  backgroundColor: '#ff5722',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '10px',
                  cursor: 'pointer',
                }}
              >
                Add to Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default OnlineGame;
