

export function ButtonCustom({ className, variant = "default", ...props }) {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-600 text-white hover:bg-blue-700 px-3 py-1"
      case "secondary":
        return "bg-green-500 text-white hover:bg-green-600 px-3 py-1"
      case "outline":
        return "border-2 border-blue-600 bg-transparent text-blue-600 hover:bg-blue-50 px-3 py-1"
      default:
        return ""
    }
  }

  return <button className={`rounded-full transition-colors ${getVariantClasses()} ${className}`} {...props} />
}

