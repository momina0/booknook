import { motion } from "motion/react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface BookCoverCardProps {
  image: string;
  title?: string;
  delay?: number;
}

export function BookCoverCard({ image, title, delay = 0 }: BookCoverCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, scale: 1.05, rotate: 2 }}
      className="relative overflow-hidden group cursor-pointer"
      style={{
        borderRadius: '1.2rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      }}
    >
      <ImageWithFallback 
        src={image}
        alt={title || "Book cover"}
        className="w-full h-full object-cover aspect-[2/3]"
      />
      
      {/* Overlay on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(168,230,207,0.9) 0%, rgba(180,167,214,0.9) 100%)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <span 
          className="text-white text-sm px-4 py-2 rounded-full"
          style={{ 
            fontFamily: 'Nunito, sans-serif',
            fontWeight: 700,
            background: 'rgba(255,255,255,0.3)',
          }}
        >
          View Details
        </span>
      </div>

      {/* Decorative corner sparkle */}
      <div className="absolute top-2 right-2 text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
        ✨
      </div>
    </motion.div>
  );
}
