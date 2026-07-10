export interface Platform {
    id: number;
    name: string;
    slug: string;
}

export interface ParentPlatform {
    platform: Platform;
}

export interface Genre {
    id: number;
    name: string;
    slug: string;
}

export interface Game {
    id: number;
    name: string;
    background_image: string;
    rating: number;
    metacritic: number | null;
    released: string;
    parent_platform: ParentPlatform[];
    genres: Genre[];
}
