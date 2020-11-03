import React, { useState, useEffect } from "react";
import StubAPI from "../api/stubAPI";
import PageTemplate from '../components/templateMovieListPage'
import { getMovies } from "../api/tmdb-api";

const UpcomingMovieListPage = () => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
      fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`)
        .then(res => res.json())
        .then(json => {
          console.log(json)
          return json.results
        })
        .then(movies => {
          setMovies(movies);
        });
    }, []);

  const addToFavorites = movieId => {
    setMovies(movies => {
      const index = movies.map(m => m.id).indexOf(movieId);
      StubAPI.add(movies[index]);
      let newMoviesState = [...movies]
      newMoviesState.splice(index, 1);
      return newMoviesState;
    });
  };

  return (
      <PageTemplate
        title='Discover Movies'
        movies={movies}
        buttonHandler={addToFavorites}
      />
  );
};

export default UpcomingMovieListPage;