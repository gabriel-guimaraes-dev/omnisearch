import { useState, useEffect } from "react";
import { Header } from "./components/Header.tsx";
import "./App.css";
import { DataGrid } from "./components/DataGrid.tsx";
import { useScrollFades } from '@gboue/use-scroll-fades';
import { Toaster, toast } from 'sonner';
import { GameCardSkeleton } from "./components/GameCardSkeleton.tsx";
import { GameCard } from "./components/GameCard.tsx";
import type { Game } from "./types/game.ts";
import type { Movie } from "./types/movie.ts";
import { MovieCard } from "./components/MovieCard.tsx";

function App() {
  //states for the search, results and loading
  const [searchInput, setSearchInput] = useState("");
  const [games, setGames] = useState<Game[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = "0666540acfe74781948f594def71d327";
  const TMDB_API_KEY = "f9cd4b67e2b047bc325102ec510fb19f"; 
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'games' | 'movies'>('games');
  const { containerRef, getContainerStyle } = useScrollFades({
    fadeSize: 40,
    threshold: 10,
    transitionDuration: 300
  });
  

  useEffect(() => {
    //create the Debounce using setTimeout
    const loadingTime = setTimeout(async () => {

      setLoading(true);

      try {
        setError(null); // Reset error state before making the API call
        let endpoint = '';

        if(activeTab === 'games') {
          endpoint = searchInput.trim() !== '' 
          ? `https://api.rawg.io/api/games?key=${API_KEY}&search=${searchInput}`
          : `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-metacritic&page_size=40`;
          const gameAnswer = await fetch(endpoint);

          if(!gameAnswer.ok) {
            throw new Error("Failed to fetch games");
          }

          const gameData = await gameAnswer.json();
          setGames(gameData.results || []);
        } else {
          endpoint = searchInput.trim() !== ''
          ? `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchInput}`
          : `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`;
          const movieAnswer = await fetch(endpoint);

          if(!movieAnswer.ok) {
            throw new Error("Failed to fetch movies");
          }

          const movieData = await movieAnswer.json();
          setMovies(movieData.results || []);
        }
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
        console.error("Error during search: ", error);

        toast.error("Connection error. Please check your internet connection and try again.");
        setGames([]); // Clear games on error
        setMovies([]); // Clear movies on error
      } finally {
        setLoading(false);
      }
    }, 500); // wait 500ms after user input

    //if the user type any other word before 500ms React cancel the setTimeout
    return () => clearTimeout(loadingTime);
  }, [searchInput, activeTab]); //useEffect start whenever the searchInput change
        
  return (
    <div className="h-screen w-full bg-zinc-950 text-zinc-100 flex flex-col overflow-hidden">
      <Header 
      searchInput={searchInput} 
      onSearchChange={setSearchInput} 
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      />

      <Toaster theme="dark" position="bottom-right" richColors />

      <main  ref={containerRef} 
      style={{ ...getContainerStyle() }} 
      className="flex-1 overflow-y-auto w-full max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'games' ? (

          <DataGrid
          items={games} 
          loading={loading} 
          error={error} 
          skeletonTemplate={<GameCardSkeleton />} 
          renderItem={(game) => <GameCard key={game.id} game={game} />}
          />
        ) : (
          <DataGrid
          items={movies} 
          loading={loading} 
          error={error} 
          skeletonTemplate={<GameCardSkeleton />} 
          renderItem={(movie) => <MovieCard key={movie.id} movie={movie} />}
          />
          )}
      </main>
    </div>
  );
}

export default App;
