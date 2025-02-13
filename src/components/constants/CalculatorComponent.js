export const AVAILABLE_COMPONENTS = [
    {
      id: "add",
      type: "operator",
      label: "+",
      category: "basic",
    },
    {
      id: "subtract",
      type: "operator",
      label: "-",
      category: "basic",
    },
    {
      id: "multiply",
      type: "operator",
      label: "×",
      category: "basic",
    },
    {
      id: "divide",
      type: "operator",
      label: "÷",
      category: "basic",
    },
    {
      id: "equals",
      type: "equals",
      label: "=",
      category: "basic",
    },
    {
      id: "clear",
      type: "clear",
      label: "C",
      category: "basic",
    },
    ...Array.from({ length: 10 }, (_, i) => ({
      id: `num-${i}`,
      type: "number",
      label: `${i}`,
      category: "numbers",
    })),
    {
      id: "decimal",
      type: "number",
      label: ".",
      category: "numbers",
    },
  ];