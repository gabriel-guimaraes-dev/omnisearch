import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSessionCache } from "../useSessionCache";
import { Header } from "../components/Header";
import { DataGrid } from "../components/DataGrid";
import { useScrollFades } from '@gboue/use-scroll-fades';
import { Toaster, toast } from 'sonner';
import { GameCardSkeleton } from "../components/GameCardSkeleton";
import { GameCard } from "../components/GameCard";
import type { Game } from "../types/game";
import type { Movie } from "../types/movie";
import { MovieCard } from "../components/MovieCard";
import { MovieCardSkeleton } from "../components/MovieCardSkeleton";
import { useTitle } from "../hooks/useTitle";

// Define the Home component
export function Home () {
  //states for the search, results and loading 
  const [searchInput, setSearchInput] = useState("");
  const [games, setGames] = useSessionCache<Game[]>('cachedGames', []);
  const [movies, setMovies] = useSessionCache<Movie[]>('cachedMovies', []);
  const API_KEY = "0666540acfe74781948f594def71d327";
  const TMDB_API_KEY = "f9cd4b67e2b047bc325102ec510fb19f"; 
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') === 'movies' ? 'movies' : 'games';
  const [loading, setLoading] = useState(() => {
    if(activeTab === 'games' && games.length > 0) return false;
    if(activeTab === 'movies' && movies.length > 0) return false;
    return true;
  });
  const [page, setPage] = useSessionCache('cachedPage', 1);
  const observerTarget = useRef<HTMLDivElement | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const prevTab = useRef(activeTab);
  const prevSearch = useRef(searchInput);
  const prevPage = useRef(page);
  const { containerRef, getContainerStyle } = useScrollFades({
    fadeSize: 40,
    threshold: 10,
    transitionDuration: 300
  });
  
  
  // useEffect to handle the search input and fetch data from the APIs and Debounce the search input to avoid too many API calls
  useEffect(() => {
    const isRealUserAction = prevSearch.current !== searchInput || prevPage.current !== page; // Check if the search input or page number has changed

    prevSearch.current = searchInput; // Update the previous search input
    prevPage.current = page;// Update the previous page number

    if(!isRealUserAction) {
      if((activeTab === 'games' && games.length > 0) || (activeTab === 'movies' && movies.length > 0)) {
        setLoading(false);
        return;
      }
    } // If the search input or page number has not changed, do not fetch data

    setLoading(true);
    
    //create the Debounce using setTimeout
    const loadingTime = setTimeout(async () => {

      try {
        setError(null); // Reset error state before making the API call
        let endpoint = '';

        if(activeTab === 'games') {
          endpoint = searchInput.trim() !== '' 
          ? `https://api.rawg.io/api/games?key=${API_KEY}&search=${searchInput}&page=${page}`
          : `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-metacritic&page=${page}`;

          const gameAnswer = await fetch(endpoint);

          if(!gameAnswer.ok) {
            throw new Error("Failed to fetch games");
          }

          const gameData = await gameAnswer.json();

          if (gameData.results?.length === 0) {
            setHasMore(false);
          } 

          setGames((prev) => {
          if (page === 1) return gameData.results || [];
          return [...prev, ...(gameData.results || [])];
          }); 
          
        } else {
          endpoint = searchInput.trim() !== ''
          ? `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchInput}&page=${page}`
          : `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`;

          const movieAnswer = await fetch(endpoint);

          if(!movieAnswer.ok) {
            throw new Error("Failed to fetch movies");
          }

          const movieData = await movieAnswer.json();
          if (movieData.results?.length === 0) {
            setHasMore(false);
          }

          setMovies((prev) => {
            if (page === 1) return movieData.results || [];
            return [...prev, ...(movieData.results || [])];
          });

        }
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
        console.error("Error during search: ", error);

        toast.error("Connection error. Please check your internet connection and try again.");
        setGames([]); // Clear games on error
        setMovies([]); // Clear movies on error
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    }, 500); // wait 500ms after user input

    //if the user type any other word before 500ms React cancel the setTimeout
    return () => clearTimeout(loadingTime);
  }, [searchInput, activeTab, page]); //useEffect start whenever the searchInput change

  //useEffect to reset the page number when the search input or active tab changes
  useEffect(() => {
    if (prevTab.current === activeTab) {
      return;
    }
    prevTab.current = activeTab;  

    setPage(1); // Reset the page number to 1
    setGames([]); // Reset the games array
    setMovies([]); // Reset the movies array
    setHasMore(true); 
    document.getElementById('main-scroll')?.scrollTo(0, 0); // Scroll to the top of the page
  }, [activeTab]);

  const blockObserver = useRef(true);

  //useEffect to handle infinite scrolling
  useEffect(() => {
    setTimeout(() => {
      blockObserver.current = false;
    }, 500);
  
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !blockObserver.current) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    ); // Create an IntersectionObserver to observe the intersection of the observerTarget with the threshold of 1.0

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [loading]);

  // useLayoutEffect to handle the scroll position
  useLayoutEffect(() => {
    const scrollContainer = document.getElementById('main-scroll');
    const savedScroll = sessionStorage.getItem('scrollPos');

    if (savedScroll && scrollContainer) {
      scrollContainer.scrollTo({
        top: parseInt(savedScroll),
        behavior: 'instant'
      });
    } 
  }, []);

  useTitle("Omnisearch | Search for games and movies");
        
  return (
    <div className="h-screen w-full bg-zinc-950 text-zinc-100 flex flex-col overflow-hidden">
      <Header 
      searchInput={searchInput} 
      onSearchChange={setSearchInput} 
      /> {/* Header component */}

      <Toaster theme="dark" position="bottom-right" richColors /> {/* Toaster component */}

      {/* control with page is active and the content*/}
      <main 
      id="main-scroll"
      ref={containerRef} 
      style={{ ...getContainerStyle() }} 
      className="flex-1 overflow-y-auto w-full max-w-7xl mx-auto px-4 py-8"
      onScroll={(e) => sessionStorage.setItem('scrollPos', e.currentTarget.scrollTop.toString())}>
        {activeTab === 'games' ? (
          <DataGrid
          items={games} 
          loading={loading} 
          error={error} 
          emptyMessage="Not found any Game with this description"
          skeletonTemplate={<GameCardSkeleton />} 
          renderItem={(game) => <GameCard key={game.id} game={game} />}
          />
        ) : (
          <DataGrid
          items={movies} 
          loading={loading} 
          error={error} 
          emptyMessage="Not found any Movie with this description"
          skeletonTemplate={<MovieCardSkeleton />} 
          renderItem={(movie) => <MovieCard key={movie.id} movie={movie} />}
          />)}
        
        {hasMore && !error && (
          <div ref={observerTarget} className="h-10 w-full"></div>
        )}
      </main>
    </div>
  );
}
