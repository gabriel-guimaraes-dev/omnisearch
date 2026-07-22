import type { Game } from '../types/game';
import { Link } from 'react-router-dom';
import {  useFavorites } from '../contexts/FavoritesContext';

// Define the GameCard component
interface GameCardProps {
    game: Game;
}

// Define the GameCard component
export function GameCard({ game }: GameCardProps) {
    // get the year of the release date
    const releaseYear = game.released
        ? new Date(game.released).getFullYear()
        : 'N/A';
    
    // get the metacritic color based on the score
    const getMetacriticColor = (score: number) => {
        if(score >= 75) return 'bg-green-500/10 text-green-400 border-green-500/20';
        if(score >= 50) return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
        return 'bg-red-500/10 text-red-400 border-red-500/20';
    };

    // use the favorites context to toggle the favorite state
    const {toggleFavoriteGame, isGameFavorite} = useFavorites();

    return (
        <Link to={`/game/${game.id}`} className="group relative flex flex-col rounded-md border border-zinc-800 bg-zinc-900 p-4 shadow-sm hover:shadow-lg transition-shadow duration-200">

            {/* favorite button */}
            <button
                onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavoriteGame(game)}}
                className={`absolute z-10 top-4 right-4 h-8 w-8 rounded-full flex items-center justify-center transition-colors duration-200 ${isGameFavorite(game) ? 'bg-red-500' : 'bg-zinc-900'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
            </button>

            {/* cover image */}
            <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
                {game.background_image ? (
                    <img
                        src={game.background_image}
                        alt={`Thumbnail of ${game.name}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">
                        Game Without Thumbnail
                    </div>
                )}
            </div>

            {/* platform and metacritic rating */}
            <div className="p-4 flex flex-col grow justify-between gap-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-zinc-400 font-medium truncate max-w-[75%]" title={game.parent_platforms?.map(p => p.platform.name).join(', ')}>
                            {game.parent_platforms
                                ?.map((p) => p.platform.name)
                                .join(', ') || 'PC / Consoles'}
                        </span>
                        {game.metacritic && (
                            <span className={`px-1.5 py-0.5 text-xs font-bold border rounded ${getMetacriticColor(game.metacritic)}`}>
                                {game.metacritic}
                            </span>
                        )}
                    </div>
                    
                    {/* title of the game */}
                    <h3 className="text-base font-bold text-zinc-100 line-clamp-2 group-hover:text-violet-400 transition-colors duration-200">
                        {game.name} <span className="text-xs font-normal text-zinc-500">({releaseYear})</span>
                    </h3>
                </div>
                
                {/* genres */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-900">
                    {game.genres?.slice(0, 2).map((genre) => (
                        <span  
                            key={genre.id}
                            className="px-2 py-0.5 text-[10px] font-semibold bg-zinc-900 text-zinc-400 rounded-md border border-zinc-800">
                                {genre.name}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    )
}
