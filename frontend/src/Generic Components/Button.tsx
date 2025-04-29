import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
  className?: string;
  size?: "md" | "lg";
}

const Button: React.FC<ButtonProps> = ({
  content,
  className = "",
  size = "lg",
  ...rest
}) => {
  return (
    <button
      className={`${
        size == "lg" ? "w-[240px] lg:w-[260px]" : "w-[240px] lg:w-[230px]"
      } cursor-pointer font-semibold text-center py-2 border-gray-400 rounded-3xl 
        ${className}`}
      {...rest}
    >
      {content}
    </button>
  );
};

export default Button;
