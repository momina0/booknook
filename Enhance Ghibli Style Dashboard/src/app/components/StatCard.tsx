import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  delay?: number;
}

export function StatCard({ title, value, icon: Icon, color, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg overflow-hidden group"
    >
      {/* Decorative corner element */}
      <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-10 ${color}`}></div>
      
      {/* Icon */}
      <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      
      {/* Content */}
      <div>
        <p className="text-gray-500 text-sm mb-1" style={{ fontFamily: 'Fredoka, sans-serif' }}>{title}</p>
        <p className="text-4xl font-bold" style={{ fontFamily: 'Bubblegum Sans, sans-serif' }}>{value}</p>
      </div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 right-0 h-1">
        <div className={`h-full ${color}`}></div>
      </div>
    </motion.div>
  );
}
