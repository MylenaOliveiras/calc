interface DisplayProps {
  value: string;
}

export default function Display({ value }: Readonly<DisplayProps>) {
  const displayValue = value.replace("*", "x");

  return (
    <input
      className="col-span-4 text-2xl pr-2 text-blue text-end bg-transparent outline-none"
      id="display"
      readOnly
      value={displayValue}
    />
  );
}
