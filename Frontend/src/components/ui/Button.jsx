function Button({
  children,
  type = "button",
  variant = "default",
  size = "md",
  className = "",
  disabled = false,
  onClick,
  ...props
}) {
  const baseClasses =
    "font-medium rounded-full transition-colors focus:outline-none";

  const variantClasses = {
    default: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-green-500 text-white hover:bg-green-600",
    outline:
      "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
  };

  const sizeClasses = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4",
    lg: "py-3 px-6 text-lg",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${
    sizeClasses[size]
  } ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
