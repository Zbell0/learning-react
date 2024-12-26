import { log } from "console";
import { useState } from "react";
import styled, { keyframes } from "styled-components";

// function App() {
//   const [value, setValue] = useState("");
//   const onChange = (e: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = e;
//     setValue(value);
//   };
//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log("hi", value);
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input
//           value={value}
//           onChange={onChange}
//           type="text"
//           placeholder="username"
//         />
//         <button>Log in</button>
//       </form>
//     </div>
//   );
// }
const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

function App() {
  return (
    <Container>
      <H1>Hello</H1>
    </Container>
  );
}

export default App;
