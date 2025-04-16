
import { Recycle } from "lucide-react";

interface RecycleLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const RecycleLogo = ({ size = "lg", className = "" }: RecycleLogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };

  return (
    <div className={`rounded-full hero-gradient flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      <Recycle className="text-white" size={size === "sm" ? 16 : size === "md" ? 24 : 32} />
    </div>
  );
};

export default RecycleLogo;
