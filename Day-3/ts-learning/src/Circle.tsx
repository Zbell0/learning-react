import React, { useState } from "react";
import styled from "styled-components";

// Interface for styled component props
interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

// Styled component for the Circle
const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 50%; /* Makes it a circle */
  border: 1px solid ${(props) => props.borderColor};
`;

// Interface for Circle component props
interface CircleProps {
  bgColor: string;
  borderColor?: string;
}

// Circle component
function Circle({ bgColor, borderColor }: CircleProps) {
  const [value, setValue] = useState<number | string>(1);
  return (
    <Container
      bgColor={bgColor}
      borderColor={borderColor ?? "yellow"}
    ></Container>
  );
}

// example
interface PlayerShape {
  name: string;
  age: number;
}

const sayHello = (playerObj: PlayerShape) =>
  `Hello ${playerObj.name} you are ${playerObj.age} years old.`;

sayHello({ name: "Eunji", age: 13 });

export default Circle;
