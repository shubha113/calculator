import React from 'react';
import { Sun, Moon, Undo, Redo, Save} from "lucide-react";

const ControlPanel = ({ 
  isDarkMode, 
  onToggleDarkMode, 
  onUndo, 
  onRedo, 
  onSave, 
}) => {
  return (
    <div className="controls">
      <button className="control-button" onClick={onToggleDarkMode}>
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      <button className="control-button" onClick={onUndo}>
        <Undo size={20} />
      </button>
      <button className="control-button" onClick={onRedo}>
        <Redo size={20} />
      </button>
      <button className="control-button" onClick={onSave}>
        <Save size={20} />
      </button>
    </div>
  );
};

export default ControlPanel;
