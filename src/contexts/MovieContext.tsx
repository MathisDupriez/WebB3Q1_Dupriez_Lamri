import React, { createContext, useState, useContext, useEffect } from 'react';
import MovieApiService from '../utils/Api/MovieApiService';
import LikeApiService from '../utils/Api/LikeApiService';
import Movie from '../model/Movie';
import { useUser } from './UserContext'; // Importez le contexte utilisateur

interface MovieContextType {
    movies: Movie[];
    currentMovie: Movie | null;
    isLoading: boolean;
    fetchMovies: () => void;
    handleSwipeLeft: () => void;
    handleSwipeRight: () => void;
    toggleFamilyMode: () => void;
    isFamily: boolean;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useUser(); // Récupérer l'utilisateur à partir du UserContext
    const [movies, setMovies] = useState<Movie[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isFamily, setIsFamily] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch movies on component mount or when `isFamily` changes
    useEffect(() => {
        fetchMovies();
    }, [isFamily]);

    useEffect(() => {
        if (currentIndex >= movies.length - 1) {
            fetchMovies();
        }
    }, [currentIndex]);

    const fetchMovies = async () => {
        setIsLoading(true);
        try {
            let newMovies: Movie[] = [];

            if (isFamily && user?.familyId) {
                // Fetch family movies
                newMovies = await MovieApiService.fetchFamilyMovies(user.familyId);
                console.log('Fetched family movies:', newMovies);
            } else {
                // Fetch general movies
                newMovies = await MovieApiService.fetchMovies();
                console.log('Fetched general movies:', newMovies);
            }

            setMovies((prev) => [...prev, ...newMovies]);
            setCurrentPage((prev) => prev + 1);
        } catch (error) {
            console.error('Erreur lors du chargement des films:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSwipeLeft = async () => {
        if (!user) {
            console.error('User not found. Cannot dislike movie.');
            return;
        }
        try {
            const movie = movies[currentIndex];
            if (movie || isFamily) {
                await LikeApiService.createLike(user.id, movie.id, false); // Dislike
                console.log(`Disliked movie: ${movie.title}`);
            }
        } catch (error) {
            console.error('Error disliking the movie:', error);
        } finally {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const handleSwipeRight = async () => {
        if (!user ) {
            console.error('User not found. Cannot like movie.');
            return;
        }
        try {
            const movie = movies[currentIndex];
            if (movie || isFamily) {
                await LikeApiService.createLike(user.id, movie.id, true); // Like
                console.log(`Liked movie: ${movie.title}`);
            }
        } catch (error) {
            console.error('Error liking the movie:', error);
        } finally {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const toggleFamilyMode = () => {
        setIsFamily((prev) => !prev);
        setMovies([]); // Clear movies before fetching new ones
        setCurrentIndex(0);
        setCurrentPage(1);
    };

    const currentMovie = movies[currentIndex] || null;

    return (
        <MovieContext.Provider
            value={{
                movies,
                currentMovie,
                isLoading,
                fetchMovies,
                handleSwipeLeft,
                handleSwipeRight,
                toggleFamilyMode,
                isFamily,
            }}
        >
            {children}
        </MovieContext.Provider>
    );
};

export const useMovieContext = () => {
    const context = useContext(MovieContext);
    if (!context) {
        throw new Error('useMovieContext must be used within a MovieProvider');
    }
    return context;
};
