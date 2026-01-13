import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { BookOpen, Heart, Sparkles, Cat, Star, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { WatercolorBlob } from "@/components/decorations/WatercolorBlob";
import { AnimatedFloatingIcon } from "@/components/decorations/AnimatedFloatingIcon";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();

  if (authLoading) {
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "So happy to see you again!",
      });
    }
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          display_name: displayName,
        },
      },
    });

    if (error) {
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Account created!",
        description: "Welcome to your cozy book nook!",
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center dreamy-bg p-4 relative overflow-hidden">
      {/* Watercolor blobs */}
      <WatercolorBlob color="#FFB6D9" className="top-10 left-10" size="xl" opacity={0.35} />
      <WatercolorBlob color="#E5D4FF" className="top-1/4 right-10" size="lg" opacity={0.3} delay={0.5} />
      <WatercolorBlob color="#FFD4E5" className="bottom-20 left-1/4" size="lg" opacity={0.25} delay={1} />
      <WatercolorBlob color="#D4B4F1" className="bottom-1/3 right-20" size="md" opacity={0.3} delay={1.5} />
      
      {/* Floating icons */}
      <AnimatedFloatingIcon icon={Cat} className="top-20 left-[10%]" color="#FF8FAB" size={28} />
      <AnimatedFloatingIcon icon={Heart} className="top-32 right-[12%]" color="#FFB6D9" size={22} delay={0.5} />
      <AnimatedFloatingIcon icon={Sparkles} className="bottom-32 left-[8%]" color="#D4B4F1" size={24} delay={1} />
      <AnimatedFloatingIcon icon={Star} className="bottom-20 right-[15%]" color="#C39FE8" size={18} delay={1.5} />
      <AnimatedFloatingIcon icon={BookOpen} className="top-1/3 left-[5%]" color="#FF8FAB" size={20} delay={2} />
      
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="w-full max-w-md glass-card-pink border-0 pink-shadow">
          <CardHeader className="text-center pb-4">
            <Link to="/" className="flex items-center justify-center gap-2 mb-4">
              <motion.div
                animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Cat className="h-12 w-12 icon-pink" />
              </motion.div>
            </Link>
            <CardTitle className="text-2xl font-display bg-gradient-to-r from-[#FF8FAB] to-[#C39FE8] bg-clip-text text-transparent">
              Book Nook
            </CardTitle>
            <CardDescription className="text-muted-foreground font-body flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 icon-pink" />
              Your cozy corner for reading adventures
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-[#FFB6D9]/30 to-[#D4B4F1]/30 rounded-full p-1">
                <TabsTrigger 
                  value="login" 
                  className="font-cute rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF8FAB] data-[state=active]:to-[#FFB6D9] data-[state=active]:text-white transition-all"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  className="font-cute rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C39FE8] data-[state=active]:to-[#D4B4F1] data-[state=active]:text-white transition-all"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4 mt-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="login-email" className="font-cute text-sm flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 icon-pink" />
                      Email
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-[#FFB6D9]/50 focus:border-[#FF8FAB] focus:ring-[#FFB6D9]/30 rounded-full h-10 text-sm bg-white/50"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="login-password" className="font-cute text-sm flex items-center gap-2">
                      <Lock className="h-3.5 w-3.5 icon-pink" />
                      Password
                    </Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-[#FFB6D9]/50 focus:border-[#FF8FAB] focus:ring-[#FFB6D9]/30 rounded-full h-10 text-sm bg-white/50"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full pink-btn pink-shadow" 
                    disabled={loading}
                  >
                    {loading ? (
                      <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        Logging in...
                      </motion.span>
                    ) : (
                      <>
                        <Heart className="h-4 w-4 mr-2" />
                        Log In
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4 mt-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-name" className="font-cute text-sm flex items-center gap-2">
                      <User className="h-3.5 w-3.5 icon-purple" />
                      Display Name
                    </Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Your name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="border-[#D4B4F1]/50 focus:border-[#C39FE8] focus:ring-[#D4B4F1]/30 rounded-full h-10 text-sm bg-white/50"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-email" className="font-cute text-sm flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 icon-purple" />
                      Email
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-[#D4B4F1]/50 focus:border-[#C39FE8] focus:ring-[#D4B4F1]/30 rounded-full h-10 text-sm bg-white/50"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-password" className="font-cute text-sm flex items-center gap-2">
                      <Lock className="h-3.5 w-3.5 icon-purple" />
                      Password
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-[#D4B4F1]/50 focus:border-[#C39FE8] focus:ring-[#D4B4F1]/30 rounded-full h-10 text-sm bg-white/50"
                      required
                      minLength={6}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full purple-btn" 
                    disabled={loading}
                  >
                    {loading ? (
                      <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        Creating account...
                      </motion.span>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Create Account
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
