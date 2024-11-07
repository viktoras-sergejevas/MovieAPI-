import { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./components/movieCard/card";
import NoMovie from "./components/noMovieToShow";

function App() {
  const [movieData, setMovieData] = useState([]);
  const [search, setSearch] = useState("");
  const [movieGenre, setMovieGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("noGenreOption");

  const options = { method: "GET", headers: { accept: "application/json" } };
  const onSearchMovie = (event) => {
    setSearch(event.target.value);
  };

  const popularMovies = () => {
    fetchMovies();
    if (selectGenre !== "" || selectedGenre !== "noGenreOption") {
      setSelectedGenre("noGenreOption");
    }
  };

  const fetchMovies = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=53c258bb52d305146e19a71e58aa2cc5",
      options
    )
      .then((resp) => resp.json())
      .then((resp) => {
        setMovieData(resp.results);
      })
      .catch((err) => err);
  };

  const fetchSearchedMovie = () => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${search}&api_key=53c258bb52d305146e19a71e58aa2cc5`,
      options
    )
      .then((resp) => resp.json())
      .then((resp) => {
        setMovieData(resp.results);
      })
      .catch((err) => err);
  };

  const fetchSearchGenre = () => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=53c258bb52d305146e19a71e58aa2cc5`,
      options
    )
      .then((resp) => resp.json())
      .then((resp) => setMovieGenre(resp.genres))
      .catch((err) => console.error(err));
  };

  const fetchMoviesByGenre = () => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${selectedGenre}&api_key=53c258bb52d305146e19a71e58aa2cc5`,
      options
    )
      .then((resp) => resp.json())
      .then((resp) => setMovieData(resp.results))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (search.length >= 2) {
      fetchSearchedMovie();
    }
  }, [search]);

  useEffect(() => {
    fetchSearchGenre();
  }, []);

  useEffect(() => {
    if (selectedGenre !== "" && selectedGenre !== "noGenreOption") {
      fetchMoviesByGenre();
    } else if (selectedGenre === "noGenreOption") {
      fetchMovies();
    }
  }, [selectedGenre]);

  const selectGenre = (event) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <div>
      <h1>Movie search tool</h1>
      <div className="inputsContainer">
        <button className="inputs btn btn-outline-dark" onClick={popularMovies}>
          Popular Movies
        </button>
        <input
          className="inputs btn btn-outline-dark"
          placeholder="Search Movies"
          onChange={onSearchMovie}
        />
        <select
          className="inputs btn btn-outline-dark"
          value={selectedGenre}
          onChange={selectGenre}
        >
          <option value="noGenreOption" key="no-genre">
            {"Select Genre"}
          </option>
          {movieGenre.map((item) => {
            return (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      {movieData.length === 0 ? (
        <NoMovie search={search} />
      ) : (
        <MovieCard data={movieData} />
      )}
    </div>
  );
}

export default App;
