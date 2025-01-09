import React, { useRef } from 'react';
import './movieCard.sass';
import { useMovieContext } from '../../contexts/MovieContext';

const MovieSwiper: React.FC = () => {
  const {
    currentMovie,
    isLoading,
    handleSwipeLeft,
    handleSwipeRight,
    toggleFamilyMode,
    isFamily,
  } = useMovieContext();

  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleDragStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    dragStartX.current = touch.clientX;
    dragCurrentX.current = touch.clientX;

    if (imageRef.current) {
      imageRef.current.style.transition = 'none';
    }
  };

  const handleDragMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    dragCurrentX.current = touch.clientX;

    const deltaX = dragCurrentX.current - dragStartX.current;
    if (imageRef.current) {
      imageRef.current.style.transform = `translateX(${deltaX}px) rotate(${deltaX * 0.1}deg)`;
    }
  };

  const handleDragEnd = () => {
    const deltaX = dragCurrentX.current - dragStartX.current;
    const threshold = window.innerWidth * 0.3;

    if (imageRef.current) {
      imageRef.current.style.transition = 'transform 0.3s ease-out';
    }

    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        handleSwipeRight();
      } else {
        handleSwipeLeft();
      }
    } else {
      if (imageRef.current) {
        imageRef.current.style.transform = 'translateX(0) rotate(0deg)';
      }
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (!currentMovie) return null;

  const getFullImagePath = (path: string) => {
    return `https://image.tmdb.org/t/p/w500${path}`;
  };

  return (
    <div className={`movie-card ${isFamily ? 'family-mode' : ''}`}>
      <div
        className="image-container"
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <img
          ref={imageRef}
          className="poster-image"
          src={getFullImagePath(currentMovie.poster_path)}
          alt={currentMovie.title}
        />
      </div>

      {/* Movie Info Section */}
      <div className="movie-info">
        <h1 className="movie-title">{currentMovie.title}</h1>
        <div className="movie-meta">
          {isFamily ? 'SÉLECTION FAMILLE' : 'TRENDING'}{' '}
          {currentMovie.release_date.split('-')[0]}
        </div>
      </div>

      <div className="content-wrapper">
        <div
          className={`video-icon ${isFamily ? 'heart-active' : 'video-active'}`}
          onClick={toggleFamilyMode}
        >
          <div className="icons-wrapper">
            <img src="/public/video.svg" alt="camera" className="camera-icon" />
            <img src="/public/tabheart.svg" alt="heart" className="heart-icon" />
          </div>
        </div>

        <div className="info-icon">
          <img src="/public/info.svg" alt="info" className="icon" />
        </div>

        <div className="action-buttons">
          <button className="button multiply" onClick={handleSwipeLeft}>
            <img src="/public/cross.png" alt="cross" />
          </button>
          <button className="button replay">
            <img src="/public/arrow.svg" alt="arrows" />
          </button>
          <button className="button heart" onClick={handleSwipeRight}>
            <img src="/public/heart.svg" alt="heart" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieSwiper;
