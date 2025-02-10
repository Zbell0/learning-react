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
`;

const svg = {
  start: { pathLength: 0, fill: "rgba(255,255,255,0)" },
  end: {
    pathLength: 1,
    fill: "rgba(255,255,255,1)",
  },
};

const Box = styled(motion.div)`
  position: absolute;
  top: 100px;
  width: 400px;
  height: 200px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0, 2, 2, 2;
`;

const boxVarioants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: 360,
  },
  leaving: {
    opacity: 0,
    scale: 0,
    y: 50,
  },
};

function App() {
  const [showing, setShowing] = useState(false);
  const toggleShowing = () => setShowing((p) => !p);
  return (
    <Wrapper>
      <button onClick={toggleShowing}>click</button>
      <AnimatePresence>
        {showing ? (
          <Box
            transition={{ type: spring }}
            variants={boxVarioants}
            initial="initial"
            animate="visible"
            exit="leaving"
          ></Box>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
