import { motion } from "motion/react";

interface FloatingCatProps {
  emoji: string;
  top?: string;
  left?: string;
  right?: string;
  delay?: number;
  duration?: number;
}

export function FloatingCat({ emoji, top, left, right, delay = 0, duration = 4 }: FloatingCatProps) {
  return (
    <motion.div
      className="absolute text-4xl"
      style={{ top, left, right }}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {emoji}
    </motion.div>
  );
}
