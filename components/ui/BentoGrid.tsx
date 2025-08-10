'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

interface BentoGridItemProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'featured' | 'minimal';
}

const BentoGrid: React.FC<BentoGridProps> = ({ children, className }) => {
  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto",
      className
    )}>
      {children}
    </div>
  );
};

const BentoGridItem: React.FC<BentoGridItemProps> = ({
  children,
  className,
  title,
  description,
  header,
  icon,
  size = 'md',
  variant = 'default'
}) => {
  const sizeClasses = {
    sm: 'md:col-span-1 lg:col-span-1',
    md: 'md:col-span-1 lg:col-span-1',
    lg: 'md:col-span-2 lg:col-span-2',
    xl: 'md:col-span-2 lg:col-span-3 xl:col-span-4'
  };

  const variantClasses = {
    default: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800',
    featured: 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800',
    minimal: 'bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700'
  };

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/50 dark:to-gray-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Header Image/Content */}
      {header && (
        <div className="relative mb-4 overflow-hidden rounded-2xl">
          {header}
        </div>
      )}

      {/* Icon */}
      {icon && (
        <div className="relative mb-4 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
          {icon}
        </div>
      )}

      {/* Content */}
      <div className="relative">
        {title && (
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
        )}
        
        {description && (
          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
            {description}
          </p>
        )}
        
        {children}
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

// Specialized Bento Grid Layouts
const BentoFeatureGrid: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn(
      "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 md:gap-6 max-w-7xl mx-auto",
      className
    )}>
      {children}
    </div>
  );
};

const BentoFeatureItem: React.FC<BentoGridItemProps & { 
  span?: string;
  height?: 'auto' | 'sm' | 'md' | 'lg' | 'xl';
}> = ({
  children,
  className,
  span = "md:col-span-2 lg:col-span-4",
  height = 'auto',
  ...props
}) => {
  const heightClasses = {
    auto: 'h-auto',
    sm: 'h-48',
    md: 'h-64',
    lg: 'h-80',
    xl: 'h-96'
  };

  return (
    <BentoGridItem
      className={cn(span, heightClasses[height], className)}
      {...props}
    >
      {children}
    </BentoGridItem>
  );
};

// Pre-built Bento Layouts
const BentoHeroLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {children}
    </div>
  );
};

const BentoStatsLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
      {children}
    </div>
  );
};

export { 
  BentoGrid, 
  BentoGridItem, 
  BentoFeatureGrid, 
  BentoFeatureItem,
  BentoHeroLayout,
  BentoStatsLayout
};
