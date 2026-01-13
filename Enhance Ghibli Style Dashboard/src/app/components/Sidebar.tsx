import { motion } from "motion/react";
import { Home, BookOpen, Plus, Sparkles, PenLine, LogOut, Cat, Heart, Star } from "lucide-react";
import { useState } from "react";

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: Home },
    { name: "My Bookshelf", icon: BookOpen },
    { name: "Add Book", icon: Plus },
    { name: "AI Recommender", icon: Sparkles },
    { name: "Journal", icon: PenLine },
  ];

  return (
    <div 
      className="w-64 h-screen fixed left-0 top-0 overflow-y-auto"
      style={{
        background: 'linear-gradient(180deg, rgba(255,240,250,0.98) 0%, rgba(250,240,255,0.98) 100%)',
        backdropFilter: 'blur(10px)',
        borderRight: '2px solid rgba(255,182,217,0.3)',
      }}
    >
      <div className="p-6">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,182,217,0.3) 0%, rgba(220,180,240,0.3) 100%)',
            border: '2px solid rgba(255,182,217,0.4)',
          }}
        >
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Cat className="w-8 h-8 text-pink-500" strokeWidth={2.5} />
          </motion.div>
          <div>
            <h2 
              className="text-2xl text-gray-800"
              style={{ fontFamily: 'Fredoka One, sans-serif' }}
            >
              Book Nook
            </h2>
            <p 
              className="text-xs text-gray-500"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Cozy reading space
            </p>
          </div>
        </motion.div>

        {/* Menu Items */}
        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name;
            
            return (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ x: 5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveItem(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                  isActive ? 'shadow-md' : ''
                }`}
                style={{
                  background: isActive 
                    ? 'linear-gradient(135deg, rgba(255,182,217,0.5) 0%, rgba(220,180,240,0.4) 100%)'
                    : 'transparent',
                  border: isActive ? '2px solid rgba(255,182,217,0.6)' : '2px solid transparent',
                  fontFamily: 'Nunito, sans-serif',
                  fontWeight: isActive ? 700 : 600,
                }}
              >
                <Icon 
                  className={`w-5 h-5 ${isActive ? 'text-pink-600' : 'text-gray-500'}`} 
                  strokeWidth={2.5}
                />
                <span className={isActive ? 'text-pink-700' : 'text-gray-600'}>
                  {item.name}
                </span>
              </motion.button>
            );
          })}
        </nav>

        {/* Animated Icon Collection */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-auto pt-8"
        >
          <div 
            className="p-6 rounded-2xl text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,182,217,0.3) 0%, rgba(220,180,240,0.3) 100%)',
              border: '2px solid rgba(255,182,217,0.4)',
            }}
          >
            {/* Animated icons arranged in a circle */}
            <div className="relative w-20 h-20 mx-auto mb-3">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Cat className="w-12 h-12 text-pink-400" strokeWidth={2} />
              </motion.div>
              
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2"
                animate={{ 
                  y: [-3, 3, -3],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-4 h-4 text-pink-500 fill-pink-300" strokeWidth={2} />
              </motion.div>
              
              <motion.div
                className="absolute bottom-0 right-0"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, -15, 15, 0]
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Star className="w-4 h-4 text-purple-400 fill-purple-300" strokeWidth={2} />
              </motion.div>
              
              <motion.div
                className="absolute bottom-0 left-0"
                animate={{ 
                  y: [-2, 2, -2],
                  x: [-2, 2, -2]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Sparkles className="w-4 h-4 text-pink-400" strokeWidth={2} />
              </motion.div>
            </div>

            <p 
              className="text-sm text-gray-600 mb-1"
              style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600 }}
            >
              Reading Buddy
            </p>
            <p 
              className="text-xs text-gray-500"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Level 3 Book Lover
            </p>
          </div>
        </motion.div>

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-4 py-3 mt-4 rounded-2xl text-gray-500 hover:text-gray-700"
          style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600 }}
        >
          <LogOut className="w-5 h-5" />
          <span>Log out</span>
        </motion.button>
      </div>
    </div>
  );
}