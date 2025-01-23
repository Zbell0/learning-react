import React from "react";
import { categories, IToDo, toDoState } from "./atoms";
import { useSetRecoilState } from "recoil";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  // Function to change category
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };

      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  // Function to delete the to-do
  const onDelete = () => {
    setToDos((oldToDos) => oldToDos.filter((toDo) => toDo.id !== id));
  };

  return (
    <li>
      <span>{text}</span>
      {category !== categories.TO_DO && (
        <button name={categories.TO_DO} onClick={onClick}>
          To do
        </button>
      )}
      {category !== categories.DOING && (
        <button name={categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== categories.DONE && (
        <button name={categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
      {/* Delete button */}
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}

export default ToDo;
