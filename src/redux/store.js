import { configureStore } from "@reduxjs/toolkit";
import calculatorReducer from "./reducer/calculatorReducer";

const preloadedState = {
  components: [],
  history: [],
  currentStep: -1,
  displayValue: '0',
  previousValue: null,
  operator: null,
  isDarkMode: false
};

const store = configureStore({
  reducer: calculatorReducer,
  preloadedState
});

export default store;