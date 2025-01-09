import React, { useRef } from 'react';
import { useMovieContext } from '../../contexts/MovieContext';
import BaseMovieSwiper from './BaseMovieSwiper';

const MovieDetails: React.FC = () => {
  const {
    currentMovie,
    isLoading,
    toggleFamilyMode,
    isFamily,
  } = useMovieContext();

  // On garde les refs pour la cohérence avec BaseMovieSwiper
  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);
  const imageRef = useRef<HTMLImageElement>(null);

  // Les gestionnaires d'événements vides car on ne veut pas de swipe
  const handleDragStart = (e: React.TouchEvent) => {
    e.preventDefault();
  };

  const handleDragMove = (e: React.TouchEvent) => {
    e.preventDefault();
  };

  const handleDragEnd = () => {
    // No-op
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // No-op
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // No-op
  };

  const handleMouseUp = () => {
    // No-op
  };

  if (!currentMovie || isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <BaseMovieSwiper
      mode="details" // Nouveau mode pour MovieDetails
      currentMovie={currentMovie}
      isLoading={isLoading}
      isFamily={isFamily}
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

export default MovieDetails;