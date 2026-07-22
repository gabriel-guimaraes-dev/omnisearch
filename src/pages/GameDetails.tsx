import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Game } from "../types/game";
import { useTitle } from "../hooks/useTitle";

// Define the GameDetails component
export function GameDetails() {
    const { id } = useParams(); // Use the useParams hook to get the game ID from the URL
    const [game, setGame] = useState<Game | null>(null); // State to store the game data
    const [trailerUrl, setTrailerUrl] = useState<string | null>(null); // State to store the trailer URL
    const [loading, setLoading] = useState(true);   // State to indicate if the game data is loading
    const [error, setError] = useState<string | null>(null); // State to store any error message
    const API_KEY = "0666540acfe74781948f594def71d327";
    const navigate = useNavigate(); // Use the useNavigate hook to navigate to the previous page

    useTitle(`Omnisearch | ${game?.name}`);

    // Fetch the game data from the Rawg API
    useEffect(() => {
        async function fetchGame() {            
            try {
                setLoading(true);
                const [gameResponse, movieResponse] = await Promise.all([
                    fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`),
                    fetch(`https://api.rawg.io/api/games/${id}/movies?key=${API_KEY}`)
                ]);
                const gameData = await gameResponse.json();
                const movieData = await movieResponse.json();
                setGame(gameData);

                if(movieData.results && movieData.results.length > 0) {
                    setTrailerUrl(movieData.results[0].data.max);
                }

                console.log("Game fetched successfully:", gameData);
            } catch (error) {
                console.error("Error fetching game data:", error);
                setError("Failed to fetch game. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            fetchGame();
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

    if(!game) return null;

    // get the year of the release date
    const releaseYear = game.released
        ? new Date(game.released).getFullYear()
        : 'N/A';
    
    // get the metacritic color based on the score
    const getMetacriticColor = (score: number) => {
        if(score >= 75) return 'bg-green-500/10 text-green-400 border-green-500/20';
        if(score >= 50) return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
        return 'bg-red-500/10 text-red-400 border-red-500/20';
    };

    return (
        <div className="min-h-screen w-full bg-zinc-950 text-white flex flex-col items-center justify-center p-8">
            <button type="button" className="fixed top-4 left-8 p-2 rounded-full bg-zinc-900 text-zinc-50 hover:bg-zinc-800 transition-colors duration-200" onClick={() => navigate(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 12l7.5 7.5L15.75 6" />
                </svg>
            </button> {/* Return to the previous page button */}

            <img
                src={game.background_image}
                alt={`Game cover of ${game.name}`}
                className="w-full max-w-4xl h-96 object-cover rounded-2xl shadow-xl"
            /> {/* Game cover image */}

            {/* Game name genre platforms release year sinopse and trailer */}
            <div className="w-full max-w-4xl p-4 mt-6">
                <h1 className="text-5xl font-bold text-zinc-100">{game.name}</h1>
                 <p className="text-lg text-zinc-500">
                    {game.genres?.slice(0, 2).map((genre) => genre.name).join(', ')}
                </p>
                <p className="text-lg text-zinc-500">
                    {game.parent_platforms?.map(p => p.platform.name).join(', ')}
                </p>
                <p className="text-lg text-zinc-500">
                    {releaseYear}
                </p>
                {game.metacritic && (
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-lg text-zinc-500">Metacritic:</span>
                        <span className={`px-2 py-1 text-sm font-bold border rounded ${getMetacriticColor(game.metacritic)}`}>
                            {game.metacritic}
                        </span>
                    </div>
                )}
                {(game as any).description_raw && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-zinc-100 mb-4">About the Game</h2>
                        <p className="text-lg text-zinc-400 leading-relaxed">
                            {game.description_raw}
                        </p>
                    </div>
                )}
                {trailerUrl && (
                    <div className="mt-10 mb-10 w-full rounded-2xl overflow-hidden shadow-2xl bg-zinc-900 p-2">
                        <h2 className="text-2xl font-bold text-zinc-100 mb-4 px-2">Trailer</h2>
                        <video
                            controls
                            className="w-full aspect-video rounded-xl object-cover"
                            src={trailerUrl}
                            poster={game.background_image}
                        >
                        Your browser does not support the video tag.
                        </video>
                    </div>
                )}
            </div>
        </div>      
    )
}