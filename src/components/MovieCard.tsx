import React, { useState } from 'react';
import '../styles/movieCard.sass';

interface MovieCardProps {
  title: string;
  year: string;
  genre: string;
  posterUrl: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, year, genre, posterUrl }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [activeIcon, setActiveIcon] = useState<'video' | 'heart'>('video');

  const toggleIcon = () => {
    setActiveIcon(prev => prev === 'video' ? 'heart' : 'video');
  };

  return (
    <div className="movie-card">
      {/* Image Section */}
      <div className="image-container">
        <img 
          className="poster-image" 
          src={posterUrl} 
          alt={title} 
        />
      </div>

      {/* Content Section */}
      <div className="content-wrapper">
        {/* Header with icons */}
        <div className="header">
          <div className={`video-icon ${activeIcon}-active`} onClick={toggleIcon}>
            <div className="icons-wrapper">
              <img src="./public/video.svg" alt="camera" className="camera-icon" />
              <img src="./public/tabheart.svg" alt="heart" className="heart-icon" />
            </div>
          </div>
        </div>

        {/* Movie Info */}
        <div className="movie-info">
          <h1 className="movie-title">{title}</h1>
          <div className="movie-meta">TRENDING {genre} {year}</div>
        </div>

        {/* Info Icon */}
        <div className="info-icon">
          <img src="./public/info.svg" alt="info" className="icon" />
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="button multiply">
            <img src="./public/cross.png" alt="cross" />
          </button>
          <button className="button replay">
            <img src="./public/arrow.svg" alt="arrows" />
          </button>
          <button className="button heart">
            <img src="./public/heart.svg" alt="heart" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
