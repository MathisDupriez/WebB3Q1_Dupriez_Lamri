import React, { useState, useRef, useEffect } from 'react';
import './movieCard.sass';

interface MovieCardProps {
  title: string;
  year: string;
  genre: string;
  posterUrl: string;
}

interface Movie {
  id: number;
  title: string;
  year: string;
  genre: string;
  posterUrl: string;
}

const moviesData: Movie[] = [
  {
    id: 1,
    title: "Inception",
    year: "2010",
    genre: "Sci-Fi",
    posterUrl: "https://media.senscritique.com/media/000004710747/0/inception.jpg"
  },
  {
    id: 2,
    title: "The Dark Knight",
    year: "2008",
    genre: "Action",
    posterUrl: "https://fr.web.img2.acsta.net/medias/nmedia/18/63/97/89/18949761.jpg"
  },
  {
    id: 3,
    title: "Interstellar",
    year: "2014",
    genre: "Sci-Fi",
    posterUrl: "https://fr.web.img5.acsta.net/pictures/14/09/24/12/08/158828.jpg"
  }
];

const MovieSwiper: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeIcon, setActiveIcon] = useState<'video' | 'heart'>('video');
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);
  const imageRef = useRef<HTMLImageElement>(null);

  const toggleIcon = () => {
    setActiveIcon(prev => prev === 'video' ? 'heart' : 'video'); // permet de changer l'icone "active" en cliquant dessus
  };

  const handleDragStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    dragStartX.current = touch.clientX;
    dragCurrentX.current = touch.clientX;

    if (imageRef.current) {
      imageRef.current.style.transition = 'none';
    }
  };

  const handleDragMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    dragCurrentX.current = touch.clientX;
    
    const deltaX = dragCurrentX.current - dragStartX.current;
    if (imageRef.current) {
      imageRef.current.style.transform = `translateX(${deltaX}px) rotate(${deltaX * 0.1}deg)`;
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

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
      setCurrentIndex((prev) => (prev + 1) % moviesData.length);
    }, 300);
  };

  const handleSwipeRight = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = 'translateX(200%) rotate(30deg)';
    }
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % moviesData.length);
    }, 300);
  };

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.style.transition = 'none';
      imageRef.current.style.transform = 'translateX(0) rotate(0deg)';
      imageRef.current.offsetHeight; // Force reflow
      imageRef.current.style.transition = 'transform 0.3s ease-out';
    }
  }, [currentIndex]);

  const currentMovie = moviesData[currentIndex];
  return (
    <div className="movie-card">
      <div className="image-container" 
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <img
          ref={imageRef}
          className="poster-image"
          src={currentMovie.posterUrl}
          alt={currentMovie.title}
        />
      </div>

      <div className="content-wrapper">
        {/* Correction ici : suppression de la div englobante superflue */}
        <div className={`video-icon ${activeIcon}-active`} onClick={toggleIcon}>
          <div className="icons-wrapper">
            <img src="./public/video.svg" alt="camera" className="camera-icon" />
            <img src="./public/tabheart.svg" alt="heart" className="heart-icon" />
          </div>
        </div>

        <div className="movie-info">
          <h1 className="movie-title">{currentMovie.title}</h1>
          <div className="movie-meta">
            TRENDING {currentMovie.genre} {currentMovie.year}
          </div>
        </div>

        <div className="info-icon">
          <img src="./public/info.svg" alt="info" className="icon" />
        </div>

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

export default MovieSwiper;