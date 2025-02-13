export const ADD_COMPONENT = "ADD_COMPONENT";
export const REMOVE_COMPONENT = "REMOVE_COMPONENT";
export const REORDER_COMPONENTS = "REORDER_COMPONENTS";
export const UNDO = "UNDO";
export const REDO = "REDO";
export const SAVE_LAYOUT = "SAVE_LAYOUT";
export const LOAD_LAYOUT = "LOAD_LAYOUT";
export const UPDATE_DISPLAY = "UPDATE_DISPLAY";
export const SET_OPERATOR = "SET_OPERATOR";
export const CALCULATE = "CALCULATE";
export const CLEAR = "CLEAR";
export const TOGGLE_DARK_MODE = "TOGGLE_DARK_MODE";

export const addComponent = (component, position) => ({
  type: ADD_COMPONENT,
  payload: {
    ...component,
    id: `${component.id}-${Date.now()}`,
    position,
  },
});

export const removeComponent = (componentId) => ({
  type: REMOVE_COMPONENT,
  payload: componentId,
});

export const reorderComponents = (startIndex, endIndex) => ({
  type: REORDER_COMPONENTS,
  payload: { startIndex, endIndex },
});

export const undo = () => ({
  type: UNDO,
});

export const redo = () => ({
  type: REDO,
});

export const toggleDarkMode = () => ({
  type: TOGGLE_DARK_MODE,
});

export const saveLayout = () => {
  return (dispatch, getState) => {
    try {
      const state = getState();
      localStorage.setItem(
        "calculatorLayout",
        JSON.stringify(state.components)
      );
      dispatch({
        type: SAVE_LAYOUT,
        payload: state.components,
      });
    } catch (error) {
      console.error("Failed to save layout:", error);
    }
  };
};

export const loadLayout = () => {
  return (dispatch) => {
    try {
      const savedLayout = localStorage.getItem("calculatorLayout");
      if (savedLayout) {
        dispatch({
          type: LOAD_LAYOUT,
          payload: JSON.parse(savedLayout),
        });
      } else {
        dispatch({
          type: LOAD_LAYOUT,
          payload: [],
        });
      }
    } catch (error) {
      console.error("Failed to load layout:", error);
      dispatch({
        type: LOAD_LAYOUT,
        payload: [],
      });
    }
  };
};
export const updateDisplay = (value) => ({
  type: UPDATE_DISPLAY,
  payload: value,
});

export const setOperator = (operator) => ({
  type: SET_OPERATOR,
  payload: operator,
});

export const calculate = () => ({
  type: CALCULATE,
});

export const clear = () => ({
  type: CLEAR,
});
