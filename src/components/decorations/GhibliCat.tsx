import { cn } from "@/lib/utils";

interface GhibliCatProps {
  variant?: "totoro" | "sitting" | "sleeping" | "reading" | "flying" | "peeking" | "walking" | "waving";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  animated?: boolean;
}

export function GhibliCat({ variant = "sitting", size = "md", className, animated = true }: GhibliCatProps) {
  const sizes = {
    xs: "w-8 h-8",
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
  };

  const animations = {
    totoro: "animate-[gentleBounce_3s_ease-in-out_infinite]",
    sitting: "animate-[ghibli-float_4s_ease-in-out_infinite]",
    sleeping: "animate-pulse",
    reading: "animate-[gentleBounce_4s_ease-in-out_infinite]",
    flying: "animate-[ghibli-float_2s_ease-in-out_infinite]",
    peeking: "animate-[gentleBounce_3s_ease-in-out_infinite]",
    walking: "animate-[catWalk_2s_ease-in-out_infinite]",
    waving: "animate-[catWave_1s_ease-in-out_infinite]",
  };

  // Watercolor-style Ghibli cats
  const cats = {
    totoro: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        {/* Body - soft round shape */}
        <ellipse cx="32" cy="38" rx="22" ry="20" fill="#8BA89A" />
        <ellipse cx="32" cy="40" rx="18" ry="14" fill="#A8C4B8" opacity="0.6" />
        {/* Belly */}
        <ellipse cx="32" cy="42" rx="14" ry="12" fill="#F5F0E8" />
        {/* Belly markings */}
        <path d="M26 36 Q28 38 30 36" stroke="#8BA89A" strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M34 36 Q36 38 38 36" stroke="#8BA89A" strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M28 42 Q30 44 32 42" stroke="#8BA89A" strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M32 42 Q34 44 36 42" stroke="#8BA89A" strokeWidth="2" fill="none" opacity="0.6" />
        {/* Ears */}
        <ellipse cx="20" cy="18" rx="5" ry="8" fill="#8BA89A" transform="rotate(-15 20 18)" />
        <ellipse cx="44" cy="18" rx="5" ry="8" fill="#8BA89A" transform="rotate(15 44 18)" />
        {/* Eyes */}
        <circle cx="24" cy="30" r="5" fill="white" />
        <circle cx="40" cy="30" r="5" fill="white" />
        <circle cx="24" cy="30" r="3" fill="#2D3A34" />
        <circle cx="40" cy="30" r="3" fill="#2D3A34" />
        <circle cx="25" cy="29" r="1" fill="white" />
        <circle cx="41" cy="29" r="1" fill="white" />
        {/* Nose */}
        <ellipse cx="32" cy="34" rx="3" ry="2" fill="#4A5D52" />
        {/* Whiskers */}
        <line x1="18" y1="32" x2="8" y2="30" stroke="#4A5D52" strokeWidth="1" opacity="0.5" />
        <line x1="18" y1="34" x2="8" y2="35" stroke="#4A5D52" strokeWidth="1" opacity="0.5" />
        <line x1="46" y1="32" x2="56" y2="30" stroke="#4A5D52" strokeWidth="1" opacity="0.5" />
        <line x1="46" y1="34" x2="56" y2="35" stroke="#4A5D52" strokeWidth="1" opacity="0.5" />
        {/* Leaf on head */}
        <ellipse cx="32" cy="12" rx="4" ry="2" fill="#7CAA8D" transform="rotate(-10 32 12)" />
        <line x1="32" y1="12" x2="32" y2="16" stroke="#5A8B6F" strokeWidth="1" />
      </svg>
    ),
    sitting: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        {/* Watercolor wash effect */}
        <defs>
          <radialGradient id="catWash" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E8DDD4" />
            <stop offset="100%" stopColor="#D4C4B5" />
          </radialGradient>
        </defs>
        {/* Body */}
        <ellipse cx="32" cy="42" rx="18" ry="14" fill="url(#catWash)" />
        <ellipse cx="32" cy="44" rx="14" ry="10" fill="#F5F0EA" opacity="0.5" />
        {/* Head */}
        <circle cx="32" cy="24" r="14" fill="#E8DDD4" />
        <circle cx="32" cy="26" r="10" fill="#F5F0EA" opacity="0.4" />
        {/* Ears */}
        <path d="M20 14 L24 24 L16 22 Z" fill="#E8DDD4" />
        <path d="M44 14 L40 24 L48 22 Z" fill="#E8DDD4" />
        <path d="M21 16 L24 22 L18 21 Z" fill="#F5D6C6" opacity="0.6" />
        <path d="M43 16 L40 22 L46 21 Z" fill="#F5D6C6" opacity="0.6" />
        {/* Eyes */}
        <ellipse cx="26" cy="24" rx="3" ry="3.5" fill="#3D3D3D" />
        <ellipse cx="38" cy="24" rx="3" ry="3.5" fill="#3D3D3D" />
        <circle cx="27" cy="23" r="1" fill="white" />
        <circle cx="39" cy="23" r="1" fill="white" />
        {/* Nose */}
        <path d="M30 28 L32 30 L34 28 Z" fill="#D4A59A" />
        {/* Mouth */}
        <path d="M29 31 Q32 34 35 31" stroke="#3D3D3D" strokeWidth="1" fill="none" opacity="0.6" />
        {/* Blush */}
        <circle cx="22" cy="28" r="3" fill="#F5C6C6" opacity="0.4" />
        <circle cx="42" cy="28" r="3" fill="#F5C6C6" opacity="0.4" />
        {/* Whiskers */}
        <line x1="20" y1="26" x2="10" y2="24" stroke="#B5A59A" strokeWidth="0.5" />
        <line x1="20" y1="28" x2="10" y2="29" stroke="#B5A59A" strokeWidth="0.5" />
        <line x1="44" y1="26" x2="54" y2="24" stroke="#B5A59A" strokeWidth="0.5" />
        <line x1="44" y1="28" x2="54" y2="29" stroke="#B5A59A" strokeWidth="0.5" />
        {/* Tail */}
        <path d="M48 44 Q56 40 54 48 Q52 54 48 52" stroke="#D4C4B5" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* Paws */}
        <ellipse cx="24" cy="52" rx="5" ry="3" fill="#E8DDD4" />
        <ellipse cx="40" cy="52" rx="5" ry="3" fill="#E8DDD4" />
      </svg>
    ),
    sleeping: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        {/* Body - curled up */}
        <ellipse cx="32" cy="38" rx="22" ry="16" fill="#E8DDD4" />
        <ellipse cx="32" cy="40" rx="18" ry="12" fill="#F5F0EA" opacity="0.5" />
        {/* Head resting */}
        <circle cx="26" cy="30" r="12" fill="#E8DDD4" />
        {/* Ears */}
        <path d="M16 22 L19 28 L13 27 Z" fill="#E8DDD4" />
        <path d="M34 20 L31 26 L37 25 Z" fill="#E8DDD4" />
        <path d="M17 23 L19 27 L15 26 Z" fill="#F5D6C6" opacity="0.6" />
        <path d="M33 21 L31 25 L35 24 Z" fill="#F5D6C6" opacity="0.6" />
        {/* Closed eyes */}
        <path d="M21 30 Q23 28 25 30" stroke="#3D3D3D" strokeWidth="1.5" fill="none" />
        <path d="M27 30 Q29 28 31 30" stroke="#3D3D3D" strokeWidth="1.5" fill="none" />
        {/* Nose */}
        <ellipse cx="26" cy="33" rx="1.5" ry="1" fill="#D4A59A" />
        {/* Blush */}
        <circle cx="20" cy="32" r="2.5" fill="#F5C6C6" opacity="0.4" />
        <circle cx="32" cy="32" r="2.5" fill="#F5C6C6" opacity="0.4" />
        {/* Tail wrapped around */}
        <path d="M50 38 Q56 32 52 26 Q48 22 44 28" stroke="#D4C4B5" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* Zzz */}
        <text x="40" y="18" fill="#8BA89A" fontSize="8" fontFamily="Quicksand" fontWeight="bold" opacity="0.6">Z</text>
        <text x="46" y="14" fill="#8BA89A" fontSize="6" fontFamily="Quicksand" fontWeight="bold" opacity="0.5">z</text>
        <text x="50" y="10" fill="#8BA89A" fontSize="4" fontFamily="Quicksand" fontWeight="bold" opacity="0.4">z</text>
      </svg>
    ),
    reading: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        {/* Body */}
        <ellipse cx="32" cy="44" rx="16" ry="12" fill="#E8DDD4" />
        {/* Head */}
        <circle cx="32" cy="24" r="12" fill="#E8DDD4" />
        {/* Ears */}
        <path d="M22 14 L25 22 L19 21 Z" fill="#E8DDD4" />
        <path d="M42 14 L39 22 L45 21 Z" fill="#E8DDD4" />
        <path d="M23 15 L25 20 L20 20 Z" fill="#F5D6C6" opacity="0.6" />
        <path d="M41 15 L39 20 L44 20 Z" fill="#F5D6C6" opacity="0.6" />
        {/* Eyes - looking down at book */}
        <path d="M27 24 Q29 27 31 24" stroke="#3D3D3D" strokeWidth="1.5" fill="none" />
        <path d="M33 24 Q35 27 37 24" stroke="#3D3D3D" strokeWidth="1.5" fill="none" />
        {/* Nose */}
        <path d="M30 27 L32 29 L34 27 Z" fill="#D4A59A" />
        {/* Blush */}
        <circle cx="24" cy="26" r="2.5" fill="#F5C6C6" opacity="0.4" />
        <circle cx="40" cy="26" r="2.5" fill="#F5C6C6" opacity="0.4" />
        {/* Book */}
        <rect x="16" y="36" width="32" height="20" rx="2" fill="#A8C4B8" />
        <rect x="16" y="36" width="16" height="20" fill="#8BA89A" />
        <line x1="32" y1="36" x2="32" y2="56" stroke="#7CAA8D" strokeWidth="2" />
        {/* Book text lines */}
        <rect x="19" y="40" width="10" height="1" fill="#F5F0EA" opacity="0.6" />
        <rect x="35" y="40" width="10" height="1" fill="#F5F0EA" opacity="0.6" />
        <rect x="19" y="44" width="8" height="1" fill="#F5F0EA" opacity="0.6" />
        <rect x="35" y="44" width="8" height="1" fill="#F5F0EA" opacity="0.6" />
        {/* Paws on book */}
        <ellipse cx="24" cy="37" rx="4" ry="2.5" fill="#E8DDD4" />
        <ellipse cx="40" cy="37" rx="4" ry="2.5" fill="#E8DDD4" />
      </svg>
    ),
    flying: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        {/* Wings */}
        <ellipse cx="16" cy="28" rx="12" ry="8" fill="#B8D4E8" opacity="0.7" transform="rotate(-20 16 28)" />
        <ellipse cx="48" cy="28" rx="12" ry="8" fill="#B8D4E8" opacity="0.7" transform="rotate(20 48 28)" />
        <ellipse cx="18" cy="30" rx="8" ry="5" fill="#D4E8F0" opacity="0.5" transform="rotate(-20 18 30)" />
        <ellipse cx="46" cy="30" rx="8" ry="5" fill="#D4E8F0" opacity="0.5" transform="rotate(20 46 30)" />
        {/* Body */}
        <ellipse cx="32" cy="36" rx="14" ry="12" fill="#E8DDD4" />
        {/* Head */}
        <circle cx="32" cy="22" r="10" fill="#E8DDD4" />
        {/* Ears */}
        <path d="M24 14 L26 20 L22 19 Z" fill="#E8DDD4" />
        <path d="M40 14 L38 20 L42 19 Z" fill="#E8DDD4" />
        <path d="M25 15 L26 19 L23 18 Z" fill="#F5D6C6" opacity="0.6" />
        <path d="M39 15 L38 19 L41 18 Z" fill="#F5D6C6" opacity="0.6" />
        {/* Happy eyes */}
        <path d="M27 22 Q29 19 31 22" stroke="#3D3D3D" strokeWidth="1.5" fill="none" />
        <path d="M33 22 Q35 19 37 22" stroke="#3D3D3D" strokeWidth="1.5" fill="none" />
        {/* Nose */}
        <path d="M30 25 L32 27 L34 25 Z" fill="#D4A59A" />
        {/* Big smile */}
        <path d="M28 28 Q32 32 36 28" stroke="#3D3D3D" strokeWidth="1" fill="none" />
        {/* Blush */}
        <circle cx="24" cy="24" r="2" fill="#F5C6C6" opacity="0.5" />
        <circle cx="40" cy="24" r="2" fill="#F5C6C6" opacity="0.5" />
        {/* Sparkles */}
        <path d="M8 16 L9 20 L12 18 L9 19 Z" fill="#FFE5A0" opacity="0.8" />
        <path d="M56 20 L54 24 L52 21 L55 22 Z" fill="#FFE5A0" opacity="0.8" />
        {/* Tail */}
        <path d="M44 40 Q52 36 50 44" stroke="#D4C4B5" strokeWidth="4" fill="none" strokeLinecap="round" />
      </svg>
    ),
    peeking: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        {/* Surface/ledge they're peeking from */}
        <rect x="0" y="44" width="64" height="20" fill="#A8C4B8" opacity="0.3" rx="4" />
        {/* Paws on ledge */}
        <ellipse cx="24" cy="44" rx="6" ry="4" fill="#E8DDD4" />
        <ellipse cx="40" cy="44" rx="6" ry="4" fill="#E8DDD4" />
        {/* Paw details */}
        <circle cx="22" cy="44" r="1.5" fill="#D4C4B5" opacity="0.5" />
        <circle cx="24" cy="45" r="1.5" fill="#D4C4B5" opacity="0.5" />
        <circle cx="26" cy="44" r="1.5" fill="#D4C4B5" opacity="0.5" />
        <circle cx="38" cy="44" r="1.5" fill="#D4C4B5" opacity="0.5" />
        <circle cx="40" cy="45" r="1.5" fill="#D4C4B5" opacity="0.5" />
        <circle cx="42" cy="44" r="1.5" fill="#D4C4B5" opacity="0.5" />
        {/* Head */}
        <circle cx="32" cy="32" r="14" fill="#E8DDD4" />
        {/* Ears */}
        <path d="M20 22 L24 30 L16 28 Z" fill="#E8DDD4" />
        <path d="M44 22 L40 30 L48 28 Z" fill="#E8DDD4" />
        <path d="M21 23 L24 29 L18 27 Z" fill="#F5D6C6" opacity="0.6" />
        <path d="M43 23 L40 29 L46 27 Z" fill="#F5D6C6" opacity="0.6" />
        {/* Big curious eyes */}
        <ellipse cx="26" cy="32" rx="4" ry="5" fill="white" />
        <ellipse cx="38" cy="32" rx="4" ry="5" fill="white" />
        <ellipse cx="26" cy="33" rx="3" ry="4" fill="#3D3D3D" />
        <ellipse cx="38" cy="33" rx="3" ry="4" fill="#3D3D3D" />
        <circle cx="27" cy="31" r="1.5" fill="white" />
        <circle cx="39" cy="31" r="1.5" fill="white" />
        {/* Nose */}
        <path d="M30 36 L32 38 L34 36 Z" fill="#D4A59A" />
        {/* Whiskers */}
        <line x1="20" y1="34" x2="10" y2="32" stroke="#B5A59A" strokeWidth="0.5" />
        <line x1="20" y1="36" x2="10" y2="37" stroke="#B5A59A" strokeWidth="0.5" />
        <line x1="44" y1="34" x2="54" y2="32" stroke="#B5A59A" strokeWidth="0.5" />
        <line x1="44" y1="36" x2="54" y2="37" stroke="#B5A59A" strokeWidth="0.5" />
        {/* Blush */}
        <circle cx="22" cy="36" r="2.5" fill="#F5C6C6" opacity="0.4" />
        <circle cx="42" cy="36" r="2.5" fill="#F5C6C6" opacity="0.4" />
      </svg>
    ),
    walking: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        {/* Body */}
        <ellipse cx="28" cy="36" rx="16" ry="12" fill="#E8DDD4" />
        {/* Head */}
        <circle cx="42" cy="28" r="12" fill="#E8DDD4" />
        {/* Ears */}
        <path d="M36 18 L38 24 L34 23 Z" fill="#E8DDD4" />
        <path d="M50 16 L48 22 L52 21 Z" fill="#E8DDD4" />
        <path d="M37 19 L38 23 L35 22 Z" fill="#F5D6C6" opacity="0.6" />
        <path d="M49 17 L48 21 L51 20 Z" fill="#F5D6C6" opacity="0.6" />
        {/* Eyes */}
        <ellipse cx="38" cy="28" rx="2.5" ry="3" fill="#3D3D3D" />
        <ellipse cx="46" cy="28" rx="2.5" ry="3" fill="#3D3D3D" />
        <circle cx="39" cy="27" r="0.8" fill="white" />
        <circle cx="47" cy="27" r="0.8" fill="white" />
        {/* Nose */}
        <path d="M41 31 L42 33 L43 31 Z" fill="#D4A59A" />
        {/* Mouth */}
        <path d="M40 34 Q42 36 44 34" stroke="#3D3D3D" strokeWidth="0.8" fill="none" opacity="0.6" />
        {/* Blush */}
        <circle cx="36" cy="30" r="2" fill="#F5C6C6" opacity="0.4" />
        <circle cx="48" cy="30" r="2" fill="#F5C6C6" opacity="0.4" />
        {/* Legs - walking pose */}
        <ellipse cx="18" cy="48" rx="4" ry="6" fill="#E8DDD4" transform="rotate(-15 18 48)" />
        <ellipse cx="28" cy="50" rx="4" ry="5" fill="#E8DDD4" />
        <ellipse cx="36" cy="48" rx="4" ry="6" fill="#E8DDD4" transform="rotate(10 36 48)" />
        {/* Tail - curved up happily */}
        <path d="M12 34 Q4 30 6 22 Q8 16 14 20" stroke="#D4C4B5" strokeWidth="5" fill="none" strokeLinecap="round" />
      </svg>
    ),
    waving: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        {/* Body */}
        <ellipse cx="32" cy="44" rx="16" ry="12" fill="#E8DDD4" />
        {/* Head */}
        <circle cx="32" cy="26" r="12" fill="#E8DDD4" />
        {/* Ears */}
        <path d="M22 16 L25 24 L19 23 Z" fill="#E8DDD4" />
        <path d="M42 16 L39 24 L45 23 Z" fill="#E8DDD4" />
        <path d="M23 17 L25 23 L20 22 Z" fill="#F5D6C6" opacity="0.6" />
        <path d="M41 17 L39 23 L44 22 Z" fill="#F5D6C6" opacity="0.6" />
        {/* Happy closed eyes */}
        <path d="M26 26 Q28 23 30 26" stroke="#3D3D3D" strokeWidth="1.5" fill="none" />
        <path d="M34 26 Q36 23 38 26" stroke="#3D3D3D" strokeWidth="1.5" fill="none" />
        {/* Nose */}
        <path d="M30 29 L32 31 L34 29 Z" fill="#D4A59A" />
        {/* Big smile */}
        <path d="M28 32 Q32 36 36 32" stroke="#3D3D3D" strokeWidth="1" fill="none" />
        {/* Blush */}
        <circle cx="24" cy="28" r="2.5" fill="#F5C6C6" opacity="0.5" />
        <circle cx="40" cy="28" r="2.5" fill="#F5C6C6" opacity="0.5" />
        {/* Waving paw */}
        <ellipse cx="12" cy="32" rx="5" ry="4" fill="#E8DDD4" transform="rotate(-30 12 32)" />
        {/* Motion lines */}
        <path d="M6 28 Q4 30 6 32" stroke="#B5A59A" strokeWidth="1" fill="none" opacity="0.4" />
        <path d="M4 26 Q2 30 4 34" stroke="#B5A59A" strokeWidth="1" fill="none" opacity="0.3" />
        {/* Sparkles */}
        <circle cx="8" cy="24" r="1.5" fill="#FFE5A0" opacity="0.8" />
        <circle cx="4" cy="30" r="1" fill="#FFE5A0" opacity="0.6" />
        {/* Tail */}
        <path d="M46 46 Q54 42 52 50" stroke="#D4C4B5" strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* Other paw */}
        <ellipse cx="40" cy="52" rx="5" ry="3" fill="#E8DDD4" />
      </svg>
    ),
  };

  return (
    <span 
      className={cn(
        sizes[size], 
        animated && animations[variant],
        "inline-block",
        className
      )}
    >
      {cats[variant]}
    </span>
  );
}

// Dust Bunny (Susuwatari) component
export function DustBunny({ className, size = "sm" }: { className?: string; size?: "xs" | "sm" | "md" }) {
  const sizes = { xs: "w-3 h-3", sm: "w-4 h-4", md: "w-6 h-6" };
  
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn(sizes[size], "animate-[ghibli-float_3s_ease-in-out_infinite]", className)}>
      <circle cx="12" cy="12" r="10" fill="#3D3D3D" />
      <circle cx="12" cy="12" r="8" fill="#4A4A4A" />
      {/* Fuzzy edges */}
      <circle cx="4" cy="12" r="2" fill="#3D3D3D" />
      <circle cx="20" cy="12" r="2" fill="#3D3D3D" />
      <circle cx="12" cy="4" r="2" fill="#3D3D3D" />
      <circle cx="12" cy="20" r="2" fill="#3D3D3D" />
      <circle cx="6" cy="6" r="1.5" fill="#3D3D3D" />
      <circle cx="18" cy="6" r="1.5" fill="#3D3D3D" />
      <circle cx="6" cy="18" r="1.5" fill="#3D3D3D" />
      <circle cx="18" cy="18" r="1.5" fill="#3D3D3D" />
      {/* Eyes */}
      <circle cx="9" cy="10" r="2" fill="white" />
      <circle cx="15" cy="10" r="2" fill="white" />
      <circle cx="9" cy="10" r="1" fill="#3D3D3D" />
      <circle cx="15" cy="10" r="1" fill="#3D3D3D" />
    </svg>
  );
}

// Floating Leaf component
export function FloatingLeaf({ className, variant = "green" }: { className?: string; variant?: "green" | "autumn" }) {
  const colors = {
    green: { main: "#8BA89A", highlight: "#A8C4B8" },
    autumn: { main: "#E8A878", highlight: "#F5C6A0" },
  };
  
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("w-5 h-5", className)}>
      <path 
        d="M12 2 C6 8 4 14 8 20 C10 18 14 16 18 14 C20 10 18 4 12 2 Z" 
        fill={colors[variant].main} 
        opacity="0.8"
      />
      <path 
        d="M12 4 C8 8 7 12 9 16 C10 15 12 14 14 13 C15 10 14 6 12 4 Z" 
        fill={colors[variant].highlight} 
        opacity="0.5"
      />
      <path d="M12 2 Q10 12 8 20" stroke={colors[variant].main} strokeWidth="0.5" fill="none" opacity="0.6" />
    </svg>
  );
}

// Small Mushroom component
export function Mushroom({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("w-6 h-6", className)}>
      {/* Cap */}
      <ellipse cx="12" cy="10" rx="10" ry="7" fill="#E8A878" />
      <ellipse cx="12" cy="9" rx="8" ry="5" fill="#F5D6B8" opacity="0.5" />
      {/* Spots */}
      <circle cx="8" cy="8" r="2" fill="#F5F0EA" opacity="0.8" />
      <circle cx="15" cy="7" r="1.5" fill="#F5F0EA" opacity="0.8" />
      <circle cx="12" cy="11" r="1" fill="#F5F0EA" opacity="0.6" />
      {/* Stem */}
      <rect x="9" y="14" width="6" height="8" rx="2" fill="#F5F0EA" />
      <rect x="10" y="15" width="4" height="6" rx="1" fill="white" opacity="0.5" />
    </svg>
  );
}

// Small Lantern component  
export function Lantern({ className, lit = true }: { className?: string; lit?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("w-6 h-6", className)}>
      {/* Glow effect when lit */}
      {lit && <circle cx="12" cy="12" r="10" fill="#FFE5A0" opacity="0.3" />}
      {/* Top hook */}
      <path d="M12 2 L12 4" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 4 L14 4" stroke="#8B7355" strokeWidth="1.5" strokeLinecap="round" />
      {/* Lantern body */}
      <rect x="7" y="6" width="10" height="14" rx="2" fill="#E8A878" opacity="0.9" />
      <rect x="8" y="7" width="8" height="12" rx="1" fill={lit ? "#FFE5A0" : "#F5D6B8"} />
      {/* Frame lines */}
      <line x1="7" y1="10" x2="17" y2="10" stroke="#8B7355" strokeWidth="0.5" />
      <line x1="7" y1="16" x2="17" y2="16" stroke="#8B7355" strokeWidth="0.5" />
      <line x1="12" y1="6" x2="12" y2="20" stroke="#8B7355" strokeWidth="0.5" />
      {/* Bottom */}
      <rect x="9" y="20" width="6" height="2" rx="1" fill="#8B7355" />
    </svg>
  );
}

// Cloud component
export function Cloud({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 24" fill="none" className={cn("w-12 h-6", className)}>
      <ellipse cx="16" cy="16" rx="12" ry="8" fill="white" opacity="0.8" />
      <ellipse cx="28" cy="14" rx="14" ry="10" fill="white" opacity="0.9" />
      <ellipse cx="38" cy="16" rx="10" ry="7" fill="white" opacity="0.8" />
      <ellipse cx="22" cy="10" rx="8" ry="6" fill="white" opacity="0.7" />
    </svg>
  );
}

// Sparkle/Star component
export function GhibliSparkle({ className, size = "sm" }: { className?: string; size?: "xs" | "sm" | "md" }) {
  const sizes = { xs: "w-3 h-3", sm: "w-4 h-4", md: "w-6 h-6" };
  
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn(sizes[size], className)}>
      <path 
        d="M12 2 L13 10 L20 12 L13 14 L12 22 L11 14 L4 12 L11 10 Z" 
        fill="currentColor"
      />
    </svg>
  );
}
