interface ButtonProps extends React.HTMLAttributes<HTMLInputElement> {
  bgOrange?: boolean;
  value: string | number;
  className?: string;
}
export default function Button({
  bgOrange,
  value,
  className,
  onClick,
}: Readonly<ButtonProps>) {
  const bgCell = bgOrange ? "bg-[#005DB2] text-gray-50 pb-2" : "bg-[#303136]";

  return (
    <input
      type="button"
      value={value}
      className={`${bgCell} h-12 text-2xl cursor-pointer ${className} rounded-xl text-[#29A8FF]`}
      onClick={onClick}
    />
  );
}
