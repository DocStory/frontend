import React, { useCallback } from 'react';
import styled from 'styled-components';

interface NodeProps {
  id: string;
  x: number;
  y: number;
  onDrag: (id: string, x: number, y: number) => void;
}

const OptimizedNode = React.memo(({ id, x, y, onDrag }: NodeProps) => {
  const handleDragStart = useCallback((e: React.DragEvent) => {
    e.dataTransfer.setData('nodeId', id);
  }, [id]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    if (e.clientX && e.clientY) {
      onDrag(id, e.clientX, e.clientY);
    }
  }, [id, onDrag]);

  return (
    <NodeWrapper
      draggable
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      aria-label={`Node ${id}`}
      tabIndex={0}
    >
      {id}
    </NodeWrapper>
  );
});

OptimizedNode.displayName = 'OptimizedNode';

const NodeWrapper = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: #ffffff;
  border: 2px solid #000000;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: move;
  will-change: transform;
  transform-origin: center center;
  user-select: none;
  transition: none;

  &:focus {
    outline: 2px solid #0066ff;
  }
`;

export default OptimizedNode; 