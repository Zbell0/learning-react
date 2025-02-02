import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { IToDo, toDoState } from "../atom";
import { todo } from "node:test";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding: 10px 0px;
  border-radius: 5px;
  height: 300px;
  display: flex;
  flex-direction: column;
  button {
    border: none;
    padding: 5px 13px;
    background-color: #ff8383;
    border-radius: 2px;
    transition: box-shadow 0.3s ease-in-out;
    cursor: pointer;
  }
  button:hover {
    outline: none;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.7);
  }
`;

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 15px;
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
      ? "#b6e5ea"
      : props.draggingFromThisWith
      ? "#48A6A7"
      : props.theme.boardColor};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px 20px;
`;

const Form = styled.form`
  margin-top: 10px;
  width: 100%;
  input {
    border: none;
    width: 80%;
    margin: 0px 20px;
    padding: 3px 5px;
  }
`;

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: data.toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue("toDo", "");
  };
  const deleteBoard = () => {
    setToDos((allBoards) => {
      const newBoards = { ...allBoards };
      delete newBoards[boardId]; // Remove the board
      return newBoards;
    });
  };

  return (
    <Wrapper>
      <Title>
        {boardId} <button onClick={deleteBoard}>x</button>
      </Title>

      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
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
                key={toDo.id}
                index={index}
                toDoId={toDo.id}
                toDoText={toDo.text}
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
