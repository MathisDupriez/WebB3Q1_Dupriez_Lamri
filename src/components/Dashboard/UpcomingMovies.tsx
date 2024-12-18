import React from 'react';
import './UpcomingMovies.sass';

type Movie = {
  id: number;
  title: string;
  posterUrl: string;
};

type UpcomingMoviesProps = {
  movies: Movie[]; // Liste des films
  onPlay: (movieId: number) => void; // Callback pour lancer la partie avec un film
};

const UpcomingMovies: React.FC<UpcomingMoviesProps> = ({ movies, onPlay }) => {
  return (
    <div className="upcoming-movies">
      <h2 className="section-title">Films à venir</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie-item" key={movie.id}>
            <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <button className="play-button" onClick={() => onPlay(movie.id)}>
                🎬 Jouer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMovies;
