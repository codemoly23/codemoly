import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "outlined" | "glass";
  hover?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = "default",
  hover = false,
  onClick,
}) => {
  const baseClasses = "rounded-2xl transition-all duration-300";

  const variants = {
    default:
      "bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800",
    elevated:
      "bg-white dark:bg-gray-900 shadow-xl border border-gray-100 dark:border-gray-800",
    outlined: "bg-transparent border-2 border-gray-200 dark:border-gray-700",
    glass:
      "bg-white/10 dark:bg-gray-900/10 backdrop-blur-lg border border-white/20 dark:border-gray-700/20",
  };

  const hoverEffects = hover
    ? "hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
    : "";

  const CardComponent = onClick ? motion.div : "div";
  const motionProps = onClick
    ? {
        whileHover: { scale: 1.02, y: -4 },
        whileTap: { scale: 0.98 },
        onClick,
      }
    : {};

  return (
    <CardComponent
      className={cn(baseClasses, variants[variant], hoverEffects, className)}
      {...motionProps}
    >
      {children}
    </CardComponent>
  );
};

const CardHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn("mobile-card-p sm:p-6 pb-2 sm:pb-4", className)}>
    {children}
  </div>
);

const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn("px-6 mobile-card-p sm:px-6 pb-6", className)}>
    {children}
  </div>
);

const CardTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <h3
    className={cn(
      "text-xl font-semibold text-gray-900 dark:text-gray-100",
      className
    )}
  >
    {children}
  </h3>
);

const CardDescription: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <p className={cn("text-gray-600 dark:text-gray-400 mt-2", className)}>
    {children}
  </p>
);

export { Card, CardHeader, CardContent, CardTitle, CardDescription };
