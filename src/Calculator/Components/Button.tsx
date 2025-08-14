import { twJoin } from "tailwind-merge";

interface ButtonProps extends React.HTMLAttributes<HTMLInputElement> {
  isOperatorButton?: boolean;
  value: string | number;
  className?: string;
}
export default function Button({
  isOperatorButton,
  value,
  className,
  onClick,
}: Readonly<ButtonProps>) {
  return (
    <input
      type="button"
      value={value}
      className={twJoin(
        isOperatorButton ? "bg-darkBlue text-white pb-2" : "bg-gray",
        "h-12 text-2xl cursor-pointer",
        className,
        "rounded-xl text-blue"
      )}
      onClick={onClick}
    />
  );
}
