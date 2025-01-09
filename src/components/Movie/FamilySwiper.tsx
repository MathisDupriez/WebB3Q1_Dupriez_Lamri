import React, { useState, useEffect, useRef } from 'react';
import './familyMovieCard.sass';
import FamilyMovieCard from './FamilyMovieCard';

interface Movie {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
    likes: number;
}

const FamilySwiper: React.FC = () => {
    const [likedMovies, setLikedMovies] = useState<Movie[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [finalSelection, setFinalSelection] = useState<Movie[]>([]);
    const [showResults, setShowResults] = useState(false);
    
    const dragStartX = useRef(0);
    const dragCurrentX = useRef(0);
    const imageRef = useRef<HTMLImageElement>(null);
  
    useEffect(() => {
      fetchLikedMovies();
    }, []);
  
    const fetchLikedMovies = async () => {
      try {
        const response = await fetch('http://localhost:3000/movies/liked');
        const data = await response.json();
        setLikedMovies(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des films:', error);
        setIsLoading(false);
      }
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
        
        // Ajout de la classe pour l'indicateur visuel
        const card = imageRef.current.closest('.movie-card');
        if (card) {
          card.classList.remove('swipe-left', 'swipe-right');
          if (deltaX > 50) card.classList.add('swipe-right');
          else if (deltaX < -50) card.classList.add('swipe-left');
        }
      }
    };
  
    const handleDragEnd = () => {
      const deltaX = dragCurrentX.current - dragStartX.current;
      const threshold = window.innerWidth * 0.3;
  
      if (imageRef.current) {
        imageRef.current.style.transition = 'transform 0.3s ease-out';
        const card = imageRef.current.closest('.movie-card');
        if (card) {
          card.classList.remove('swipe-left', 'swipe-right');
        }
      }
  
      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0) {
          handleFamilyLike();
        } else {
          handleSkip();
        }
      } else {
        resetCardPosition();
      }
    };
  
    const handleFamilyLike = async () => {
      const currentMovie = likedMovies[currentIndex];
      
      try {
        await fetch(`http://localhost:3000/movies/${currentMovie.id}/familylike`, {
          method: 'POST'
        });
        
        setFinalSelection(prev => [...prev, currentMovie]);
      } catch (error) {
        console.error('Erreur lors du like familial:', error);
      }
      
      nextMovie();
    };
  
    const handleSkip = () => {
      nextMovie();
    };
  
    const nextMovie = () => {
      const nextIndex = currentIndex + 1;
      
      if (nextIndex >= likedMovies.length) {
        setShowResults(true);
      } else {
        setCurrentIndex(nextIndex);
        resetCardPosition();
      }
    };
  
    const resetCardPosition = () => {
      if (imageRef.current) {
        imageRef.current.style.transform = 'translateX(0) rotate(0deg)';
      }
    };
  
    if (isLoading) {
      return <div className="family-loading">Chargement des films likés par la famille...</div>;
    }
  
    if (showResults) {
      return (
        <div className="family-results">
          <h2>Films choisis en famille ! 🎉</h2>
          <div className="selected-movies">
            {finalSelection.map(movie => (
              <div key={movie.id} className="selected-movie">
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                <h3>{movie.title}</h3>
                <div className="likes">❤️ {movie.likes} membres</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  
    if (likedMovies.length === 0) {
      return <div className="no-movies">Aucun film n'a encore été liké par la famille !</div>;
    }
  
    const currentMovie = likedMovies[currentIndex];
  
    return (
      <div className="family-mode-container">
        <div className="progress-header">
          Film {currentIndex + 1} sur {likedMovies.length}
        </div>
        
        <div 
          className="card-container"
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <FamilyMovieCard
            ref={imageRef}
            title={currentMovie.title}
            releaseDate={currentMovie.release_date}
            posterPath={currentMovie.poster_path}
            likesCount={currentMovie.likes}
          />
        </div>
  
        <div className="family-actions">
          <button onClick={handleSkip}>Passer</button>
          <button onClick={handleFamilyLike}>On regarde !</button>
        </div>
      </div>
    );
  };
  
  export default FamilySwiper;