import React from 'react';
import MovieCard from './components/MovieCard';

function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      background: '#f5f5f5' 
      }}>
      <MovieCard
        title="APOCALYPSE NOW"
        year="1979"
        genre="WAR/ACTION"
        posterUrl="./public/apocalypse-now.webp"
      />
    </div>
  );
}

export default App;