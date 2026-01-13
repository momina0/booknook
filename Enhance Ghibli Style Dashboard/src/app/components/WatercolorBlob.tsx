import { motion } from "motion/react";

interface WatercolorBlobProps {
  color: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size?: number;
  opacity?: number;
  delay?: number;
}

export function WatercolorBlob({ 
  color, 
  top, 
  left, 
  right, 
  bottom, 
  size = 200, 
  opacity = 0.2,
  delay = 0 
}: WatercolorBlobProps) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        top,
        left,
        right,
        bottom,
        width: size,
        height: size,
        background: color,
        opacity,
        filter: 'blur(60px)',
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [opacity, opacity * 0.7, opacity],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}
