import { useCallback, useEffect, useState, type MouseEvent } from "react";
import Button from "./Components/Button";
import Display from "./Components/Display";

function Calculator() {
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const [result, setResult] = useState("0");
  const [operator, setOperator] = useState("");
  const [input, setInput] = useState("");
  const [isResult, setIsResult] = useState(false);

  const handleClickNumber = useCallback(
    (e: MouseEvent<HTMLInputElement> | string) => {
      let value: string;
      if (typeof e === "string") {
        value = e;
      } else {
        value = e.currentTarget.value;
      }

      if (isResult && !operator) {
        setFirstValue(value);
        setSecondValue("");
        setOperator("");
        setIsResult(false);
        return;
      }

      (operator ? setSecondValue : setFirstValue)((prevValue) =>
        prevValue === "0" ? value : prevValue + value
      );
    },
    [operator, isResult]
  );

  function handleClickMoreOrLess() {
    if (operator === "") {
      setFirstValue(String(parseFloat(firstValue) * -1));
    } else {
      setSecondValue(String(parseFloat(secondValue) * -1));
    }
  }

  const handleClickOnClear = useCallback(() => {
    setFirstValue("");
    setSecondValue("");
    setResult("0");
    setOperator("");
  }, []);

  const handleClickOperator = (a: string, b: string, operator: string) => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    switch (operator) {
      case "+":
        setResult(String(numA + numB));
        break;
      case "-":
        setResult(String(numA - numB));
        break;
      case "x":
        setResult(String(numA * numB));
        break;
      case "*":
        setResult(String(numA * numB));
        break;
      case "÷":
        setResult(String(numA / numB));
        break;
      case "%":
        setResult(String((numA * numB) / 100));
        break;
      default:
        break;
    }
  };

  const handleOperator = useCallback(
    (e: MouseEvent<HTMLInputElement> | string) => {
      let symbol: string;
      if (typeof e === "string") {
        symbol = e;
      } else {
        symbol = e.currentTarget.value;
      }
      setOperator(symbol);
    },
    []
  );

  const handleClickEqual = useCallback(() => {
    handleClickOperator(firstValue, secondValue, operator);
    setIsResult(true);
  }, [firstValue, secondValue, operator]);

  useEffect(() => {
    if (result !== "" && result !== null && result !== undefined) {
      setFirstValue(String(result));
      setSecondValue("");
      setOperator("");
    }
  }, [result]);

  useEffect(() => {
    let newInput = `${firstValue}`;
    if (operator !== "") {
      newInput += ` ${operator}`;
      if (secondValue !== "") {
        newInput += ` ${secondValue}`;
      }
    }
    setInput(newInput);
  }, [firstValue, secondValue, operator, input]);

  const handleClickDot = useCallback(() => {
    if (operator === "") {
      setFirstValue((prevValue) =>
        prevValue.includes(".") ? prevValue : prevValue + "."
      );
    } else {
      setSecondValue((prevValue) =>
        prevValue.includes(".") ? prevValue : prevValue + "."
      );
    }
  }, [operator]);

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
        case "*":
        case "%":
        case "=":
          handleOperator(key);
          break;
        case "/":
          handleOperator("÷");
          break;
        case ".":
          handleClickDot();
          break;
        case ",":
          handleClickDot();
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
  }, [
    handleClickNumber,
    handleOperator,
    handleClickEqual,
    handleClickOnClear,
    handleClickDot,
  ]);

  return (
    <div className="grid grid-cols-4 w-60 grid-rows-6 m-auto gap-1 h-96">
      <Display value={input} />
      <Button
        value="A/C"
        onClick={handleClickOnClear}
        isOperatorButton
        className="pb-1"
      />
      <Button
        value="+/-"
        onClick={handleClickMoreOrLess}
        isOperatorButton
        className="pb-1"
      />
      <Button
        value="%"
        onClick={handleOperator}
        isOperatorButton
        className="pb-1"
      />
      <Button
        value="÷"
        onClick={handleOperator}
        isOperatorButton
        className="pb-1"
      />
      <Button value="7" onClick={handleClickNumber} />
      <Button value="8" onClick={handleClickNumber} />
      <Button value="9" onClick={handleClickNumber} />
      <Button value="x" onClick={handleOperator} isOperatorButton />
      <Button value="4" onClick={handleClickNumber} />
      <Button value="5" onClick={handleClickNumber} />
      <Button value="6" onClick={handleClickNumber} />
      <Button value="-" onClick={handleOperator} isOperatorButton />
      <Button value="1" onClick={handleClickNumber} />
      <Button value="2" onClick={handleClickNumber} />
      <Button value="3" onClick={handleClickNumber} />
      <Button value="+" onClick={handleOperator} isOperatorButton />
      <Button value="0" className="col-span-2" onClick={handleClickNumber} />
      <Button value="." onClick={handleClickDot} />
      <Button value="=" onClick={handleClickEqual} isOperatorButton />
    </div>
  );
}

export default Calculator;
