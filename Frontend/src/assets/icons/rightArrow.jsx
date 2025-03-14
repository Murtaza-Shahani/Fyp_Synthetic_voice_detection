import React from "react";

const RightArrow = ({
  size = 6,
  width = 21,
  height = 21,
  strokeWidth = 1.5,
  strokeColor = "currentColor",
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke={strokeColor}
      className={`size-${size} ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
};

export default RightArrow;