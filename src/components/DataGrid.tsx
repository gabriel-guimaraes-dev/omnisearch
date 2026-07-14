import React from 'react';

export interface DataGridProps<T> {
    items: T[];
    loading: boolean;
    error: string | null;
    emptyMessage?: string;
    renderItem: (item: T) => React.ReactNode;
    skeletonTemplate: React.ReactNode;
}

export function DataGrid<T>({ items, loading, error, renderItem, skeletonTemplate }: DataGridProps<T>) {
    if(loading) {
        return(
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                    <React.Fragment key={index}>
                        {skeletonTemplate}
                    </React.Fragment>
                ))}
            </div>
        );
    }  
    if(error) {
        return(
            <div className="flex justify-center items-center py-20 text-center">
                <h2 className="text-lg text-red-500 font-medium">
                    {error}
                </h2>
            </div>
        );
    }
    if(!loading && items.length === 0){
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
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    {renderItem(item)}
                </React.Fragment>
            ))}
        </div>
    )
}