/* eslint-disable react-hooks/exhaustive-deps */
// src/components/Calculator.js
import React, { useEffect, useState } from "react";
import Display from "./Display";
import Button from "./Button";
import { evaluate, sqrt } from "mathjs";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(0);
  const [memory, setMemory] = useState(0);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;

      if (
        !isNaN(key) ||
        ["/", "*", "-", "+", "(", ")", ".", "C", "%"].includes(key)
      ) {
        handleButtonClick(key);
      } else if (key === "Enter") {
        handleButtonClick("=");
      } else if (key === "Backspace") {
        setExpression(expression.slice(0, -1));
      } else if (key === "Escape") {
        // Clear display when Esc key is pressed
        setExpression("");
        setResult("0");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [expression]);

  const handleButtonClick = (value) => {
    if (value === "C") {
      setExpression("");
      setResult(0);
    } else if (value === "=") {
      try {
        const evalResult = evaluate(expression);
        setResult(evalResult);
      } catch {
        setResult("Error");
      }
    } else if (value === "√") {
      try {
        const evalResult = sqrt(evaluate(expression));
        setResult(evalResult);
      } catch {
        setResult("Error");
      }
    } else if (value === "%") {
      try {
        const evalResult = evaluate(expression) / 100;
        setResult(evalResult);
      } catch {
        setResult("Error");
      }
    } else if (value === "M+") {
      setMemory(memory + result);
    } else if (value === "M-") {
      setMemory(memory - result);
    } else if (value === "MR") {
      setExpression(expression + memory);
    } else if (value === "MC") {
      setMemory(0);
    } else {
      setExpression(expression + value);
    }
  };

  const buttons = [
    "MC",
    "MR",
    "M+",
    "M-",
    "C",
    "7",
    "8",
    "9",
    "/",
    "√",
    "4",
    "5",
    "6",
    "*",
    "%",
    "1",
    "2",
    "3",
    "-",
    "(",
    "0",
    ".",
    "=",
    "+",
    ")",
  ];

  return (
    <div className="calculator">
      <Display expression={expression} result={result} />
      <div className="buttons">
        {buttons.map((btn) => (
          <Button key={btn} label={btn} onClick={handleButtonClick} />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
