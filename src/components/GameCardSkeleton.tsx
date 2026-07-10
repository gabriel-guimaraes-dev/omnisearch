export function GameCardSkeleton() {
    return (
        <article className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-lg flex flex-col h-full group animate-pulse">
            <div className="relative aspect-video w-full overflow-hidden bg-zinc-800">
                
            </div>
            <div className="p-4 flex flex-col grow justify-between gap-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                        <div className="bg-zinc-700 h-6 w-8 rounded"></div>
                        <div className="bg-zinc-700 h-6 w-8 rounded"></div>
                    </div>
                    
                    <div className="bg-zinc-700 h-4 w-3/4 rounded"></div>
                </div>
            
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-900">
                    <div className="bg-zinc-700 h-6 w-16 rounded"></div>
                    <div className="bg-zinc-700 h-6 w-16 rounded"></div>
                </div>
            </div>
        </article>
    )}