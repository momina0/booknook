import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LogOut,
  Menu,
  X,
  Home,
  BookOpen,
  Plus,
  Sparkles,
  PenLine,
  Cat,
  Heart,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "My Bookshelf", url: "/bookshelf", icon: BookOpen },
  { title: "Add Book", url: "/add-book", icon: Plus },
  { title: "AI Recommender", url: "/recommender", icon: Sparkles },
  { title: "Journal", url: "/journal", icon: PenLine },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-screen transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
      style={{
        background: 'linear-gradient(180deg, rgba(255,240,250,0.98) 0%, rgba(250,240,255,0.98) 100%)',
        backdropFilter: 'blur(10px)',
        borderRight: '2px solid rgba(255,182,217,0.3)',
      }}
    >
      {/* Header / Logo */}
      <div className="p-6">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,182,217,0.3) 0%, rgba(220,180,240,0.3) 100%)',
              border: '2px solid rgba(255,182,217,0.4)',
            }}
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Cat className="w-8 h-8 text-pink-500" strokeWidth={2.5} />
            </motion.div>
            <div>
              <h2 className="text-2xl font-display text-gray-800">
                Book Nook
              </h2>
              <p className="text-xs text-gray-500 font-body">
                Cozy reading space
              </p>
            </div>
          </motion.div>
        )}
        
        {collapsed && (
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="flex justify-center"
          >
            <Cat className="w-8 h-8 text-pink-500" strokeWidth={2.5} />
          </motion.div>
        )}
        
        {/* Toggle Button - When collapsed, show below cat */}
        {collapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="mx-auto mt-4 text-gray-500 hover:bg-pink-100/50 h-8 w-8 rounded-full"
          >
            <Menu className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Toggle Button - When expanded, show in top right corner */}
      {!collapsed && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-2 right-2 text-gray-500 hover:bg-pink-100/50 h-8 w-8 rounded-full"
        >
          <X className="h-4 w-4" />
        </Button>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.url;
          const Icon = item.icon;
          return (
            <motion.div
              key={item.url}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <NavLink
                to={item.url}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-body font-semibold",
                  isActive ? "shadow-md" : ""
                )}
                style={{
                  background: isActive 
                    ? 'linear-gradient(135deg, rgba(255,182,217,0.5) 0%, rgba(220,180,240,0.4) 100%)'
                    : 'transparent',
                  border: isActive ? '2px solid rgba(255,182,217,0.6)' : '2px solid transparent',
                  fontWeight: isActive ? 700 : 600,
                }}
              >
                <Icon 
                  className={cn("w-5 h-5", isActive ? "text-pink-600" : "text-gray-500")} 
                  strokeWidth={2.5}
                />
                {!collapsed && (
                  <span className={isActive ? "text-pink-700" : "text-gray-600"}>
                    {item.title}
                  </span>
                )}
              </NavLink>
            </motion.div>
          );
        })}
      </nav>

      {/* Animated Icon Collection */}
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mx-4 mb-4"
        >
          <div 
            className="p-6 rounded-2xl text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,182,217,0.3) 0%, rgba(220,180,240,0.3) 100%)',
              border: '2px solid rgba(255,182,217,0.4)',
            }}
          >
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
                animate={{ y: [-3, 3, -3], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-4 h-4 text-pink-500 fill-pink-300" strokeWidth={2} />
              </motion.div>
              
              <motion.div
                className="absolute bottom-0 right-0"
                animate={{ scale: [1, 1.2, 1], rotate: [0, -15, 15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Star className="w-4 h-4 text-purple-400 fill-purple-300" strokeWidth={2} />
              </motion.div>
              
              <motion.div
                className="absolute bottom-0 left-0"
                animate={{ y: [-2, 2, -2], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Sparkles className="w-4 h-4 text-pink-400" strokeWidth={2} />
              </motion.div>
            </div>
            
            <p className="text-xs text-gray-600 font-body">
              Happy reading! ✨
            </p>
          </div>
        </motion.div>
      )}

      {/* Logout */}
      <div className="p-4 border-t border-pink-200/30">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full justify-start gap-3 text-gray-600 hover:bg-pink-100/50 hover:text-pink-600 font-body text-sm rounded-2xl py-3",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Log out</span>}
        </Button>
      </div>
    </aside>
  );
}
