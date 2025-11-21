import React from 'react';
import * as Icons from 'lucide-react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = 24, className = '' }) => {
  // Safe fallback for dynamic icon rendering
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const LucideIcon = (Icons as any)[name] || Icons.HelpCircle;
  
  return <LucideIcon size={size} className={className} />;
};

export default Icon;