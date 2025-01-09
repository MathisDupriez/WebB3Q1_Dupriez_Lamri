import React, { useRef } from 'react';
import Movie from '../../model/Movie';
import { Check } from 'lucide-react';
// import { Check } from "lucide-react";


interface BaseSwiperProps {
  mode: 'family' | 'normal' | 'details';
  currentMovie: Movie | null;
  isFamily: boolean;
  isLoading: boolean;
  likes?: number;
  watched?: boolean;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onMarkAsWatched?: () => void;
  toggleFamilyMode: () => void;
  handleDragStart: (e: React.TouchEvent) => void;
  handleDragMove: (e: React.TouchEvent) => void;
  handleDragEnd: () => void;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
  imageRef: React.RefObject<HTMLImageElement>;
  showDetails?: () => void; // Nouvelle prop pour gérer la navigation vers les détails
}

const BaseMovieSwiper: React.FC<BaseSwiperProps> = ({
  mode,
  currentMovie,
  likes = 0,
  isLoading,
  onSwipeLeft,
  onSwipeRight,
  onMarkAsWatched,
  toggleFamilyMode,
  isFamily,
  handleDragStart,
  handleDragMove,
  handleDragEnd,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  imageRef,
}) => {
  if (!currentMovie || isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      {/* Container principal avec les gestionnaires d'événements */}
      <div 
        className="relative w-full h-full md:w-[90vw] md:h-[85vh] max-w-[500px] max-h-[850px] min-w-[350px] touch-none select-none"
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Container de l'image avec la référence */}
        <div ref={imageRef} className="relative w-full h-full transition-transform duration-300 ease-out">
          {/* Image */}
          <img
            src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
            alt={currentMovie.title}
            className="w-full h-full object-cover rounded-lg"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-lg" />

          {/* Like counter - uniquement en mode famille */}
          {mode === 'family' && (
            <div className="absolute top-8 right-8 bg-white/90 px-4 py-2 rounded-full text-lg shadow-lg flex items-center gap-2 z-20">
              <span className="text-red-500">❤️</span>
              <span className="font-bold">{likes}</span>
            </div>
          )}

          {/* Toggle mode */}
          <div 
            className="absolute top-6 left-1/2 -translate-x-1/2 z-20 w-20 h-8 bg-gray-100/70 rounded-full flex items-center cursor-pointer overflow-visible"
            onClick={toggleFamilyMode}
          >
            {/* Cercle blanc du toggle */}
            <div className={`
              absolute w-10 h-10 bg-white rounded-full shadow-lg 
              transition-transform duration-300 ease-in-out
              top-1/2 -translate-y-1/2
              ${isFamily ? 'translate-x-[calc(100%-2px)]' : 'translate-x-[-4px]'}
            `}/>
            {/* Icônes du toggle */}
            <div className="relative w-full flex justify-between items-center z-10 px-2">
              <img 
                src="/public/video.svg" 
                alt="camera" 
                className={`w-7 h-7 transition-all duration-300 ${isFamily ? 'grayscale opacity-60' : ''}`} 
              />
              <img 
                src="/public/tabheart.svg" 
                alt="heart" 
                className={`w-7 h-7 transition-all duration-300 ${isFamily ? '' : 'grayscale opacity-60'}`} 
              />
            </div>
          </div>

          {/* Titre et métadonnées */}
          <div className="absolute bottom-32 left-6 right-6 text-white z-10">
            <h1 className="font-alexandria text-3xl leading-tight mb-2">
              {currentMovie.title}
            </h1>
            <div className="font-heebo text-sm">
              {isFamily ? 'SÉLECTION FAMILLE' : 'TRENDING'}{' '}
              {currentMovie.release_date.split('-')[0]}
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-16 z-20">
            {mode === 'normal' ? (
              <>
                <button 
                  onClick={onSwipeLeft} 
                  className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95"
                >
                  <img src="/public/cross.png" alt="cross" className="w-6 h-6" />
                </button>
                <button 
                  onClick={onSwipeRight} 
                  className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95"
                >
                  <img src="/public/heart.svg" alt="heart" className="w-6 h-6" />
                </button>
              </>
            ) : (
              <button 
                onClick={onMarkAsWatched}
                className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95"
              >
                <Check className="w-6 h-6 text-green-600" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseMovieSwiper;