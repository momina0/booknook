import { BookOpen, BookMarked, Star, PenLine, Plus, Sparkles, Flower2, Cat, Heart, Moon, Cloud } from "lucide-react";
import { BookStatCard } from "@/app/components/BookStatCard";
import { BookCoverCard } from "@/app/components/BookCoverCard";
import { Sidebar } from "@/app/components/Sidebar";
import { WatercolorBlob } from "@/app/components/WatercolorBlob";
import { AnimatedFloatingIcon } from "@/app/components/AnimatedFloatingIcon";
import { motion } from "motion/react";
import myAntoniaImage from 'figma:asset/35863986bce357932ec93645ae133e60ac4802b6.png';

export default function App() {
  const stats = [
    { 
      title: "Books Read", 
      value: 3, 
      icon: BookOpen, 
      gradient: "linear-gradient(135deg, #FFB6D9 0%, #FF8FAB 100%)",
      iconColor: "bg-pink-400"
    },
    { 
      title: "Currently Reading", 
      value: 0, 
      icon: BookMarked, 
      gradient: "linear-gradient(135deg, #D4B4F1 0%, #C39FE8 100%)",
      iconColor: "bg-purple-400"
    },
    { 
      title: "Average Rating", 
      value: "N/A", 
      icon: Star, 
      gradient: "linear-gradient(135deg, #FFD4E5 0%, #FFC1DC 100%)",
      iconColor: "bg-pink-300"
    },
    { 
      title: "Journal Entries", 
      value: 2, 
      icon: PenLine, 
      gradient: "linear-gradient(135deg, #E5D4FF 0%, #D4B4FF 100%)",
      iconColor: "bg-purple-300"
    },
  ];

  const recentBooks = [
    {
      title: "My Ántonia",
      image: myAntoniaImage,
    },
    {
      title: "The Fault in Our Stars",
      image: "https://images.unsplash.com/photo-1763768861268-cb6b54173dbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBjbGFzc2ljfGVufDF8fHx8MTc2ODI4MzY1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "False Gods",
      image: "https://images.unsplash.com/photo-1633580969828-e069e568928f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBub3ZlbHxlbnwxfHx8fDE3NjgzMTQ4MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div 
        className="flex-1 ml-64 min-h-screen relative overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1767486366783-cf739f028320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0ZWwlMjBwaW5rJTIwcHVycGxlJTIwc2t5JTIwZHJlYW15fGVufDF8fHx8MTc2ODMzODI1M3ww&ixlib=rb-4.1.0&q=80&w=1080)',
            filter: 'blur(8px)',
            transform: 'scale(1.1)',
          }}
        />
        
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,240,255,0.85) 0%, rgba(255,230,250,0.9) 30%, rgba(250,235,255,0.9) 70%, rgba(255,240,255,0.85) 100%)',
          }}
        />

        {/* Watercolor background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <WatercolorBlob color="#FFB6D9" top="8%" left="15%" size={300} opacity={0.15} delay={0} />
          <WatercolorBlob color="#E5D4FF" top="25%" right="10%" size={250} opacity={0.12} delay={1} />
          <WatercolorBlob color="#FFD4E5" bottom="15%" left="20%" size={280} opacity={0.13} delay={2} />
          <WatercolorBlob color="#D4B4F1" top="50%" right="25%" size={220} opacity={0.12} delay={1.5} />
          <WatercolorBlob color="#FFC1DC" bottom="30%" right="15%" size={260} opacity={0.11} delay={0.5} />
          
          {/* Animated Floating Icons */}
          <AnimatedFloatingIcon 
            Icon={Cat} 
            top="12%" 
            right="8%" 
            size={40} 
            color="text-pink-400" 
            delay={0} 
            duration={5} 
          />
          <AnimatedFloatingIcon 
            Icon={Heart} 
            top="35%" 
            left="10%" 
            size={32} 
            color="text-pink-300" 
            delay={1} 
            duration={6} 
          />
          <AnimatedFloatingIcon 
            Icon={BookOpen} 
            bottom="25%" 
            left="8%" 
            size={36} 
            color="text-purple-400" 
            delay={2} 
            duration={5.5} 
          />
          <AnimatedFloatingIcon 
            Icon={Sparkles} 
            top="60%" 
            right="12%" 
            size={28} 
            color="text-pink-400" 
            delay={0.5} 
            duration={4.5} 
          />
          <AnimatedFloatingIcon 
            Icon={Moon} 
            top="20%" 
            left="18%" 
            size={30} 
            color="text-purple-300" 
            delay={1.5} 
            duration={7} 
          />
          <AnimatedFloatingIcon 
            Icon={Cloud} 
            bottom="35%" 
            right="20%" 
            size={44} 
            color="text-pink-200" 
            delay={0.8} 
            duration={8} 
          />
          
          {/* Ghibli motifs */}
          <motion.div
            className="absolute"
            style={{ top: '35%', right: '5%' }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Flower2 className="w-8 h-8 text-pink-300 opacity-30" />
          </motion.div>
          <motion.div
            className="absolute"
            style={{ bottom: '30%', left: '18%' }}
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            <Flower2 className="w-6 h-6 text-purple-300 opacity-25" />
          </motion.div>
          <motion.div
            className="absolute"
            style={{ top: '45%', left: '12%' }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            <Flower2 className="w-7 h-7 text-pink-400 opacity-20" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 max-w-7xl mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex items-center gap-6"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <BookOpen className="w-16 h-16 text-pink-400" strokeWidth={1.5} />
            </motion.div>
            <div>
              <h1 
                className="text-4xl text-gray-800 mb-2"
                style={{ fontFamily: 'Fredoka One, sans-serif', color: '#C2185B' }}
              >
                Welcome back to your reading nook
              </h1>
              <p 
                className="text-lg text-gray-600"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                Track your reading journey and discover new favorites ✨
              </p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {stats.map((stat, index) => (
              <BookStatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                gradient={stat.gradient}
                iconColor={stat.iconColor}
                delay={index * 0.1}
              />
            ))}
          </div>

          {/* Recently Added Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #FFB6D9 0%, #FF8FAB 100%)' }}
                >
                  <BookOpen className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <h2 
                  className="text-3xl text-gray-800"
                  style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700 }}
                >
                  Recently Added
                </h2>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full flex items-center justify-center shadow-md"
                style={{
                  background: 'linear-gradient(135deg, #FFB6D9 0%, #FF8FAB 100%)',
                }}
              >
                <Plus className="w-5 h-5 text-white" strokeWidth={2.5} />
              </motion.button>
            </div>

            {/* Book Covers */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {recentBooks.map((book, index) => (
                <BookCoverCard
                  key={index}
                  image={book.image}
                  title={book.title}
                  delay={0.5 + index * 0.1}
                />
              ))}
              
              {/* Empty slots for more books */}
              {[...Array(2)].map((_, index) => (
                <motion.div
                  key={`empty-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-[2/3] rounded-2xl border-2 border-dashed flex items-center justify-center cursor-pointer group"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,240,255,0.5) 100%)',
                    borderColor: 'rgba(255,182,217,0.4)',
                  }}
                >
                  <div className="text-center">
                    <Plus className="w-8 h-8 text-pink-300 mx-auto mb-2 group-hover:text-pink-500 transition-colors" />
                    <p 
                      className="text-xs text-pink-300 group-hover:text-pink-500 transition-colors"
                      style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600 }}
                    >
                      Add Book
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom Section - Reading Goals & Journal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Reading Goals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,240,255,0.85) 100%)',
                borderRadius: '2rem',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,182,217,0.4)',
                boxShadow: '0 8px 32px rgba(255,182,217,0.2)',
              }}
            >
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #D4B4F1 0%, #C39FE8 100%)' }}
                  >
                    <Star className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 
                    className="text-2xl text-gray-800"
                    style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700 }}
                  >
                    Reading Goals
                  </h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600 }} className="text-gray-600">
                        2026 Goal: 24 books
                      </span>
                      <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700 }} className="text-gray-700">
                        3/24
                      </span>
                    </div>
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "12.5%" }}
                        transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, #FFB6D9 0%, #FF8FAB 100%)' }}
                      ></motion.div>
                    </div>
                  </div>
                  <div className="pt-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-pink-400" />
                    <p 
                      className="text-sm text-gray-600"
                      style={{ fontFamily: 'Nunito, sans-serif' }}
                    >
                      You're off to a great start! Keep reading! 📚
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Decorative element */}
              <div className="absolute -bottom-3 -right-3 opacity-10">
                <Cat className="w-24 h-24 text-pink-400" strokeWidth={1} />
              </div>
            </motion.div>

            {/* Journal Snapshot */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255,182,217,0.3) 0%, rgba(220,180,240,0.3) 100%)',
                borderRadius: '2rem',
                border: '2px solid rgba(255,182,217,0.5)',
                boxShadow: '0 8px 32px rgba(255,182,217,0.15)',
              }}
            >
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #FFB6D9 0%, #FF8FAB 100%)' }}
                  >
                    <PenLine className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 
                    className="text-2xl text-gray-800"
                    style={{ fontFamily: 'Quicksand, sans-serif', fontWeight: 700 }}
                  >
                    Journal Entries
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                    <p style={{ fontFamily: 'Nunito, sans-serif' }} className="text-gray-700">
                      You've written <span className="font-bold">2 entries</span> so far
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                    <p style={{ fontFamily: 'Nunito, sans-serif' }} className="text-gray-700">
                      Document your reading adventures! 🌸
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full py-3 text-white flex items-center justify-center gap-2 shadow-md"
                  style={{
                    background: 'linear-gradient(135deg, #FFB6D9 0%, #FF8FAB 100%)',
                    borderRadius: '1.5rem',
                    fontFamily: 'Nunito, sans-serif',
                    fontWeight: 700,
                  }}
                >
                  <PenLine className="w-4 h-4" />
                  Write New Entry
                </motion.button>
              </div>

              {/* Decorative flower */}
              <div className="absolute -top-3 -right-3 opacity-15">
                <Heart className="w-20 h-20 text-pink-400 fill-pink-300" strokeWidth={1} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}