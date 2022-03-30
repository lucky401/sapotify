import './styles.css';

function SearchBar({ onSearchChange }) {
  return (
    <div className="search-bar">
      <form className="form d-flex align-center" onSubmit={onSearchChange}>
        <input type="text" />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
}

export default SearchBar;
