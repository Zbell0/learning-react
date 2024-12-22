import { func } from "prop-types";
import React from "react";
import styled, { keyframes } from "styled-components";

// styled-components
// const animation = keyframes`
//  0% {
//     transform: rotate(0deg);
//   }
//   50% {
//     transform: rotate(360deg);
//   }
//   100%{
//     transform: rotate(0deg)}
// `;

// const Father = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const Emoji = styled.span`
//   font-size: 26px;
// `;

// const Box = styled.div`
//   background-color: ${(props) => props.bgColor};
//   width: 100px;
//   height: 100px;
//   animation: ${animation} 2s linear infinite;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   ${Emoji} {
//     &:hover {
//       font-size: 50px;

//       &:active {
//         opacity: 0;
//       }
//     }
//   }
// `;

// function App() {
//   return (
//     <Father as="header">
//       <Box bgColor="teal">
//         <Emoji>🥺</Emoji>
//       </Box>
//       <Emoji>🥰🥰</Emoji>
//     </Father>
//   );
// }

// Theme
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vh;
  background-color: ${(props) => props.theme.backgroundColor};
  h1 {
    color: ${(props) => props.theme.textColor};
  }
`;

function App() {
  return (
    <Wrapper>
      <h1>Hello</h1>
    </Wrapper>
  );
}

export default App;
