import React, { useState, useRef, useEffect } from 'react';
import './movieCard.sass';

interface Movie {
  title: string;
  release_date: string;
  genre_ids: number[];
  poster_path: string;
  likes?: number; // optionnal because only present in the family mode
}

const MovieSwiper: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeIcon, setActiveIcon] = useState<'video' | 'heart'>('video');
  const isFamily = activeIcon === 'heart';
  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);
  const imageRef = useRef<HTMLImageElement>(null);



  useEffect(() => {
    fetchMovies();
  }, []);



  useEffect(() => {
    if (currentIndex >= movies.length - 3) {
      fetchMovies();
    }
  }, [currentIndex]);


  useEffect(() => {
    // reset and refetch when changing mode
    setCurrentIndex(0);
    setMovies([]);
    fetchMovies();
  }, [isFamily]); // use effect for managing mode switch


  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.style.transition = 'none';
      imageRef.current.style.transform = 'translateX(0) rotate(0deg)';
      imageRef.current.offsetHeight;
      imageRef.current.style.transition = 'transform 0.3s ease-out';
    }
  }, [currentIndex]);



  const fetchMovies = async () => {
    try {
      const url = isFamily ? '/movies/liked' : '/movies';
      const response = await fetch(`http://localhost:3000${url}?page=${currentPage}`);
      const data = await response.json();
      setMovies(prevMovies => [...prevMovies, ...data.movies]);
      setCurrentPage(prev => prev + 1);
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des films:', error);
      setIsLoading(false);
    }
  };

  const getFullImagePath = (path: string) => {
    return `https://image.tmdb.org/t/p/w500${path}`;
  };

  const toggleIcon = () => {
    setActiveIcon(prev => prev === 'video' ? 'heart' : 'video');
  };

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

  const handleSwipeLeft = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = 'translateX(-200%) rotate(-30deg)';
    }
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, 300);
  };

  const handleSwipeRight = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = 'translateX(200%) rotate(30deg)';
    }
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, 300);
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  const currentMovie = movies[currentIndex];
  if (!currentMovie) return null;

  
  return (
    <div className={`movie-card ${isFamily ? 'family-mode' : ''}`}>
      {/* Header */}
      <div className="image-container" 
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
        {isFamily && currentMovie.likes && (
          <div className="likes-count">
            ❤️ {currentMovie.likes}
          </div>
        )}
      </div>
  
      <div className="content-wrapper">
        <div className={`video-icon ${activeIcon}-active`} onClick={toggleIcon}>
          <div className="icons-wrapper">
            <img src="/public/video.svg" alt="camera" className="camera-icon" />
            <img src="/public/tabheart.svg" alt="heart" className="heart-icon" />
          </div>
        </div>
  
        <div className="movie-info">
          <h1 className="movie-title">{currentMovie.title}</h1>
          <div className="movie-meta">
            {isFamily ? 'SÉLECTION FAMILLE' : 'TRENDING'} {currentMovie.release_date.split('-')[0]}
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

}

export default MovieSwiper;