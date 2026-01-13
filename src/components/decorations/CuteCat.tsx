import { cn } from "@/lib/utils";

interface CuteCatProps {
  variant?: "sitting" | "reading" | "sleeping" | "waving" | "heart" | "star" | "book" | "sparkle";
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  animated?: boolean;
}

export function CuteCat({ variant = "sitting", size = "md", className, animated = true }: CuteCatProps) {
  const sizes = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const animations = {
    sitting: "animate-bounce-slow",
    reading: "animate-wiggle",
    sleeping: "animate-pulse",
    waving: "animate-wiggle",
    heart: "animate-heart-beat",
    star: "animate-sparkle",
    book: "animate-float",
    sparkle: "animate-sparkle",
  };

  // SVG cats inspired by Pusheen style
  const cats = {
    sitting: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        {/* Body */}
        <ellipse cx="32" cy="40" rx="20" ry="16" fill="#9B8B9E" />
        {/* Head */}
        <circle cx="32" cy="26" r="16" fill="#9B8B9E" />
        {/* Ears */}
        <path d="M18 16 L22 26 L14 24 Z" fill="#9B8B9E" />
        <path d="M46 16 L42 26 L50 24 Z" fill="#9B8B9E" />
        <path d="M19 17 L22 24 L16 23 Z" fill="#E8B4C8" />
        <path d="M45 17 L42 24 L48 23 Z" fill="#E8B4C8" />
        {/* Eyes */}
        <ellipse cx="26" cy="26" rx="3" ry="4" fill="#2D2D2D" />
        <ellipse cx="38" cy="26" rx="3" ry="4" fill="#2D2D2D" />
        <circle cx="27" cy="25" r="1" fill="white" />
        <circle cx="39" cy="25" r="1" fill="white" />
        {/* Nose */}
        <ellipse cx="32" cy="30" rx="2" ry="1.5" fill="#E8A0BF" />
        {/* Mouth */}
        <path d="M29 32 Q32 35 35 32" stroke="#2D2D2D" strokeWidth="1" fill="none" />
        {/* Whiskers */}
        <line x1="20" y1="28" x2="10" y2="26" stroke="#2D2D2D" strokeWidth="0.5" />
        <line x1="20" y1="30" x2="10" y2="30" stroke="#2D2D2D" strokeWidth="0.5" />
        <line x1="44" y1="28" x2="54" y2="26" stroke="#2D2D2D" strokeWidth="0.5" />
        <line x1="44" y1="30" x2="54" y2="30" stroke="#2D2D2D" strokeWidth="0.5" />
        {/* Tail */}
        <path d="M50 44 Q60 40 58 50" stroke="#9B8B9E" strokeWidth="6" fill="none" strokeLinecap="round" />
        {/* Paws */}
        <ellipse cx="24" cy="52" rx="6" ry="4" fill="#9B8B9E" />
        <ellipse cx="40" cy="52" rx="6" ry="4" fill="#9B8B9E" />
      </svg>
    ),
    reading: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        {/* Body */}
        <ellipse cx="32" cy="42" rx="18" ry="14" fill="#9B8B9E" />
        {/* Head */}
        <circle cx="32" cy="24" r="14" fill="#9B8B9E" />
        {/* Ears */}
        <path d="M20 14 L23 22 L16 21 Z" fill="#9B8B9E" />
        <path d="M44 14 L41 22 L48 21 Z" fill="#9B8B9E" />
        <path d="M21 15 L23 20 L18 20 Z" fill="#E8B4C8" />
        <path d="M43 15 L41 20 L46 20 Z" fill="#E8B4C8" />
        {/* Eyes - looking down */}
        <path d="M25 24 Q27 28 29 24" stroke="#2D2D2D" strokeWidth="2" fill="none" />
        <path d="M35 24 Q37 28 39 24" stroke="#2D2D2D" strokeWidth="2" fill="none" />
        {/* Nose */}
        <ellipse cx="32" cy="28" rx="1.5" ry="1" fill="#E8A0BF" />
        {/* Blush */}
        <circle cx="23" cy="28" r="3" fill="#FFB6C1" opacity="0.5" />
        <circle cx="41" cy="28" r="3" fill="#FFB6C1" opacity="0.5" />
        {/* Book */}
        <rect x="18" y="38" width="28" height="18" rx="2" fill="#B19CD9" />
        <line x1="32" y1="38" x2="32" y2="56" stroke="#9370DB" strokeWidth="2" />
        <rect x="20" y="40" width="10" height="1" fill="#E8E8E8" />
        <rect x="34" y="40" width="10" height="1" fill="#E8E8E8" />
        <rect x="20" y="43" width="8" height="1" fill="#E8E8E8" />
        <rect x="34" y="43" width="8" height="1" fill="#E8E8E8" />
        {/* Paws on book */}
        <ellipse cx="25" cy="38" rx="4" ry="3" fill="#9B8B9E" />
        <ellipse cx="39" cy="38" rx="4" ry="3" fill="#9B8B9E" />
      </svg>
    ),
    sleeping: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        {/* Body - lying down */}
        <ellipse cx="32" cy="44" rx="24" ry="12" fill="#9B8B9E" />
        {/* Head */}
        <circle cx="32" cy="32" r="14" fill="#9B8B9E" />
        {/* Ears */}
        <path d="M20 22 L23 30 L16 29 Z" fill="#9B8B9E" />
        <path d="M44 22 L41 30 L48 29 Z" fill="#9B8B9E" />
        <path d="M21 23 L23 28 L18 28 Z" fill="#E8B4C8" />
        <path d="M43 23 L41 28 L46 28 Z" fill="#E8B4C8" />
        {/* Closed eyes */}
        <path d="M25 32 Q27 30 29 32" stroke="#2D2D2D" strokeWidth="2" fill="none" />
        <path d="M35 32 Q37 30 39 32" stroke="#2D2D2D" strokeWidth="2" fill="none" />
        {/* Nose */}
        <ellipse cx="32" cy="36" rx="1.5" ry="1" fill="#E8A0BF" />
        {/* Blush */}
        <circle cx="24" cy="36" r="3" fill="#FFB6C1" opacity="0.5" />
        <circle cx="40" cy="36" r="3" fill="#FFB6C1" opacity="0.5" />
        {/* Zzz */}
        <text x="48" y="22" fill="#B19CD9" fontSize="8" fontWeight="bold">Z</text>
        <text x="52" y="16" fill="#B19CD9" fontSize="6" fontWeight="bold">z</text>
        <text x="55" y="12" fill="#B19CD9" fontSize="4" fontWeight="bold">z</text>
        {/* Tail curled */}
        <path d="M52 44 Q58 42 56 48 Q54 52 50 50" stroke="#9B8B9E" strokeWidth="6" fill="none" strokeLinecap="round" />
      </svg>
    ),
    waving: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        {/* Body */}
        <ellipse cx="32" cy="44" rx="18" ry="14" fill="#9B8B9E" />
        {/* Head */}
        <circle cx="32" cy="26" r="14" fill="#9B8B9E" />
        {/* Ears */}
        <path d="M20 16 L23 24 L16 23 Z" fill="#9B8B9E" />
        <path d="M44 16 L41 24 L48 23 Z" fill="#9B8B9E" />
        <path d="M21 17 L23 22 L18 22 Z" fill="#E8B4C8" />
        <path d="M43 17 L41 22 L46 22 Z" fill="#E8B4C8" />
        {/* Happy eyes */}
        <path d="M25 26 Q27 22 29 26" stroke="#2D2D2D" strokeWidth="2" fill="none" />
        <path d="M35 26 Q37 22 39 26" stroke="#2D2D2D" strokeWidth="2" fill="none" />
        {/* Nose */}
        <ellipse cx="32" cy="28" rx="1.5" ry="1" fill="#E8A0BF" />
        {/* Mouth - happy */}
        <path d="M29 30 Q32 34 35 30" stroke="#2D2D2D" strokeWidth="1" fill="none" />
        {/* Blush */}
        <circle cx="23" cy="28" r="3" fill="#FFB6C1" opacity="0.5" />
        <circle cx="41" cy="28" r="3" fill="#FFB6C1" opacity="0.5" />
        {/* Waving paw */}
        <ellipse cx="14" cy="34" rx="5" ry="4" fill="#9B8B9E" transform="rotate(-30 14 34)" />
        {/* Sparkles */}
        <text x="8" y="28" fill="#FFD700" fontSize="6">✦</text>
        <text x="4" y="36" fill="#FFD700" fontSize="4">✦</text>
        {/* Tail */}
        <path d="M48 46 Q56 42 54 50" stroke="#9B8B9E" strokeWidth="5" fill="none" strokeLinecap="round" />
      </svg>
    ),
    heart: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        {/* Body */}
        <ellipse cx="32" cy="46" rx="16" ry="12" fill="#9B8B9E" />
        {/* Head */}
        <circle cx="32" cy="30" r="12" fill="#9B8B9E" />
        {/* Ears */}
        <path d="M22 20 L24 26 L18 25 Z" fill="#9B8B9E" />
        <path d="M42 20 L40 26 L46 25 Z" fill="#9B8B9E" />
        <path d="M23 21 L24 25 L20 24 Z" fill="#E8B4C8" />
        <path d="M41 21 L40 25 L44 24 Z" fill="#E8B4C8" />
        {/* Heart eyes */}
        <path d="M24 29 L26 27 L28 29 L26 32 Z" fill="#FF6B9D" />
        <path d="M36 29 L38 27 L40 29 L38 32 Z" fill="#FF6B9D" />
        {/* Nose */}
        <ellipse cx="32" cy="32" rx="1.5" ry="1" fill="#E8A0BF" />
        {/* Heart above */}
        <path d="M32 8 C28 4 22 8 22 14 C22 20 32 26 32 26 C32 26 42 20 42 14 C42 8 36 4 32 8" fill="#FF6B9D" />
        {/* Blush */}
        <circle cx="24" cy="34" r="2" fill="#FFB6C1" opacity="0.5" />
        <circle cx="40" cy="34" r="2" fill="#FFB6C1" opacity="0.5" />
      </svg>
    ),
    star: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        {/* Body */}
        <ellipse cx="32" cy="44" rx="16" ry="12" fill="#9B8B9E" />
        {/* Head */}
        <circle cx="32" cy="28" r="12" fill="#9B8B9E" />
        {/* Ears */}
        <path d="M22 18 L24 24 L18 23 Z" fill="#9B8B9E" />
        <path d="M42 18 L40 24 L46 23 Z" fill="#9B8B9E" />
        <path d="M23 19 L24 23 L20 22 Z" fill="#E8B4C8" />
        <path d="M41 19 L40 23 L44 22 Z" fill="#E8B4C8" />
        {/* Sparkle eyes */}
        <text x="23" y="30" fill="#FFD700" fontSize="8">★</text>
        <text x="35" y="30" fill="#FFD700" fontSize="8">★</text>
        {/* Nose */}
        <ellipse cx="32" cy="32" rx="1.5" ry="1" fill="#E8A0BF" />
        {/* Stars around */}
        <text x="8" y="16" fill="#FFD700" fontSize="8">✦</text>
        <text x="52" y="20" fill="#FFD700" fontSize="6">✦</text>
        <text x="50" y="56" fill="#FFD700" fontSize="7">✦</text>
        <text x="6" y="50" fill="#FFD700" fontSize="5">✦</text>
        {/* Blush */}
        <circle cx="24" cy="34" r="2" fill="#FFB6C1" opacity="0.5" />
        <circle cx="40" cy="34" r="2" fill="#FFB6C1" opacity="0.5" />
      </svg>
    ),
    book: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        {/* Book */}
        <rect x="8" y="24" width="48" height="32" rx="3" fill="#B19CD9" />
        <rect x="8" y="24" width="24" height="32" fill="#9370DB" />
        <line x1="32" y1="24" x2="32" y2="56" stroke="#7B68EE" strokeWidth="2" />
        {/* Cat peeking over book */}
        <circle cx="32" cy="20" r="10" fill="#9B8B9E" />
        {/* Ears */}
        <path d="M24 12 L26 18 L20 17 Z" fill="#9B8B9E" />
        <path d="M40 12 L38 18 L44 17 Z" fill="#9B8B9E" />
        <path d="M25 13 L26 17 L22 16 Z" fill="#E8B4C8" />
        <path d="M39 13 L38 17 L42 16 Z" fill="#E8B4C8" />
        {/* Paws on book */}
        <ellipse cx="22" cy="26" rx="5" ry="3" fill="#9B8B9E" />
        <ellipse cx="42" cy="26" rx="5" ry="3" fill="#9B8B9E" />
        {/* Eyes */}
        <ellipse cx="28" cy="20" rx="2" ry="2.5" fill="#2D2D2D" />
        <ellipse cx="36" cy="20" rx="2" ry="2.5" fill="#2D2D2D" />
        <circle cx="29" cy="19" r="0.8" fill="white" />
        <circle cx="37" cy="19" r="0.8" fill="white" />
        {/* Nose */}
        <ellipse cx="32" cy="23" rx="1" ry="0.8" fill="#E8A0BF" />
      </svg>
    ),
    sparkle: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        {/* Main sparkle */}
        <path d="M32 4 L34 28 L58 32 L34 36 L32 60 L30 36 L6 32 L30 28 Z" fill="url(#sparkleGradient)" />
        {/* Smaller sparkles */}
        <path d="M16 12 L17 18 L22 20 L17 22 L16 28 L15 22 L10 20 L15 18 Z" fill="#FFD700" />
        <path d="M48 44 L49 50 L54 52 L49 54 L48 60 L47 54 L42 52 L47 50 Z" fill="#FF6B9D" />
        <defs>
          <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FF6B9D" />
            <stop offset="100%" stopColor="#B19CD9" />
          </linearGradient>
        </defs>
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

// Icon versions for UI elements
export function CatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("w-5 h-5", className)}>
      <circle cx="12" cy="11" r="6" fill="currentColor" opacity="0.9" />
      <path d="M7 6 L8 9 L5 8.5 Z" fill="currentColor" />
      <path d="M17 6 L16 9 L19 8.5 Z" fill="currentColor" />
      <circle cx="10" cy="10" r="1" fill="white" />
      <circle cx="14" cy="10" r="1" fill="white" />
      <ellipse cx="12" cy="12" rx="0.8" ry="0.5" fill="#E8A0BF" />
    </svg>
  );
}

export function HeartCatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("w-5 h-5", className)}>
      <path d="M12 4 C9 1 4 3 4 8 C4 13 12 18 12 18 C12 18 20 13 20 8 C20 3 15 1 12 4" fill="#FF6B9D" />
      <circle cx="12" cy="14" r="4" fill="#9B8B9E" />
      <path d="M9 11 L10 13 L8 12.5 Z" fill="#9B8B9E" />
      <path d="M15 11 L14 13 L16 12.5 Z" fill="#9B8B9E" />
      <circle cx="11" cy="13.5" r="0.6" fill="#2D2D2D" />
      <circle cx="13" cy="13.5" r="0.6" fill="#2D2D2D" />
    </svg>
  );
}

export function BookCatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("w-5 h-5", className)}>
      <rect x="4" y="10" width="16" height="10" rx="1" fill="#B19CD9" />
      <rect x="4" y="10" width="8" height="10" fill="#9370DB" />
      <circle cx="12" cy="8" r="4" fill="#9B8B9E" />
      <path d="M9 5 L10 7 L8 6.5 Z" fill="#9B8B9E" />
      <path d="M15 5 L14 7 L16 6.5 Z" fill="#9B8B9E" />
      <circle cx="11" cy="7.5" r="0.6" fill="#2D2D2D" />
      <circle cx="13" cy="7.5" r="0.6" fill="#2D2D2D" />
      <ellipse cx="8" cy="11" rx="2" ry="1" fill="#9B8B9E" />
      <ellipse cx="16" cy="11" rx="2" ry="1" fill="#9B8B9E" />
    </svg>
  );
}

export function StarCatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("w-5 h-5", className)}>
      <path d="M12 2 L13 8 L19 9 L13 10 L12 16 L11 10 L5 9 L11 8 Z" fill="#FFD700" />
      <circle cx="12" cy="16" r="4" fill="#9B8B9E" />
      <path d="M9 13 L10 15 L8 14.5 Z" fill="#9B8B9E" />
      <path d="M15 13 L14 15 L16 14.5 Z" fill="#9B8B9E" />
      <circle cx="11" cy="15.5" r="0.6" fill="#2D2D2D" />
      <circle cx="13" cy="15.5" r="0.6" fill="#2D2D2D" />
    </svg>
  );
}

export function PenCatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("w-5 h-5", className)}>
      <path d="M4 20 L6 14 L18 2 L22 6 L10 18 Z" fill="#B19CD9" />
      <path d="M4 20 L6 14 L8 16 Z" fill="#E8A0BF" />
      <circle cx="12" cy="16" r="4" fill="#9B8B9E" />
      <path d="M9 13 L10 15 L8 14.5 Z" fill="#9B8B9E" />
      <path d="M15 13 L14 15 L16 14.5 Z" fill="#9B8B9E" />
      <circle cx="11" cy="15.5" r="0.6" fill="#2D2D2D" />
      <circle cx="13" cy="15.5" r="0.6" fill="#2D2D2D" />
    </svg>
  );
}

export function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("w-5 h-5", className)}>
      <path d="M12 2 L13 10 L20 12 L13 14 L12 22 L11 14 L4 12 L11 10 Z" fill="currentColor" />
      <path d="M5 3 L5.5 6 L8 6.5 L5.5 7 L5 10 L4.5 7 L2 6.5 L4.5 6 Z" fill="currentColor" opacity="0.6" />
      <path d="M19 14 L19.5 17 L22 17.5 L19.5 18 L19 21 L18.5 18 L16 17.5 L18.5 17 Z" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("w-5 h-5", className)}>
      <path d="M3 12 L12 3 L21 12" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M5 12 L5 20 L19 20 L19 12" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="9" y="14" width="6" height="6" fill="currentColor" opacity="0.3" />
      {/* Cat in window */}
      <circle cx="12" cy="16" r="2" fill="#9B8B9E" />
      <path d="M11 15 L11.3 16 L10.5 15.8 Z" fill="#9B8B9E" />
      <path d="M13 15 L12.7 16 L13.5 15.8 Z" fill="#9B8B9E" />
    </svg>
  );
}
