import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { useRef } from "react";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 10px 0px;
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

const Title = styled.div`
  text-align: center;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 18px;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}
const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#48A6A7"
      : props.draggingFromThisWith
      ? "#b6e5ea"
      : props.theme.boardColor};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px 20px;
`;

function Board({ toDos, boardId }: IBoardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onClick = () => {
    inputRef.current?.focus();
    setTimeout(() => {
      inputRef.current?.blur();
    }, 5000);
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <input ref={inputRef} placeholder="grab me"></input>
      <button onClick={onClick}>Click me</button>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            draggingFromThisWith={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard
                key={toDo}
                index={index}
                toDo={toDo}
              ></DraggableCard>
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
