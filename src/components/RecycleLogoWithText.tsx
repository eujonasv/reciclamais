
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

interface RecycleLogoWithTextProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl"| "xxl";
}

const RecycleLogoWithText = ({ 
  className = "", 
  size = "md" 
}: RecycleLogoWithTextProps) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Logo size classes
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-12",
    xl: "h-16",
    xxl: "h-50"
  };

  // Only show logo after component mounts (to prevent hydration mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={`${sizeClasses[size]} ${className}`} />;
  }

  const isDark = theme === "dark" || resolvedTheme === "dark";
  const logoSrc = isDark 
    ? "/lovable-uploads/76964539-1e43-452b-8975-29ee30389926.png" 
    : "/lovable-uploads/logo-light.png";

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={logoSrc} 
        alt="RECICLA+" 
        className={`w-auto ${sizeClasses[size]}`}
      />
    </div>
  );
};

export default RecycleLogoWithText;
