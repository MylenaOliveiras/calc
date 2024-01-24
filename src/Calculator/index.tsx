import { useEffect, useState } from "react";
import Button from "./Components/Button";
import Display from "./Components/Display";

function Calculator() {
  const [firstValue, setFirstValue] = useState(0);
  const [secondValue, setSecondValue] = useState(0);
  const [result, setResult] = useState(0);
  const [operator, setOperator] = useState("");
  const [input, setInput] = useState("");

  const OnClickNumber = (value: string) => {
    if (operator === "") {
      setFirstValue((prevValue) => parseFloat(prevValue + value));
    } else {
      setSecondValue((prevValue) => parseFloat(prevValue + value));
    }
  };

  function onClickMoreOrLess() {
    if (operator === "") {
      setFirstValue(firstValue * -1);
    } else {
      setSecondValue(secondValue * -1);
    }
  }

  const OnClear = () => {
    setFirstValue(0);
    setSecondValue(0);
    setResult(0);
    setOperator("");
  };

  const OnClickOperator = (a: number, b: number, operator: string) => {
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

  function OnClickEqual() {
    OnClickOperator(firstValue, secondValue, operator);
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

  return (
    <div className="grid grid-cols-4 w-60 grid-rows-6 m-auto gap-1 h-96">
      <Display value={input} />
      <Button value="A/C" onClick={OnClear} />
      <Button value="+/-" onClick={onClickMoreOrLess} />
      <Button value="%" onClick={() => setOperator("%")} />
      <Button value="÷" onClick={() => setOperator("÷")} bgOrange />
      <Button value={7} onClick={() => OnClickNumber("7")} />
      <Button value={8} onClick={() => OnClickNumber("8")} />
      <Button value={9} onClick={() => OnClickNumber("9")} />
      <Button value="x" onClick={() => setOperator("x")} bgOrange />
      <Button value={4} onClick={() => OnClickNumber("4")} />
      <Button value={5} onClick={() => OnClickNumber("5")} />
      <Button value={6} onClick={() => OnClickNumber("6")} />
      <Button value="-" onClick={() => setOperator("-")} bgOrange />
      <Button value={1} onClick={() => OnClickNumber("1")} />
      <Button value={2} onClick={() => OnClickNumber("2")} />
      <Button value={3} onClick={() => OnClickNumber("3")} />
      <Button value="+" onClick={() => setOperator("+")} bgOrange />
      <Button
        value={0}
        className="col-span-2"
        onClick={() => OnClickNumber("0")}
      />
      <Button value="." />
      <Button value="=" onClick={OnClickEqual} bgOrange />
    </div>
  );
}

export default Calculator;
