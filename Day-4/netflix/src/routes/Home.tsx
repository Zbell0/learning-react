import React from "react";
import { useQuery } from "react-query";
import { getMovies, getPopularMovies } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import MovieSlider from "../components/Slider";
import { useHistory, useRouteMatch } from "react-router-dom";
import {
  AnimatePresence,
  delay,
  motion,
  useScroll,
  useViewportScroll,
} from "framer-motion";
import { style } from "framer-motion/client";

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
  color: white;
`;

const Overview = styled.p`
  font-size: 26px;
  width: 50%;
  color: white;
`;

const Modal = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  background-color: red;

  left: 0;
  right: 0;
  margin: 0 auto;
  opacity: 0;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0px;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
`;

function Home() {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch("/movies/:category/:movieId");
  const { scrollY } = useViewportScroll();
  const closeModal = () => {
    history.push("/");
  };
  const { data: nowPlayingData, isLoading: nowPlayingLoading } = useQuery(
    ["movies", "nowPlaying"],
    getMovies
  );
  const { data: popularData, isLoading: popularLoading } = useQuery(
    ["movies", "popular"],
    getPopularMovies
  );

  return (
    <Wrapper>
      {nowPlayingLoading || popularLoading ? (
        <Loader>Loading..</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              nowPlayingData?.results[0].backdrop_path || ""
            )}
          >
            <Title>{nowPlayingData?.results[0].title}</Title>
            <Overview>{nowPlayingData?.results[0].overview}</Overview>
          </Banner>

          <MovieSlider
            title="Now Playing"
            data={nowPlayingData}
            category="nowPlaying"
          />
          <MovieSlider
            title="Popular Movies"
            data={popularData}
            category="popular"
          />
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                {" "}
                <Overlay
                  transition={{ delay: 0.1 }}
                  onClick={closeModal}
                  exit={{ opacity: 0 }}
                ></Overlay>
                <Modal
                  style={{ top: scrollY.get() + 100 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  exit={{ opacity: 0 }}
                ></Modal>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
