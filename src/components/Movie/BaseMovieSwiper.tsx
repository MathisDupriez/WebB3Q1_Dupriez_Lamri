import React, { useRef } from 'react';
import Movie from '../../model/Movie';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  if (!currentMovie || isLoading) {
    return <div>Chargement...</div>;
  }

  const handleToggleClick = () => {
    if (mode === 'details') {
      navigate(-1); // Retour à la vue précédente
    } else {
      // Navigue vers la vue détails avec le film actuel
      navigate('/movie-details', { 
        state: { 
          movie: currentMovie,
          previousMode: mode // On garde une trace du mode précédent
        } 
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
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
        <div ref={imageRef} className="relative w-full h-full transition-transform duration-300 ease-out">
          <img
            src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
            alt={currentMovie.title}
            className="w-full h-full object-cover rounded-lg"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-lg" />

          {mode === 'family' && (
            <div className="absolute top-8 right-8 bg-white/90 px-4 py-2 rounded-full text-lg shadow-lg flex items-center gap-2 z-20">
              <span className="text-red-500">❤️</span>
              <span className="font-bold">{likes}</span>
            </div>
          )}

          {/* Toggle button */}
          <div 
            className="absolute top-6 left-1/2 -translate-x-1/2 z-20 w-20 h-8 bg-gray-100/70 rounded-full flex items-center cursor-pointer overflow-visible"
            onClick={handleToggleClick}
          >
            <div className={`
              absolute w-10 h-10 bg-white rounded-full shadow-lg
              transition-transform duration-300 ease-in-out
              top-1/2 -translate-y-1/2
              ${mode === 'details' ? 'translate-x-10' : 'translate-x-0'}
            `}/>
            <div className="relative w-full flex justify-between items-center z-10 px-1.5">
              <img
                src="/public/tabheart.svg"
                alt="heart"
                className={`w-7 h-7 transition-all duration-300 ${mode === 'details' ? 'grayscale opacity-60' : ''}`}
              />
              <img
                src="/public/overview.svg"
                alt="overview"
                className={`w-7 h-7 transition-all duration-300 ${mode === 'details' ? '' : 'grayscale opacity-60'}`}
              />
            </div>
          </div>

          {/* Content area */}
          <div className="absolute bottom-32 left-6 right-6 text-white z-10">
            <h1 className="font-alexandria text-3xl leading-tight mb-2">
              {currentMovie.title}
            </h1>
            <div className="font-heebo text-sm mb-4">
              {mode === 'details' ? '' : isFamily ? 'SÉLECTION FAMILLE' : 'TRENDING'}{' '}
              {currentMovie.release_date.split('-')[0]}
            </div>
            {mode === 'details' && (
              <p className="font-heebo text-sm leading-relaxed overflow-y-auto max-h-40">
                {currentMovie.overview}
              </p>
            )}
          </div>

          {/* Action buttons - hidden in details mode */}
          {mode !== 'details' && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default BaseMovieSwiper;