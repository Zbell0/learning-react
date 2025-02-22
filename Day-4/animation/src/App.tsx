import { createGlobalStyle } from "styled-components";
import { AnimatePresence, motion, spring } from "framer-motion";
import styled from "styled-components";
import { duplexPair } from "stream";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  background: radial-gradient(circle, #ec48be, #ff91d6);
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Grid = styled.div`
  width: 50%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
  gap: 10px;
`;

const Box = styled(motion.div)`
  height: 200px;
  background-color: pink;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [id, setId] = useState<null | string>(null);

  return (
    <Wrapper>
      <Grid>
        {["1", "2", "3", "4"].map((n) => (
          <Box onClick={() => setId(n)} key={n} layoutId={n}></Box>
        ))}
      </Grid>
      <AnimatePresence>
        {id ? (
          <Overlay
            onClick={() => setId(null)}
            initial={{ backgroundColor: "rgba(0, 0, 0, 0.0)" }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
            exit={{ backgroundColor: "rgba(0, 0, 0, 0.0)" }}
          >
            <Box layoutId={id} style={{ width: 400, height: 200 }}></Box>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
