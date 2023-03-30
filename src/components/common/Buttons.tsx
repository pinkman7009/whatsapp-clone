import { Button as ButtonProps } from "../../types";

export const PrimaryButton = ({ text, handleClick, size }: ButtonProps) => {
  return (
    <button
      className={` transition-all ease-in p-2 ${
        size === "small" ? "w-20" : size === "large" ? "w-64" : "w-32"
      } text-white my-3 text-sm rounded font-bold bg-primary hover:opacity-80`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};
