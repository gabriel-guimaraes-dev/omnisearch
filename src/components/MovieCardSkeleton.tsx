export function MovieCardSkeleton() {
    return (
        <article className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-lg flex flex-col h-full group animate-pulse">
            {/* cover image */}
            <div className="relative aspect-2/3 w-full overflow-hidden bg-zinc-800"></div>
            
            <div className="p-4 flex flex-col grow justify-between gap-4">
                {/* metacritic rating */}
                <div className="bg-zinc-700 h-8 w-12 rounded"></div>
                    
                {/* title of the movie */}
                <div className="bg-zinc-700 h-6 w-3/4 rounded"></div>

                {/* overview of the movie */}
                <div className="bg-zinc-700 h-10 w-3/4 rounded"></div>
                    
            </div>
        </article>
    )}
