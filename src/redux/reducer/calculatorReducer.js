import {
  ADD_COMPONENT,
  REMOVE_COMPONENT,
  REORDER_COMPONENTS,
  UNDO,
  REDO,
  SAVE_LAYOUT,
  LOAD_LAYOUT,
  UPDATE_DISPLAY,
  SET_OPERATOR,
  CALCULATE,
  CLEAR,
  TOGGLE_DARK_MODE,
} from "../action/calculatorAction.js";

const initialState = {
  components: [],
  history: [],
  currentStep: -1,
  displayValue: "0",
  previousValue: null,
  operator: null,
  isDarkMode: false,
  currentExpression: "",
};

const calculatorReducer = (state = initialState, action) => {
  console.log(
    "Reducer called with action:",
    action.type,
    "Payload:",
    action.payload
  );
  console.log("Current state:", state);
  switch (action.type) {
    case ADD_COMPONENT:
      const newComponents = [...state.components];
      newComponents.splice(action.payload.position, 0, {
        ...action.payload,
        id: `${action.payload.id}-${Date.now()}`,
        onClick: action.payload.onClick,
      });
      return {
        ...state,
        components: newComponents,
        history: [
          ...state.history.slice(0, state.currentStep + 1),
          newComponents,
        ],
        currentStep: state.currentStep + 1,
      };

    case REMOVE_COMPONENT:
      const filteredComponents = state.components.filter(
        (comp) => comp.id !== action.payload
      );
      return {
        ...state,
        components: filteredComponents,
        history: [
          ...state.history.slice(0, state.currentStep + 1),
          filteredComponents,
        ],
        currentStep: state.currentStep + 1,
      };

    case REORDER_COMPONENTS:
      const reorderedComponents = [...state.components];
      const [removed] = reorderedComponents.splice(
        action.payload.startIndex,
        1
      );
      reorderedComponents.splice(action.payload.endIndex, 0, removed);
      return {
        ...state,
        components: reorderedComponents,
        history: [
          ...state.history.slice(0, state.currentStep + 1),
          reorderedComponents,
        ],
        currentStep: state.currentStep + 1,
      };

    case UNDO:
      if (state.currentStep > 0) {
        return {
          ...state,
          currentStep: Math.max(state.currentStep - 1, 0),
          components: [...state.history[state.currentStep - 1]],
        };
      }
      return state;

    case REDO:
      if (state.currentStep < state.history.length - 1) {
        return {
          ...state,
          currentStep: state.currentStep + 1,
          components: [...state.history[state.currentStep + 1]],
        };
      }
      return state;

    case SAVE_LAYOUT:
    case LOAD_LAYOUT:
      return {
        ...state,
        components: action.payload,
        history: [[...action.payload], ...state.history],
        currentStep: 0,
        currentStep: 0,
      };

    case UPDATE_DISPLAY:
      return {
        ...state,
        displayValue: action.payload,
        currentExpression: state.operator
          ? state.currentExpression + action.payload
          : action.payload,
      };

    case SET_OPERATOR:
      return {
        ...state,
        operator: action.payload,
        previousValue: state.displayValue,
        currentExpression: state.currentExpression + action.payload,
        displayValue: "0",
      };

    case CALCULATE:
      try {
        const expression = state.currentExpression;

        if (!expression || expression === "0") {
          return state;
        }

        const sanitizedExpression = expression
          .replace(/×/g, "*")
          .replace(/÷/g, "/");

        const result = eval(sanitizedExpression);

        if (isNaN(result) || !isFinite(result)) {
          return {
            ...state,
            displayValue: "Error",
            currentExpression: "",
            operator: null,
            previousValue: null,
          };
        }

        return {
          ...state,
          displayValue: result.toString(),
          currentExpression: result.toString(),
          operator: null,
          previousValue: null,
        };
      } catch (error) {
        console.error("Calculation error:", error);
        return {
          ...state,
          displayValue: "Error",
          currentExpression: "",
          operator: null,
          previousValue: null,
        };
      }
    case CLEAR:
      return {
        ...state,
        displayValue: "0",
        previousValue: null,
        operator: null,
        currentExpression: "",
      };

    case TOGGLE_DARK_MODE:
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
    default:
      return state;
  }
};

export default calculatorReducer;
