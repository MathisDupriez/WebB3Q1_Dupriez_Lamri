import React, { forwardRef } from 'react';
import '../styles/movieCard.sass';
import '../styles/familyMovieCard.sass';

interface familyMovieCardProps {
    title: string;
    releaseDate: string;
    posterPath: string;
    likesCount: number;
}

const FamilyMovieCard = forwardRef<HTMLImageElement, familyMovieCardProps>(
    ({ title, releaseDate, posterPath, likesCount }, ref) => {
        const year = new Date(releaseDate).getFullYear();
        const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

        return (
            <div className="movie-card family-mode">
                <div className="like-counter">❤️ {likesCount}</div>

                <div className="image-container">
                    <img 
                        ref={ref}
                        className="poster-image" 
                        src={posterUrl}
                        alt={title}
                    />
                </div>
                
                <div className="content-wrapper">
                    <div className="movie-info">
                        <h1 className="movie-title">{title}</h1>
                        <div className="movie-meta">
                            {year}
                        </div>
                    </div>

                    <div className="family-instructions">
                        Swipez à droite si tout le monde est d'accord !
                    </div>
                </div>"
            </div>
        );
    }
);

export default FamilyMovieCard;



