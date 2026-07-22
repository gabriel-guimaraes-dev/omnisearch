// Define the shape of a game object
export interface Platform {
    id: number;
    name: string;
    slug: string;
}

// Define the shape of a parent platform object
export interface ParentPlatform {
    platform: Platform;
}

//  Define the shape of a genre object
export interface Genre {
    id: number;
    name: string;
    slug: string;
}

// Define the shape of a game object
export interface Game {
    id: number;
    name: string;
    background_image: string;
    rating: number;
    metacritic: number | null;
    released: string;
    parent_platforms: ParentPlatform[];
    genres: Genre[];
    description_raw?: string;
}
