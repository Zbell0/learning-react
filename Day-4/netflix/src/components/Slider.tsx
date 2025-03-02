import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { makeImagePath } from "../utils";
import { IGetMoviesResult } from "../api";

const Slider = styled.div`
  position: relative;
  top: -100px;
  margin-bottom: 280px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  margin-bottom: 5px;
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  cursor: pointer;
  background-size: cover;
  background-position: center center;
  background-image: url(${(props) => props.bgPhoto});
  background-color: white;
  height: 200px;
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

const SlideBtn = styled(motion.button)`
  position: absolute;
  top: 80px;
  border: none;
  color: ${(props) => props.theme.white.lighter};
  cursor: pointer;
  background: none;
  padding-left: 20px;
  font-size: 40px;
  opacity: 0; // Ensure it's initially invisible
  transition: opacity 0.3s ease-in-out;
`;

const rowVariants = {
  hidden: (back: boolean) => ({
    x: back ? window.innerWidth + 5 : -window.innerWidth - 5,
  }),
  visible: { x: 0 },
  exit: (back: boolean) => ({
    x: back ? -window.innerWidth - 5 : window.innerWidth + 5,
  }),
};

const boxVariants = {
  normal: { scale: 1 },
  hover: {
    scale: 1.3,
    y: -50,
    transition: { delay: 0.5, duration: 0.3, type: "tween" },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: { delay: 0.5, duration: 0.3, type: "tween" },
  },
};

const offset = 6;

interface MovieSliderProps {
  title: string;
  data: IGetMoviesResult;
  category: string;
}

function MovieSlider({ title, data, category }: MovieSliderProps) {
  const history = useHistory();
  const [index, setIndex] = useState(0);
  const [back, setBack] = useState(false);

  const increaseIndex = () => {
    if (data) {
      const totalMovies = data.results.length;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setBack(false);
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decreaseIndex = () => {
    if (data) {
      const totalMovies = data.results.length;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setBack(true);
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  const onBoxClick = (movieId: number) => {
    history.push(`/movies/${category}/${movieId}`);
  };

  return (
    <Slider>
      <h2 style={{ color: "white", marginBottom: "10px" }}>{title}</h2>
      <AnimatePresence custom={back} initial={false}>
        <Row
          key={index}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "linear", duration: 1 }}
          custom={back}
        >
          <SlideBtn onClick={decreaseIndex} whileHover={{ opacity: 1 }}>
            {"<"}
          </SlideBtn>
          {data?.results
            .slice(1)
            .slice(offset * index, offset * index + offset)
            .map((movie) => (
              <Box
                key={movie.id}
                layoutId={`${category}-${movie.id}`}
                onClick={() => onBoxClick(movie.id)}
                variants={boxVariants}
                transition={{ type: "tween" }}
                initial="normal"
                whileHover="hover"
                bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
              >
                <Info variants={infoVariants}>
                  <h4>{movie.title}</h4>
                </Info>
              </Box>
            ))}
          <SlideBtn
            onClick={increaseIndex}
            whileHover={{ opacity: 1 }}
            style={{ right: "20px" }}
          >
            {">"}
          </SlideBtn>
        </Row>
      </AnimatePresence>
    </Slider>
  );
}
export default MovieSlider;
