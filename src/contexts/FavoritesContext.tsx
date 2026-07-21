import { createContext, useState, useEffect } from "react";
import type { Game } from "../types/game";
import type { Movie } from "../types/movie";
import React from "react";

interface FavoritesContextData {
    FavoritesGames: Game[];
    FavoritesMovies: Movie[];
    toggleFavoriteGame: (game: Game) => void;
    toggleFavoriteMovie: (movie: Movie) => void;
    isGameFavorite: (game: Game) => boolean;
    isMovieFavorite: (movie: Movie) => boolean;
    removeFavoriteGame: (game: Game) => void;
    removeFavoriteMovie: (movie: Movie) => void;
}

const FavoritesContext = createContext<FavoritesContextData | undefined>(undefined);

export function FavoritesContextProvider ({children}: {children: React.ReactNode}) {
    const [FavoritesGames, setFavoritesGames] = useState<Game[]>(() => {
       const storedGames = localStorage.getItem('omnisearch-fav-games');
       return storedGames ? JSON.parse(storedGames) : [];
    });

    const [FavoritesMovies, setFavoritesMovies] = useState<Movie[]>(() =>{
        const storedMovies = localStorage.getItem('omnisearch-fav-movies');
        return storedMovies ? JSON.parse(storedMovies) : [];
    });

    const toggleFavoriteGame = (game: Game) => {
        setFavoritesGames(prev => {
            const existingGame = prev.some(item => item.id === game.id);
            if (existingGame) {
                return prev.filter(item => item.id !== game.id);
            }
            return [...prev, game];
        });
    };

    const toggleFavoriteMovie = (movie: Movie) => {
        setFavoritesMovies(prev => {
            const existingMovie = prev.some(item => item.id === movie.id);
            if (existingMovie) {
                return prev.filter(item => item.id !== movie.id);
            }
            return [...prev, movie];
        });
    };

    const isGameFavorite = (game: Game) => {
        return FavoritesGames.some(item => item.id === game.id);
    };

    const isMovieFavorite = (movie: Movie) => {
        return FavoritesMovies.some(item => item.id === movie.id);
    };

    const removeFavoriteGame = (game: Game) => {
        setFavoritesGames(FavoritesGames.filter(item => item.id !== game.id));
    };

    const removeFavoriteMovie = (movie: Movie) => {
        setFavoritesMovies(FavoritesMovies.filter(item => item.id !== movie.id));
    };

    useEffect(() => {
        localStorage.setItem('omnisearch-fav-games', JSON.stringify(FavoritesGames));
    }, [FavoritesGames]);

    useEffect(() => {
        localStorage.setItem('omnisearch-fav-movies', JSON.stringify(FavoritesMovies));
    }, [FavoritesMovies]);

    return (
        <FavoritesContext.Provider value={{
            FavoritesGames,
            FavoritesMovies,
            toggleFavoriteGame,
            toggleFavoriteMovie,
            isGameFavorite,
            isMovieFavorite,
            removeFavoriteGame,
            removeFavoriteMovie
        }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = React.useContext(FavoritesContext);
    if(!context) {
        throw new Error("useFavorites must be used within a FavoritesContextProvider");
    }
    return context;
}
