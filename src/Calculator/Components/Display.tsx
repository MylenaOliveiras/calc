interface DisplayProps {
  value: string;
}

export default function Display({ value }: Readonly<DisplayProps>) {
  return (
    <input
      className="col-span-4 text-2xl pr-2  text-[#29A8FF] text-end bg-transparent outline-none"
      readOnly
      value={value}
    />
  );
}
