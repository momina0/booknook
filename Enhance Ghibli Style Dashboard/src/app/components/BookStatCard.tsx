import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface BookStatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  gradient: string;
  iconColor: string;
  delay?: number;
}

export function BookStatCard({ title, value, icon: Icon, gradient, iconColor, delay = 0 }: BookStatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
        borderRadius: '1.5rem',
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(255,255,255,0.6)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
      }}
    >
      {/* Watercolor wash effect */}
      <div 
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-15"
        style={{
          background: gradient,
          filter: 'blur(25px)',
        }}
      />
      
      <div className="relative p-6">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${iconColor}`}
        >
          <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
        </motion.div>
        
        {/* Content */}
        <div>
          <p 
            className="text-gray-500 text-xs mb-1" 
            style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600 }}
          >
            {title}
          </p>
          <p 
            className="text-4xl text-gray-800" 
            style={{ fontFamily: 'Fredoka One, sans-serif' }}
          >
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
