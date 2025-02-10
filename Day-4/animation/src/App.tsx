import { createGlobalStyle } from "styled-components";
import { AnimatePresence, motion, spring } from "framer-motion";
import styled from "styled-components";
import { duplexPair } from "stream";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  background-color: pink;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Box = styled(motion.div)`
  position: abso lute;
  top: 150px;
  width: 400px;
  height: 200px;
  background-color: white;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  position: absolute;
`;

const box = {
  entry: (back: boolean) => ({
    opacity: 0,
    scale: 0,
    x: back ? -500 : 500,
  }),
  center: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 1,
    },
  },
  exit: (back: boolean) => ({
    opacity: 0,
    scale: 0,
    x: back ? 500 : -500,
    transition: {
      duration: 1,
    },
  }),
};

function App() {
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const next = () => {
    setBack(false);
    setVisible((p) => (p === 10 ? 10 : p + 1));
  };
  const prev = () => {
    setBack(true);
    setVisible((p) => (p === 1 ? 1 : p - 1));
  };
  return (
    <Wrapper>
      <AnimatePresence mode="wait" custom={back}>
        <Box
          custom={back}
          variants={box}
          initial="entry"
          animate="center"
          exit="exit"
          key={visible}
        >
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={next}>next</button>
      <button onClick={prev}>Previous</button>
    </Wrapper>
  );
}

export default App;
