import { useEffect, useState, type MouseEvent } from "react";
import Button from "./Components/Button";
import Display from "./Components/Display";

function Calculator() {
  const [firstValue, setFirstValue] = useState(0);
  const [secondValue, setSecondValue] = useState(0);
  const [result, setResult] = useState(0);
  const [operator, setOperator] = useState("");
  const [input, setInput] = useState("");

  const handleClickNumber = (e: MouseEvent<HTMLInputElement> | string) => {
    let value: string;
    if (typeof e === "string") {
      value = e;
    } else {
      value = e.currentTarget.value;
    }
    if (operator === "") {
      setFirstValue((prevValue) => parseFloat(prevValue + value));
    } else {
      setSecondValue((prevValue) => parseFloat(prevValue + value));
    }
  };

  function handleClickMoreOrLess() {
    if (operator === "") {
      setFirstValue(firstValue * -1);
    } else {
      setSecondValue(secondValue * -1);
    }
  }

  const handleClickOnClear = () => {
    setFirstValue(0);
    setSecondValue(0);
    setResult(0);
    setOperator("");
  };

  const handleClickOperator = (a: number, b: number, operator: string) => {
    switch (operator) {
      case "+":
        setResult(a + b);
        break;
      case "-":
        setResult(a - b);
        break;
      case "x":
        setResult(a * b);
        break;
      case "÷":
        setResult(a / b);
        break;
      case "%":
        setResult((a * b) / 100);
        break;
      default:
        break;
    }
  };

  function handleOperator(e: MouseEvent<HTMLInputElement> | string) {
    let symbol: string;
    if (typeof e === "string") {
      symbol = e;
    } else {
      symbol = e.currentTarget.value;
    }
    setOperator(symbol);
  }

  function handleClickEqual() {
    handleClickOperator(firstValue, secondValue, operator);
  }

  useEffect(() => {
    if (result !== 0) {
      setFirstValue(result);
      setSecondValue(0);
      setOperator("");
    }
  }, [setFirstValue, setSecondValue, setOperator, result]);

  useEffect(() => {
    let newInput = `${firstValue}`;
    if (operator !== "") {
      newInput += ` ${operator}`;
      if (secondValue !== 0) {
        newInput += ` ${secondValue}`;
      }
    }
    setInput(newInput);
  }, [firstValue, secondValue, operator, input]);

  const handleClickDot = () => {
    if (operator === "") {
      setFirstValue((prevValue) => parseFloat(prevValue + ".1"));
    } else {
      setSecondValue((prevValue) => parseFloat(prevValue + ".1"));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      switch (key) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
          handleClickNumber(key);
          break;
        case "+":
        case "-":
        case "x":
        case "%":
        case "=":
          handleOperator(key);
          break;
        case "/":
          handleOperator("÷");
          break;
        case "Enter":
          handleClickEqual();
          break;
        case "Backspace":
          handleClickOnClear();
          break;
        default:
          break;
      }
    };

    const display = document.getElementById("display");

    display?.addEventListener("keydown", handleKeyDown);
    return () => {
      display?.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClickNumber, handleOperator, handleClickEqual, handleClickOnClear]);

  return (
    <div className="grid grid-cols-4 w-60 grid-rows-6 m-auto gap-1 h-96">
      <Display value={input} />
      <Button value="A/C" onClick={handleClickOnClear} />
      <Button value="+/-" onClick={handleClickMoreOrLess} />
      <Button value="%" onClick={handleOperator} />
      <Button value="÷" onClick={handleOperator} bgOrange />
      <Button value="7" onClick={handleClickNumber} />
      <Button value="8" onClick={handleClickNumber} />
      <Button value="9" onClick={handleClickNumber} />
      <Button value="x" onClick={handleOperator} bgOrange />
      <Button value="4" onClick={handleClickNumber} />
      <Button value="5" onClick={handleClickNumber} />
      <Button value="6" onClick={handleClickNumber} />
      <Button value="-" onClick={handleOperator} bgOrange />
      <Button value="1" onClick={handleClickNumber} />
      <Button value="2" onClick={handleClickNumber} />
      <Button value="3" onClick={handleClickNumber} />
      <Button value="+" onClick={handleOperator} bgOrange />
      <Button value="0" className="col-span-2" onClick={handleClickNumber} />
      <Button value="." onClick={handleClickDot} />
      <Button value="=" onClick={handleClickEqual} bgOrange />
    </div>
  );
}

export default Calculator;
