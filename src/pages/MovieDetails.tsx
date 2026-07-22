import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";
import { useTitle } from "../hooks/useTitle";

// Define the MovieDetails component
export function MovieDetails() {
    const { id } = useParams(); // Use the useParams hook to get the movie ID from the URL
    const [movie, setMovie] = useState<Movie | null>(null); // State to store the movie data
    const [loading, setLoading] = useState(true); // State to indicate if the movie data is loading
    const [error, setError] = useState<string | null>(null); // State to store any error message
    const TMDB_API_KEY = "f9cd4b67e2b047bc325102ec510fb19f";
    const navigate = useNavigate(); // Use the useNavigate hook to navigate to the previous page

    useTitle(`Omnisearch: | ${movie?.title}`);

    // Fetch the movie data from the TMDB API
    useEffect(() => {
        async function fetchMovie() {
            try {
                setLoading(true);
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=videos`);
                const data = await response.json();
                setMovie(data);
                console.log("Movie fetched successfully:", data);
            } catch (error) {
                console.error("Error fetching movie:", error);
                setError("Failed to fetch Movie. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            fetchMovie();
        }
    }, [id]);

    if(loading) {
        return(
            <div className="h-screen w-full bg-zinc-950 text-white flex flex-col items-center justify-center">
                <p className="text-xl font-bold animate-pulse text-violet-500">Loading... </p>
            </div>
        );
    }  

    // if there is an error, display it
    if(error) {
        return(
            <div className="flex justify-center items-center py-20 text-center">
                <h2 className="text-lg text-red-500 font-medium">
                    {error}
                </h2>
            </div>
        );
    }

    if(!movie) return null;

    // get the year of the release date
    const releaseYear = movie.release_date
        ? new Date(movie.release_date).getFullYear()
        : 'N/A';
    
    // get the metacritic color based on the score
    const getAverageColor = (score: number) => {
        if(score >= 7) return 'bg-green-500/10 text-green-400 border-green-500/20';
        if(score >= 5) return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
        return 'bg-red-500/10 text-red-400 border-red-500/20';
    };

    // Find the trailer video from the movie data
    const trailer = movie.videos?.results?.find(
        (vid: any) => vid.type === 'Trailer' && vid.site === 'YouTube'
    );

    return (
        <div className="min-h-screen w-full bg-zinc-950 text-white flex flex-col items-center justify-center p-8">
            <button type="button" className="fixed top-4 left-8 p-2 rounded-full bg-zinc-900 text-zinc-50 hover:bg-zinc-800 transition-colors duration-200" onClick={() => navigate(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 12l7.5 7.5L15.75 6" />
                </svg>
            </button> {/* Return to the previous page button */}

            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`Movie cover of ${movie.title}`}
                className="w-full max-w-4xl h-96 object-cover rounded-2xl shadow-xl"
            /> {/* Movie cover image */}

            {/* Movie title, vote average, release year and trailer */}
            <div className="w-full max-w-4xl p-4 mt-6">
                <h1 className="text-5xl font-bold text-zinc-100">{movie.title}</h1>
                <p className="text-lg text-zinc-500">
                    {releaseYear}
                </p>
                {movie.vote_average && (
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-lg text-zinc-500">Vote Average:</span>
                        <span className={`px-2 py-1 text-sm font-bold border rounded ${getAverageColor(movie.vote_average)}`}>
                            {movie.vote_average}
                        </span>
                    </div>
                )}
                {movie.overview && (
                    <p className="text-lg text-zinc-500">
                        {movie.overview}
                    </p>
                )}
                {trailer && (
                    <div className="mt-8 aspect-video w-full rounded-2xl overflow-hidden shadow-2xl">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                )}
            </div>
        </div>      
    )
}
