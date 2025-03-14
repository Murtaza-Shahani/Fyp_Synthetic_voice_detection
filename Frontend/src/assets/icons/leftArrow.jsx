import React from "react";

const LeftArrow = ({
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
        d="M15.75 19.5 8.25 12l7.5-7.5"
      />
    </svg>
  );
};

export default LeftArrow;
