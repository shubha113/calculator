import React from 'react';
import CalculatorButtons from './CalculatorButtons';

const DropZone = ({ 
  isDraggingOver, 
  components, 
  onDragOver, 
  onDragLeave, 
  onDrop,
  ...buttonProps 
}) => {
  return (
    <div
      className={`drop-zone ${isDraggingOver ? "dragging-over" : ""}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {components.length === 0 ? (
        <div className="drop-zone-empty">
          <p>Drag and drop calculator components here</p>
        </div>
      ) : (
        <CalculatorButtons 
          components={components} 
          {...buttonProps} 
        />
      )}
    </div>
  );
};

export default DropZone;