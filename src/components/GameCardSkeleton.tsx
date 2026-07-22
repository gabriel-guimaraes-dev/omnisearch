export function GameCardSkeleton() {

    // Return a skeleton component for a game card
    return (
        <article className="group relative flex flex-col rounded-md border border-zinc-800 bg-zinc-900 p-4 shadow-sm animate-pulse h-full">
            {/* cover image */}
            <div className="relative aspect-video w-full overflow-hidden bg-zinc-800">
                
            </div>
            <div className="p-4 flex flex-col grow justify-between gap-4">
                {/* platform and metacritic rating */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                        <div className="bg-zinc-700 h-6 w-8 rounded"></div>
                        <div className="bg-zinc-700 h-6 w-8 rounded"></div>
                    </div>
                    
                    {/* title of the game */}
                    <div className="bg-zinc-700 h-4 w-3/4 rounded mt-2"></div>
                </div>

                {/* genres */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-900">
                    <div className="bg-zinc-700 h-6 w-16 rounded"></div>
                    <div className="bg-zinc-700 h-6 w-16 rounded"></div>
                </div>
            </div>
        </article>
    )}
