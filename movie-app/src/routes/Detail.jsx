import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams(); // Extract id from useParams
  const [movie, setMovie] = useState(null);

  const getMovie = async () => {
    const json = await (
      await fetch(`https://nomad-movies.nomadcoders.workers.dev/movies/${id}`)
    ).json();
    setMovie(json);
    console.log(json);
  };

  useEffect(() => {
    getMovie();
  }, []); // Re-run if id changes

  if (!movie) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <img
        style={{ width: "200px", height: "auto" }}
        src={movie.poster_path}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
    </div>
  );
}

export default Detail;
