import { useState } from "react";

import Searchbar from "./Components/Searchbar";
import ImageGallery from "./Components/ImageGallery";

import "./styles.css";

const App = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="App">
      <Searchbar onSubmit={setQuery} />
      <ImageGallery query={query} />
    </div>
  );
};

export default App;
