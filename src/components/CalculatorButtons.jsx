import React from 'react';
import { X } from "lucide-react";

const CalculatorButtons = ({ 
  components, 
  onNumberClick, 
  onOperatorClick, 
  onEquals, 
  onClear,
  onRemoveComponent 
}) => {
  return (
    <div className="calculator-grid">
      {components.map((component) => (
        <div key={component.id} className="calculator-button-wrapper">
          <button
            onClick={(e) => {
              e.preventDefault();
              if (component.type === "number") {
                onNumberClick(component.value);
              } else if (component.type === "operator") {
                onOperatorClick(component.value);
              } else if (component.type === "equals") {
                onEquals();
              } else if (component.type === "clear") {
                onClear();
              }
            }}
            className={`calculator-button ${
              component.type === "operator" ? "operator" : ""
            }`}
          >
            {component.label}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemoveComponent(component.id);
            }}
            className="remove-button"
          >
            <X size={12} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default CalculatorButtons;
