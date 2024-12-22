import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";

function Movie({ id, poster_path, title, overview, date }) {
  return (
    <div className={styles.movie}>
      <img
        src={poster_path}
        style={{ width: "250px", height: "auto", borderRadius: "10px" }}
      ></img>
      <span>
        <h4>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to={`/Movie/${id}`}
          >
            {title}
          </Link>
        </h4>
        <h7 style={{ color: "gray" }}>{date}</h7>
        <p className={styles.overview}>{overview}</p>
      </span>
    </div>
  );
}

Movie.prototypes = {
  id: PropTypes.number.isRequired,
  poster_path: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
};

export default Movie;
