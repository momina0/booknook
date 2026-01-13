import { motion } from "framer-motion";

interface WatercolorBlobProps {
  color: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  opacity?: number;
  delay?: number;
}

const sizeMap = {
  sm: 100,
  md: 150,
  lg: 200,
  xl: 300,
};

export function WatercolorBlob({ 
  color, 
  className = "",
  size = "md", 
  opacity = 0.3,
  delay = 0 
}: WatercolorBlobProps) {
  const sizeValue = sizeMap[size];
  
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: sizeValue,
        height: sizeValue,
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
