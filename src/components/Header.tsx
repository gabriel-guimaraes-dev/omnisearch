// HEADERBAR WITH THE NAME OF THE PAGE
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

// Define the Header component
type searchProps = {
  searchInput: string,
  onSearchChange: (newSearch: string) => void,
};

// Define the Header component
export function Header({ searchInput, onSearchChange }: searchProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') === 'movies' ? 'movies' : 'games';

  const headerStyle = `
    flex 
    flex-col
    gap-4
    md:flex-row 
    md:justify-between
    justify-between 
    items-center 
    px-8 py-4 
    bg-zinc-900 
    border-b 
    border-zinc-800
  `;

  const inputStyle = `
      w-full 
      px-4 
      py-2
      bg-gray-800 
      text-white
      border 
      border-gray-600 
      rounded-lg
      transition-all 
      duration-300
      focus:outline-none
      focus:border-blue-500
      focus:ring-2
      focus:ring-blue-500/50
      max-h-8
      md:w-96
    `;

    // Handle tab change
    const handleTabChange = (newTab: 'games' | 'movies') => {
        setSearchParams({ tab: newTab });
      }

  return (
    <div className={headerStyle}>
      <img src="/logo.png" alt="Omnisearch logo" className="h-10 w-auto object-contain origin-center md:origin-left shrink-0  scale-[2] md:scale-[2.5]"/>

      {/* Search input */}
      <div>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
          className={inputStyle}
          placeholder={activeTab === 'games' ? 'Search for games...' : 'Search for movies...'}
        />
      </div>

      {/* Tabs for switching between games and movies */}
      <div className="flex gap-2 w-full justify-center md:w-auto">

        {/* Favorites tab */}
        <Link to="/favorites" className="px-4 py-2 rounded-lg transition-colors duration-300 font-medium 
        ${activeTab === 'favorites' 
        ? 'bg-zinc-400 hover:bg-zinc-300 text-white' 
        : 'bg-transparent text-zinc-400 hover:text-zinc-100'}">
          Favorites
        </Link>

        {/* Games tab */}
        <button type="button" 
        onClick={() => {
          handleTabChange('games');
          onSearchChange(''); // Clear the search input when switching tabs
        }}
        className={`px-4 py-2 cursor-pointer rounded-lg transition-colors duration-300 font-medium
          ${activeTab === 'games' 
        ? 'bg-zinc-400 hover:bg-zinc-300 text-white' 
        : 'bg-transparent text-zinc-400 hover:text-zinc-100'}`}>
          Games
        </button>

        {/* Movies tab */}
        <button type="button" 
        onClick={() => {
          handleTabChange('movies');
          onSearchChange(''); // Clear the search input when switching tabs
        }} 
        className={`px-4 py-2 cursor-pointer rounded-lg transition-colors duration-300 font-medium 
          ${activeTab === 'movies' 
        ? 'bg-zinc-400 hover:bg-zinc-300 text-white' 
        : 'bg-transparent text-zinc-400 hover:text-zinc-100'}`}>
          Movies
        </button>
      </div>
    </div>
  );
}
