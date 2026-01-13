import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface CatStatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  gradient: string;
  delay?: number;
}

export function CatStatCard({ title, value, icon: Icon, gradient, delay = 0 }: CatStatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
        borderRadius: '2rem',
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(255,255,255,0.5)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
      }}
    >
      {/* Watercolor wash effect */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: gradient,
          filter: 'blur(30px)',
          transform: 'scale(1.5)',
        }}
      />
      
      <div className="relative p-6">
        {/* Icon with gradient */}
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-lg"
          style={{ background: gradient }}
        >
          <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
        </motion.div>
        
        {/* Content */}
        <div>
          <p 
            className="text-gray-500 text-sm mb-2" 
            style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600 }}
          >
            {title}
          </p>
          <p 
            className="text-5xl text-gray-800" 
            style={{ fontFamily: 'Fredoka One, sans-serif' }}
          >
            {value}
          </p>
        </div>

        {/* Decorative paw prints */}
        <div className="absolute -bottom-2 -right-2 text-6xl opacity-5">🐾</div>
      </div>
    </motion.div>
  );
}
