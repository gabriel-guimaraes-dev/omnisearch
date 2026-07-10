import { useState, useEffect } from "react";
import { Header } from "./components/Header.tsx";
import "./App.css";
import { GameGrid } from "./components/GameGrid.tsx";
import { useScrollFades } from '@gboue/use-scroll-fades';
import { Toaster, toast } from 'sonner';

function App() {
  //states for the search, results and loading
  const [searchInput, setSearchInput] = useState("");
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = "0666540acfe74781948f594def71d327";
  const { containerRef, getContainerStyle } = useScrollFades({
    fadeSize: 40,
    threshold: 10,
    transitionDuration: 300
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //create the Debounce using setTimeout
    const loadingTime = setTimeout(async () => {

      setLoading(true);

      try {
        setError(null); // Reset error state before making the API call

        let endpoint = `https://api.rawg.io/api/games?key=${API_KEY}`;

        if(searchInput.trim() !== "") {
          endpoint += `&search=${searchInput}`;
        } else {
          endpoint += `&ordering=-metacritic&page_size=40`;
        }
        const answer = await fetch(endpoint);

        if(!answer.ok) {
          throw new Error("Failed to fetch games");
        }

        const data = await answer.json();
        setGames(data.results || []);

      } catch (error) {
        setError("Failed to fetch games. Please try again later.");
        console.error("Error to game search: ", error);

        toast.error("Connection error. Please check your internet connection and try again.");
        setGames([]); // Clear games on error

      } finally {
        setLoading(false);
      }
    }, 500); // wait 500ms after user input

    //if the user type any other word before 500ms React cancel the setTimeout
    return () => clearTimeout(loadingTime);
  }, [searchInput]); //useEffect start whenever the searchInput change

  return (
    <div className="h-screen w-full bg-zinc-950 text-zinc-100 flex flex-col overflow-hidden">
      <Header searchInput={searchInput} onSearchChange={setSearchInput} />

      <Toaster theme="dark" position="bottom-right" richColors />

      <main  ref={containerRef} 
      style={{ ...getContainerStyle() }} 
      className="flex-1 overflow-y-auto w-full max-w-7xl mx-auto px-4 py-8">
        <GameGrid games={games} loading={loading} error={error} />
      </main>
    </div>
  );
}

export default App;
