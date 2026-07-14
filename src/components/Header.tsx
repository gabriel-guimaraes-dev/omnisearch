// HEADERBAR WITH THE NAME OF THE PAGE
type searchProps = {
  searchInput: string,
  onSearchChange: (newSearch: string) => void,
  activeTab: 'games' | 'movies',
  setActiveTab: (tab: 'games' | 'movies') => void,
};

export function Header(props: searchProps) {
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

  return (
    <div className={headerStyle}>
      <div>
        <h1>Omnisearch</h1>
      </div>

      <div>
        <input
          type="text"
          value={props.searchInput}
          onChange={(e) => props.onSearchChange(e.target.value)}
          className={inputStyle}
          placeholder={props.activeTab === 'games' ? 'Search for games...' : 'Search for movies...'}
        />
      </div>

      <div className="flex gap-2 w-full justify-center md:w-auto">
        <button type="button" 
        onClick={() => {
          props.setActiveTab('games');
          props.onSearchChange(''); // Clear the search input when switching tabs
        }}
        className={`px-4 py-2 rounded-lg transition-colors duration-300 font-medium 
          ${props.activeTab === 'games' 
        ? 'bg-zinc-400 hover:bg-zinc-300 text-white' 
        : 'bg-transparent text-zinc-400 hover:text-zinc-100'}`}>
          Games
        </button>

        <button type="button" 
        onClick={() => {
          props.setActiveTab('movies');
          props.onSearchChange(''); // Clear the search input when switching tabs
        }} 
      className={`px-4 py-2 rounded-lg transition-colors duration-300 font-medium 
          ${props.activeTab === 'movies' 
        ? 'bg-zinc-400 hover:bg-zinc-300 text-white' 
        : 'bg-transparent text-zinc-400 hover:text-zinc-100'}`}>
          Series & Movies
        </button>
      </div>
    </div>
  );
}
