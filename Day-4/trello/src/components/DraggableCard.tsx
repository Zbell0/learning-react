import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.cardColor};
  margin-bottom: 5px;
`;

interface IDdraggableProps {
  toDo: string;
  index: number;
}

function DraggableCard({ toDo, index }: IDdraggableProps) {
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(magic) => (
        <Card
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
