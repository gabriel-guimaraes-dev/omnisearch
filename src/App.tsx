import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { GameDetails } from "./pages/GameDetails";
import { MovieDetails } from "./pages/MovieDetails";
import  Favorites  from "./pages/Favorites";
import { NotFound } from "./pages/NotFound";

// Define the routes for the application
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/game/:id" element={<GameDetails />} /> 
      <Route path="/movie/:id" element={<MovieDetails />} /> 
      <Route path="/favorites" element={<Favorites />} /> 
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
