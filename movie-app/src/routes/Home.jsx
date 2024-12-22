import Movie from "../components/Movie";
import React, { useState } from "react"; // Add this import
import { useEffect } from "react";
import styles from "./Home.module.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch("https://nomad-movies.nomadcoders.workers.dev/movies")
    ).json();

    setMovies(json);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);

  console.log(movies);

  return (
    <div className={styles.container}>
      <h2>latest Movies</h2>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div>
          <div className={styles.movies}>
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                poster_path={movie.poster_path}
                title={movie.title}
                date={movie.release_date}
                overview={movie.overview}
              />
            ))}
          </div>
          <p className={styles.swipe}>Swipe →</p>
        </div>
      )}
    </div>
  );
}
export default Home;
