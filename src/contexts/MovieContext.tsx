import React, { createContext, useState, useContext, useEffect } from 'react';
import MovieApiService from '../utils/Api/MovieApiService';
import Movie from '../model/Movie';

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
    const [movies, setMovies] = useState<Movie[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isFamily, setIsFamily] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchMovies();
    }, []);

    useEffect(() => {
        if (currentIndex >= movies.length - 1) {
        fetchMovies();
        }
    }, [currentIndex]);

    const fetchMovies = async () => {
        setIsLoading(true);
        try {
        const newMovies = isFamily
            ? await MovieApiService.fetchFamilyMovies(currentPage)
            : await MovieApiService.fetchMovies();
        setMovies((prev) => [...prev, ...newMovies]);
        setCurrentPage((prev) => prev + 1);
        } catch (error) {
        console.error('Erreur lors du chargement des films:', error);
        } finally {
        setIsLoading(false);
        }
    };

    const handleSwipeLeft = () => {
        setCurrentIndex((prev) => prev + 1);
    };

    const handleSwipeRight = () => {
        setCurrentIndex((prev) => prev + 1);
    };

    const toggleFamilyMode = () => {
        setIsFamily((prev) => !prev);
        setMovies([]);
        setCurrentIndex(0);
        setCurrentPage(1);
        fetchMovies();
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
