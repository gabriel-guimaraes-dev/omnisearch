import { useFavorites } from '../contexts/FavoritesContext';
import { GameCard } from '../components/GameCard';
import { MovieCard } from '../components/MovieCard';
import { Link } from 'react-router-dom';
import { useTitle } from '../hooks/useTitle';

export default function Favorites() {
    const {FavoritesGames, FavoritesMovies} = useFavorites();
    const isListEmpty = FavoritesGames.length === 0 && FavoritesMovies.length === 0;

    useTitle("Omnisearch | Favorites");

    return (
        // create a page with a header and a grid of games and movies
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            <header className="flex items-center px-8 py-4 bg-zinc-900 border-b border-zinc-800">
                <Link to="/" className="text-xl font-bold text-white hover:text-zinc-300 transition-colors">
                    Ominisearch
                </Link>
                <span className="ml-4 text-sm text-zinc-400 font-medium border-l border-zinc-700 pl-4">
                    Favorites
                </span>
            </header>

            <div className="flex flex-col gap-4 p-4">
                {isListEmpty ? (
                    <div className="flex flex-col items-center justify-center gap-4 p-4">
                        <h1 className="text-2xl font-bold text-zinc-100">Favorites</h1>
                        <p className="text-xs text-zinc-400">
                            You have no favorites yet.
                        </p>
                    </div>
                ) : (
                    <div>

                        { FavoritesGames.length > 0 && (
                            <div className="flex flex-col items-center justify-between gap-4">
                                <h1 className="text-2xl font-bold text-zinc-100">Favorite Games</h1>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {FavoritesGames.map((game) => (
                                        <GameCard key={game.id} game={game} />
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {FavoritesMovies.length > 0 && (
                            <div className="flex flex-col items-center justify-between gap-4">
                                <h1 className="text-2xl font-bold text-zinc-100">Favorite Movies</h1>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {FavoritesMovies.map((movie) => (
                                        <MovieCard key={movie.id} movie={movie} />
                                    ))}
                                </div>
                            </div> 
                        )}
                    </div>
                )}  
            </div>
        </div>
    )
}
