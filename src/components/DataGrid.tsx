import React from 'react';


export interface DataGridProps<T> {
    items: T[];
    loading: boolean;
    error: string | null;
    emptyMessage?: string | null;
    renderItem: (item: T) => React.ReactNode;
    skeletonTemplate: React.ReactNode;
}

export function DataGrid<T>({ items, loading, error, renderItem, skeletonTemplate, emptyMessage }: DataGridProps<T>) {
    {/* if there is an error, display it */}
    if(error) {
        return(
            <div className="flex justify-center items-center py-20 text-center">
                <h2 className="text-lg text-red-500 font-medium">
                    {error}
                </h2>
            </div>
        );
    }

    {/* if loading, display skeleton */}
    if(loading && items.length === 0) {
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

    {/* if there are no items, display an empty message */}
    if(!loading && items.length === 0){
        return(
            <div className="flex justify-center items-center py-20 text-center">
                <h2 className="text-lg text-zinc-500 font-medium">
                    {emptyMessage || 'No items found.'}
                </h2> 
            </div>
        );
    }
    
    {/* if there are items, display them */}
    return(
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        {renderItem(item)}
                    </React.Fragment>
                ))}
        

                {loading && items.length > 0 &&  Array.from({ length: 4 }).map((_, index) => (
                    <React.Fragment key={`loading-more-${index}`}>
                        {skeletonTemplate}
                    </React.Fragment>
                ))}
            </div>
        </>
    )
}