import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./calculator.css";
import {
  addComponent,
  removeComponent,
  updateDisplay,
  setOperator,
  calculate,
  clear,
  toggleDarkMode,
  saveLayout,
  loadLayout,
  undo,
  redo,
} from "../redux/action/calculatorAction.js";
import ComponentsPanel from "./ComponentPanel";
import { AVAILABLE_COMPONENTS } from "./constants/CalculatorComponent";
import DropZone from "./DropZone";
import Display from "./Display";
import ControlPanel from "./ControlPanel";

const CalculatorBuilder = () => {
  const dispatch = useDispatch();
  const { components, displayValue, isDarkMode } = useSelector((state) => state);

  const [draggedItem, setDraggedItem] = useState(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [calculationHistory, setCalculationHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [currentExpression, setCurrentExpression] = useState("");

  useEffect(() => {
    dispatch(loadLayout());
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode, dispatch]);

  const handleNumberClick = (number) => {
    const newValue = displayValue === "0" ? number : displayValue + number;
    setCurrentExpression((prev) => prev + number);
    dispatch(updateDisplay(newValue));
  };

  const handleOperatorClick = (op) => {
    let operator = op;
    if (op === "×") operator = "*";
    if (op === "÷") operator = "/";
    setCurrentExpression((prev) => prev + " " + op + " ");
    dispatch(setOperator(operator));
  };

  const handleEquals = () => {
    try {
      const fullExpression = currentExpression;
      dispatch(calculate());

      setTimeout(() => {
        setCalculationHistory((prev) => [
          ...prev,
          {
            expression: fullExpression,
            result: displayValue,
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
        setCurrentExpression(displayValue);
      }, 0);
    } catch (error) {
      console.error("Calculation error:", error);
    }
  };

  const handleClear = () => {
    dispatch(clear());
    setCurrentExpression("");
  };

  const handleDragStart = (e, component) => {
    setDraggedItem(component);
    e.dataTransfer.setData("application/json", JSON.stringify(component));
    e.target.style.opacity = "0.4";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
    setDraggedItem(null);
    setIsDraggingOver(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);

    try {
      const componentData = JSON.parse(e.dataTransfer.getData("application/json"));
      const dropPosition = components.length;
      dispatch(addComponent({ ...componentData, value: componentData.label }, dropPosition));
    } catch (error) {
      console.error("Drop error:", error);
    }
  };

  return (
    <div className="calculator-container">
      <div className="header">
        <h1>Calculator Builder</h1>
        <ControlPanel
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => dispatch(toggleDarkMode())}
          onUndo={() => dispatch(undo())}
          onRedo={() => dispatch(redo())}
          onSave={() => dispatch(saveLayout())}
          onToggleHistory={() => setShowHistory(!showHistory)}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
        <div>
          <Display value={displayValue} />
          <DropZone
            isDraggingOver={isDraggingOver}
            components={components}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onNumberClick={handleNumberClick}
            onOperatorClick={handleOperatorClick}
            onEquals={handleEquals}
            onClear={handleClear}
            onRemoveComponent={(id) => dispatch(removeComponent(id))}
          />
        </div>

        <ComponentsPanel
          availableComponentsList={AVAILABLE_COMPONENTS}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
      </div>
    </div>
  );
};

export default CalculatorBuilder;