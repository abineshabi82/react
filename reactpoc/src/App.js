import React, { useEffect, useState } from "react";
import "./style.css";

import Navbar from "./components/Navbar";
import {genres} from "./assets/constants"

export default function App() {
  const [animeGenre, setAnimeGenre] = useState({});
  useEffect(()=>{
    setAnimeGenre(genres);
  },[]);
  return (
    <React.Fragment>
      <Navbar animeGenres={animeGenre} />
    </React.Fragment>
  );
}
