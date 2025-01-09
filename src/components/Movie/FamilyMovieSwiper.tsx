import React, { useRef } from 'react';
import { useMovieContext } from '../../contexts/MovieContext';
import BaseMovieSwiper from './BaseMovieSwiper';

const FamilyMovieSwiper: React.FC = () => {
  const {
    currentMovie,
    isLoading,
    toggleFamilyMode,
    isFamily,
  } = useMovieContext();

  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMarkAsWatched = () => {
    // Logique à implémenter plus tard
    console.log('Marqué comme vu');
  };

  // Mêmes gestionnaires de drag que MovieSwiper
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
      
      if (Math.abs(deltaX) > threshold) {
        const targetX = deltaX > 0 ? window.innerWidth + 200 : -window.innerWidth - 200;
        const targetRotation = deltaX > 0 ? 45 : -45;
        
        imageRef.current.style.transform = `translateX(${targetX}px) rotate(${targetRotation}deg)`;
        
        setTimeout(() => {
          // Juste passer au film suivant sans action
          if (imageRef.current) {
            imageRef.current.style.transition = 'none';
            imageRef.current.style.transform = 'translateX(0) rotate(0deg)';
          }
        }, 300);
      } else {
        imageRef.current.style.transform = 'translateX(0) rotate(0deg)';
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
    dragCurrentX.current = e.clientX;
    if (imageRef.current) {
      imageRef.current.style.transition = 'none';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStartX.current === 0) return;
    
    dragCurrentX.current = e.clientX;
    const deltaX = dragCurrentX.current - dragStartX.current;
    if (imageRef.current) {
      imageRef.current.style.transform = `translateX(${deltaX}px) rotate(${deltaX * 0.1}deg)`;
    }
  };

  const handleMouseUp = () => {
    if (dragStartX.current === 0) return;
    handleDragEnd();
    dragStartX.current = 0;
  };

  if (!currentMovie || isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <BaseMovieSwiper
      mode="family"
      currentMovie={currentMovie}
      isLoading={isLoading}
      isFamily={isFamily}
      likes={2} // À remplacer par la vraie logique de comptage !!!
      onMarkAsWatched={handleMarkAsWatched}
      toggleFamilyMode={toggleFamilyMode}
      handleDragStart={handleDragStart}
      handleDragMove={handleDragMove}
      handleDragEnd={handleDragEnd}
      handleMouseDown={handleMouseDown}
      handleMouseMove={handleMouseMove}
      handleMouseUp={handleMouseUp}
      imageRef={imageRef}
    />
  );
};

export default FamilyMovieSwiper;