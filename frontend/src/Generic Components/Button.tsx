import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  content,
  className = "",
  ...rest
}) => {
  return (
    <button
      className={`cursor-pointer w-[240px] lg:w-[260px] font-semibold text-center py-2 border-gray-400 rounded-3xl 
        ${className}`}
      {...rest}
    >
      {content}
    </button>
  );
};

export default Button;
