import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface AnimatedFloatingIconProps {
  Icon: LucideIcon;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size?: number;
  color: string;
  delay?: number;
  duration?: number;
}

export function AnimatedFloatingIcon({ 
  Icon, 
  top, 
  left, 
  right, 
  bottom, 
  size = 32, 
  color,
  delay = 0, 
  duration = 4 
}: AnimatedFloatingIconProps) {
  return (
    <motion.div
      className="absolute"
      style={{ top, left, right, bottom }}
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
        className={color}
        style={{ width: size, height: size }}
        strokeWidth={1.5}
      />
    </motion.div>
  );
}
