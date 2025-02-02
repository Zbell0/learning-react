import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useRecoilState } from "recoil";
import { IToDo, toDoState } from "../atom";
import { todo } from "node:test";
import { text } from "stream/consumers";

const Card = styled.div<{ isDragging: boolean }>`
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: ${(props) =>
    props.isDragging ? "#F2EFE7" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.3)" : "none"};
  display: flex;
  justify-content: space-between;
`;

interface IDraggableProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DraggableCard({ toDoId, toDoText, index }: IDraggableProps) {
  const [isEditing, setEdit] = useState(false);
  const [editText, setText] = useState(toDoText);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const deleteBtn = () => {
    setToDos((prev) => {
      const newToDos = { ...prev };

      for (const category in newToDos) {
        newToDos[category] = newToDos[category].filter(
          (toDo) => toDo.id !== toDoId
        );
      }

      return newToDos;
    });
  };

  const editBtn = () => {
    setEdit(true);
  };
  const saveEdit = () => {
    setToDos((prev) => {
      const newToDos = { ...prev };

      for (const category in newToDos) {
        newToDos[category] = newToDos[category].map((toDo) =>
          toDo.id === toDoId ? { ...toDo, text: editText } : toDo
        );
      }
      return newToDos;
    });
    setEdit(false);
  };
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setText(e.target.value)}
            />
          ) : (
            <span>{toDoText}</span>
          )}
          <span>
            <button onClick={deleteBtn}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button onClick={isEditing ? saveEdit : editBtn}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </span>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
