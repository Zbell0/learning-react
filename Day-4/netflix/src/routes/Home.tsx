import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../api";
import styled from "styled-components";
import { linearGradient, map, style } from "framer-motion/client";
import { makeImagePath } from "../utils";
import {
  AnimatePresence,
  delay,
  hover,
  motion,
  useMotionValueEvent,
  useScroll,
  useViewportScroll,
} from "framer-motion";
import { useHistory, useRouteMatch } from "react-router-dom";
import { log } from "console";

const Wrapper = styled.div`
  background-color: black;
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
`;
const Overview = styled.p`
  font-size: 26px;
  width: 50%;
`;
const Slider = styled.div`
  position: relative;
  top: -100px;
`;
const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  margin-bottom: 5px;
  position: absolute;
  width: 100%;
`;
const Box = styled(motion.div)<{
  bgPhoto: string;
}>`
  cursor: pointer;
  background-size: cover;
  background-position: center center;
  background-image: url(${(props) => props.bgPhoto});
  background-color: white;
  height: 200px;
  color: red;
  font-size: 20px;
  margin-bottom: 50px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
    color: white;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const BigMovie = styled(motion.div)`
  border-radius: 15px;
  overflow: hidden;
  position: absolute;
  width: 40vw;
  height: 80vh;
  background-color: ${(p) => p.theme.black.lighter};
  left: 0;
  right: 0;
  margin: 0 auto;
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h2`
  color: ${(p) => p.theme.white.lighter};
  padding: 10px;
  position: relative;
  top: -50px;
  font-size: 28px;
`;

const BigOverview = styled.p`
  padding: 20px;
  color: ${(p) => p.theme.white.lighter};
  position: relative;
  top: -50px;
`;

const rowVariants = {
  hidden: {
    x: window.innerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.innerWidth - 5,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

// toal movie nums I want to show
const offset = 6;

function Home() {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { scrollY } = useScroll();
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const [index, setIndex] = useState(0);
  const increaseIndex = () => {
    if (data) {
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((p) => (p === maxIndex ? 0 : p + 1));
    }
  };
  const onBoxClick = (movieId: number) => {
    history.push(`/movies/${movieId}`);
  };

  const onOverlayClick = () => {
    history.push("/");
  };
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => movie.id + "" == bigMovieMatch.params.movieId
    );
  console.log(clickedMovie);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading..</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false}>
              <Row
                transition={{ type: "linear", duration: 1 }}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((i) => (
                    <Box
                      layoutId={i.id + ""}
                      onClick={() => onBoxClick(i.id)}
                      variants={boxVariants}
                      transition={{ type: "tween" }}
                      initial="normal"
                      whileHover="hover"
                      key={i.id}
                      bgPhoto={makeImagePath(i.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{i.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  exit={{ opacity: 0 }}
                  onClick={onOverlayClick}
                  animate={{ opacity: 1 }}
                ></Overlay>

                <BigMovie
                  layoutId={bigMovieMatch?.params.movieId}
                  style={{ top: scrollY.get() + 100 }}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top,  black,transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      ></BigCover>
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
