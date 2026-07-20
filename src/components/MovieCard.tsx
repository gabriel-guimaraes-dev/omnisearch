import type { Movie } from '../types/movie';
import { Link } from 'react-router-dom';

interface MovieCardProps {
    movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
    // get the year of the release date
    const releaseYear = movie.release_date
        ? new Date(movie.release_date).getFullYear()
        : 'N/A';
    
    // get the metacritic color based on the score
    const getMetacriticColor = (score: number) => {
        if(score >= 7) return 'bg-green-500/10 text-green-400 border-green-500/20';
        if(score >= 5) return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
        return 'bg-red-500/10 text-red-400 border-red-500/20';
    };

    return (
        // create a card with a poster, title, and overview
        <Link to={`/movie/${movie.id}`} className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-zinc-700 transition-all duration-300 flex flex-col h-full group">
            <div className="relative aspect-2/3 w-full overflow-hidden bg-zinc-900">
                {movie.poster_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={`Thumbnail of ${movie.title}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 bg-zinc-900"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">
                        Movie poster not available.
                    </div>
                )}
            </div>

            <div className="p-4 flex flex-col grow justify-between gap-4">
                <div className="space-y-2">
                    {/* metacritic rating */}
                    <div className="flex items-center justify-between gap-2">
                        {movie.vote_average && (
                            <span className={`px-1.5 py-0.5 text-xs font-bold border rounded ${getMetacriticColor(movie.vote_average)}`}>
                                {movie.vote_average}
                            </span>
                        )}
                    </div>
                    
                    {/* title of the movie */}
                    <h3 className="text-base font-bold text-zinc-100 line-clamp-2 group-hover:text-violet-400 transition-colors duration-200">
                        {movie.title} <span className="text-xs font-normal text-zinc-500">({releaseYear})</span>
                    </h3>
                    {/* overview of the movie */}
                    <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                        {movie.overview || 'No overview available.'}
                    </p>
                </div>
            </div>
        </Link>
    )
}