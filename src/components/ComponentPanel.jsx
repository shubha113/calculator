import React from 'react';

const ComponentsPanel = ({ availableComponentsList, onDragStart, onDragEnd }) => {
  return (
    <div className="components-panel">
      <h2>Components</h2>
      
      <div className="components-section">
        <h3>Basic Components</h3>
        <div className="components-grid">
          {availableComponentsList
            .filter((comp) => comp.category === "basic")
            .map((component) => (
              <div
                key={component.id}
                draggable
                onDragStart={(e) => onDragStart(e, component)}
                onDragEnd={onDragEnd}
                className="draggable-component"
              >
                {component.label}
              </div>
            ))}
        </div>
      </div>

      <div className="components-section">
        <h3>Numbers</h3>
        <div className="components-grid">
          {availableComponentsList
            .filter((comp) => comp.category === "numbers")
            .map((component) => (
              <div
                key={component.id}
                draggable
                onDragStart={(e) => onDragStart(e, component)}
                onDragEnd={onDragEnd}
                className="draggable-component"
              >
                {component.label}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ComponentsPanel;
