import { motion } from "motion/react";
import { Heart, Sparkles } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { useState } from "react";

interface CatCardProps {
  name: string;
  age: string;
  breed: string;
  image: string;
  delay?: number;
}

export function CatCard({ name, age, breed, image, delay = 0 }: CatCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -10 }}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
        borderRadius: '2rem',
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(255,255,255,0.6)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      }}
    >
      {/* Image container */}
      <div className="relative overflow-hidden" style={{ borderRadius: '1.5rem 1.5rem 0 0' }}>
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <ImageWithFallback 
            src={image}
            alt={name}
            className="w-full h-64 object-cover"
          />
        </motion.div>
        
        {/* Like button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: 'rgba(255,255,255,0.9)' }}
        >
          <Heart 
            className={`w-5 h-5 ${isLiked ? 'fill-pink-400 text-pink-400' : 'text-gray-400'}`}
          />
        </motion.button>

        {/* Watercolor overlay gradient */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-20"
          style={{
            background: 'linear-gradient(to top, rgba(255,255,255,0.9), transparent)',
          }}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 
          className="text-2xl text-gray-800 mb-2"
          style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700 }}
        >
          {name}
        </h3>
        <div className="flex items-center gap-2 mb-4">
          <span 
            className="text-sm text-gray-600"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            {age}
          </span>
          <span className="text-gray-400">•</span>
          <span 
            className="text-sm text-gray-600"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            {breed}
          </span>
        </div>

        {/* Adopt button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 text-white flex items-center justify-center gap-2 shadow-md"
          style={{
            background: 'linear-gradient(135deg, #FFB6D9 0%, #FFA8D5 100%)',
            borderRadius: '1.5rem',
            fontFamily: 'Nunito, sans-serif',
            fontWeight: 700,
          }}
        >
          <Sparkles className="w-4 h-4" />
          Adopt Me
        </motion.button>
      </div>

      {/* Decorative corner */}
      <div 
        className="absolute top-0 left-0 w-20 h-20 opacity-10"
        style={{
          background: 'radial-gradient(circle, #FFB6D9 0%, transparent 70%)',
        }}
      />
    </motion.div>
  );
}
