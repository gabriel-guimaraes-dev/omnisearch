import type { Game } from '../types/game';
import { GameCard } from './GameCard';
import { GameCardSkeleton } from './GameCardSkeleton';

interface GameGridProps {
    games: Game[];
    loading: boolean;
}

export function GameGrid({ games, loading }: GameGridProps) {
    if(loading) {
        return(
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, index) => (
                    <GameCardSkeleton key={index} />
                ))}
            </div>
        );
    }  
    if(!loading && games.length === 0){
        return(
            <div className="flex justify-center items-center py-20 text-center">
                <h2 className="text-lg text-zinc-500 font-medium">
                    Not found any Game with this description
                </h2>
            </div>
        );
    }

    return(
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {games.map((game) => (
                <GameCard key={game.id} game={game} />
            ))}
        </div>
    )
}