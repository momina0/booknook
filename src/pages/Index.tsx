import { Navigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { BookOpen, Heart, Sparkles, PenLine, Cat, Star, Library, BookMarked } from "lucide-react";
import { motion } from "framer-motion";
import { WatercolorBlob } from "@/components/decorations/WatercolorBlob";
import { AnimatedFloatingIcon } from "@/components/decorations/AnimatedFloatingIcon";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dreamy-bg">
        <motion.div 
          className="text-pink-dark font-display text-xl flex items-center gap-3"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Cat className="h-8 w-8 icon-pink" />
          <span>Loading...</span>
        </motion.div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen dreamy-bg overflow-hidden relative">
      {/* Watercolor blobs */}
      <WatercolorBlob color="#FFB6D9" className="top-10 left-10" size="xl" opacity={0.4} />
      <WatercolorBlob color="#E5D4FF" className="top-1/4 right-20" size="lg" opacity={0.35} delay={0.5} />
      <WatercolorBlob color="#FFD4E5" className="bottom-20 left-1/4" size="lg" opacity={0.3} delay={1} />
      <WatercolorBlob color="#D4B4F1" className="bottom-1/3 right-10" size="md" opacity={0.35} delay={1.5} />
      <WatercolorBlob color="#FFC1DC" className="top-1/2 left-1/3" size="sm" opacity={0.25} delay={2} />

      {/* Floating icons */}
      <AnimatedFloatingIcon icon={Cat} className="top-20 left-[8%]" color="#FF8FAB" size={32} />
      <AnimatedFloatingIcon icon={Heart} className="top-32 right-[12%]" color="#FFB6D9" size={24} delay={0.5} />
      <AnimatedFloatingIcon icon={Sparkles} className="bottom-40 left-[5%]" color="#D4B4F1" size={28} delay={1} />
      <AnimatedFloatingIcon icon={Star} className="bottom-20 right-[8%]" color="#C39FE8" size={20} delay={1.5} />
      <AnimatedFloatingIcon icon={BookOpen} className="top-1/3 right-[5%]" color="#FF8FAB" size={26} delay={2} />

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <motion.nav 
          className="flex justify-between items-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Cat className="h-8 w-8 icon-pink" />
            </motion.div>
            <span className="font-display text-xl bg-gradient-to-r from-[#FF8FAB] to-[#C39FE8] bg-clip-text text-transparent">
              My Book Nook
            </span>
          </div>
          <Link to="/auth">
            <Button className="pink-btn">
              Sign In
            </Button>
          </Link>
        </motion.nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div 
            className="mb-8"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFB6D9]/30 to-[#D4B4F1]/30 rounded-full blur-2xl scale-150" />
              <Cat className="h-24 w-24 icon-pink relative z-10" />
            </div>
          </motion.div>
          
          <motion.h1 
            className="font-display text-4xl md:text-5xl text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Welcome to Your
            <span className="bg-gradient-to-r from-[#FF8FAB] to-[#C39FE8] bg-clip-text text-transparent block mt-2">
              Cozy Book Nook
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg text-muted-foreground font-body mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Track your reading journey, discover new books, and keep a whimsical journal of all your literary adventures!
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/auth">
              <Button size="lg" className="pink-btn px-8 pink-shadow">
                <Heart className="h-5 w-5 mr-2" />
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Features - Glass Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: BookMarked, title: "Track Your Books", desc: "Keep a beautiful collection of all the books you've read, are reading, or want to read!", delay: 0.6 },
            { icon: Sparkles, title: "AI Recommendations", desc: "Get personalized book suggestions powered by AI based on your reading taste!", delay: 0.7 },
            { icon: PenLine, title: "Whimsical Journal", desc: "Write your thoughts in a letter-style journal with charming decorations!", delay: 0.8 },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="glass-card-pink p-6 rounded-2xl relative overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: feature.delay }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              {/* Watercolor wash effect */}
              <div 
                className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"
                style={{ background: index === 0 ? '#FFB6D9' : index === 1 ? '#D4B4F1' : '#FFD4E5' }}
              />
              
              <motion.div 
                className="mb-4 relative z-10"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className={`h-10 w-10 ${index === 0 ? 'icon-pink' : index === 1 ? 'icon-purple' : 'icon-blush'}`} />
              </motion.div>
              <h3 className="font-display text-lg text-foreground mb-2 relative z-10">{feature.title}</h3>
              <p className="text-muted-foreground font-body text-sm relative z-10">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div 
          className="text-center mt-16 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Heart className="h-4 w-4 icon-pink" />
          <p className="font-body text-muted-foreground">
            Made with love for book lovers
          </p>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Cat className="h-5 w-5 icon-purple" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
