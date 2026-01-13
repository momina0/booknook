import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface AnimatedFloatingIconProps {
  icon: LucideIcon;
  className?: string;
  size?: number;
  color: string;
  delay?: number;
  duration?: number;
}

export function AnimatedFloatingIcon({ 
  icon: Icon, 
  className = "",
  size = 32, 
  color,
  delay = 0, 
  duration = 4 
}: AnimatedFloatingIconProps) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 10, -10, 0],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <Icon 
        style={{ width: size, height: size, color }}
        strokeWidth={1.5}
      />
    </motion.div>
  );
}
