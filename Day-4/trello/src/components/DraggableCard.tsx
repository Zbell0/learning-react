import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: ${(props) =>
    props.isDragging ? "#F2EFE7" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.3)" : "none"};
`;

interface IDdraggableProps {
  toDo: string;
  index: number;
}

function DraggableCard({ toDo, index }: IDdraggableProps) {
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
