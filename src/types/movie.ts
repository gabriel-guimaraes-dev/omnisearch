// Define the shape of a movie object
export interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    vote_average: number;
    release_date: string;
    overview: string;
    videos?: {
        results: {
            key: string;
            site: string;
            type: string;
        }[];
    };
}