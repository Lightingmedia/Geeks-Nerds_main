import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <div className={`font-mono font-bold text-indigo-600 ${sizeClasses[size]} flex items-center`}>
        <span className="text-green-500">&lt;</span>
        <span className="text-red-500">/</span>
        <span className="text-blue-500">&gt;</span>
      </div>
      <span className={`font-bold text-gray-900 ${sizeClasses[size]} ml-1`}>
        Geeks & Nerds
      </span>
    </div>
  );
};