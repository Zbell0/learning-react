import { error } from "console";
import { todo } from "node:test";
import { func } from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

interface IForm {
  toDo: string;
}

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValue = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  console.log(toDos);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(handleValue)}>
        <input
          {...register("toDo", {
            required: "Write a to do",
          })}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
