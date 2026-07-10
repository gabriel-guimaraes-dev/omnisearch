// HEADERBAR WITH THE NAME OF THE PAGE
type searchProps = {
  searchInput: string,
  onSearchChange: (newSearch: string) => void,
};

export function Header(props: searchProps) {
  const headerStyle = `
    max-h-100
    bg-red-800
  `;

  const inputStyle = `
      w-full px-4 py-2
      bg-gray-800 text-white
      border border-gray-600 rounded-lg
      transition-all duration-300
      focus:outline-none
      focus:border-blue-500
      focus:ring-2
      focus:ring-blue-500/50
      max-h-8
      max-w-64
    `;

  return (
    <div className={headerStyle}>
      <div>
        <h1>API Explorer</h1>
      </div>

      <div>
        <input
          type="text"
          value={props.searchInput}
          onChange={(e) => props.onSearchChange(e.target.value)}
          className={inputStyle}
          placeholder="God of War"
        />
      </div>

      <div>
        <button  type="button">Games</button>
        <button type="button">Series & Movies</button>
      </div>
    </div>
  );
}
