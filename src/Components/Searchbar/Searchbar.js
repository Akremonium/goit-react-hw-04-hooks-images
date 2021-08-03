import { useState } from "react";

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleQuery = (evt) => {
    setQuery(evt.currentTarget.value.toLowerCase().trim());
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onSubmit(query);
    setQuery("");
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleQuery}
          value={query}
        />
      </form>
    </header>
  );
};

export default Searchbar;
