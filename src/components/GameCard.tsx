import type { Game } from '../types/game';

interface GameCardProps {
    game: Game;
}

export function GameCard({ game }: GameCardProps) {
    const releaseYear = game.released
        ? new Date(game.released).getFullYear()
        : 'N/A';
    
    const getMetacriticColor = (score: number) => {
        if(score >= 75) return 'bg-green-500/10 text-green-400 border-green-500/20';
        if(score >= 50) return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
        return 'bg-red-500/10 text-red-400 border-red-500/20';
    };

    return (
        <article className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-zinc-700 transition-all duration-300 flex flex-col h-full group">
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

            <div className="p-4 flex flex-col grow justify-between gap-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                        <span className="text-xs text-zinc-400 font-medium truncate max-w-[75%]" title={game.parent_platform?.map(p => p.platform.name).join(', ')}>
                            {game.parent_platform
                                ?.map((p) => p.platform.name)
                                .join(', ') || 'PC / Consoles'}
                        </span>
                        {game.metacritic && (
                            <span className={`px-1.5 py-0.5 text-xs font-bold border rounded ${getMetacriticColor(game.metacritic)}`}>
                                {game.metacritic}
                            </span>
                        )}
                    </div>
                    
                    <h3 className="text-base font-bold text-zinc-100 line-clamp-2 group-hover:text-violet-400 transition-colors duration-200">
                        {game.name} <span className="text-xs font-normal text-zinc-500">({releaseYear})</span>
                    </h3>
                </div>
            
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-900">
                    {game.genres?.slice(0, 2).map((genre) => (
                        <span  
                            key={genre.id}
                            className="px-2 py-0.5 text-[10px] font0semibold bg-zinc-900 text-zinc-400 rounded-md border border-zinc-800">
                                {genre.name}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    )
}
