import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { toDoSelector, toDoState } from "./atoms";
import ToDo from "./ToDo";
import { todo } from "node:test";

function ToDoList() {
  const [toDo, doing, done] = useRecoilValue(toDoSelector);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo></CreateToDo>
      <h2>To do</h2>
      <hr />
      <ul>
        {toDo.map((toDo) => (
          <ToDo key={toDo.id} {...toDo}></ToDo>
        ))}
      </ul>

      <h2>Doing</h2>
      <hr />
      <ul>
        {doing.map((toDo) => (
          <ToDo key={toDo.id} {...toDo}></ToDo>
        ))}
      </ul>

      <h2>Done</h2>
      <hr />
      <ul>
        {done.map((toDo) => (
          <ToDo key={toDo.id} {...toDo}></ToDo>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
