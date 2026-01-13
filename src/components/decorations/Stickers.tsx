import { useState } from "react";
import { cn } from "@/lib/utils";

export interface Sticker {
  id: string;
  emoji: string;
  name: string;
  category: "hearts" | "stars" | "animals" | "flowers" | "food" | "sparkles" | "emotions";
}

export const STICKERS: Sticker[] = [
  // Hearts
  { id: "heart1", emoji: "💖", name: "Pink Heart", category: "hearts" },
  { id: "heart2", emoji: "💕", name: "Two Hearts", category: "hearts" },
  { id: "heart3", emoji: "💗", name: "Growing Heart", category: "hearts" },
  { id: "heart4", emoji: "💝", name: "Gift Heart", category: "hearts" },
  { id: "heart5", emoji: "💞", name: "Revolving Hearts", category: "hearts" },
  { id: "heart6", emoji: "🩷", name: "Light Pink Heart", category: "hearts" },
  { id: "heart7", emoji: "🩵", name: "Light Blue Heart", category: "hearts" },
  { id: "heart8", emoji: "💜", name: "Purple Heart", category: "hearts" },
  
  // Stars & Sparkles
  { id: "star1", emoji: "⭐", name: "Star", category: "stars" },
  { id: "star2", emoji: "🌟", name: "Glowing Star", category: "stars" },
  { id: "star3", emoji: "✨", name: "Sparkles", category: "sparkles" },
  { id: "star4", emoji: "💫", name: "Dizzy", category: "sparkles" },
  { id: "star5", emoji: "🌠", name: "Shooting Star", category: "stars" },
  { id: "star6", emoji: "⚡", name: "Lightning", category: "sparkles" },
  
  // Animals
  { id: "animal1", emoji: "🦋", name: "Butterfly", category: "animals" },
  { id: "animal2", emoji: "🐱", name: "Cat", category: "animals" },
  { id: "animal3", emoji: "🐰", name: "Bunny", category: "animals" },
  { id: "animal4", emoji: "🦄", name: "Unicorn", category: "animals" },
  { id: "animal5", emoji: "🐻", name: "Bear", category: "animals" },
  { id: "animal6", emoji: "🐼", name: "Panda", category: "animals" },
  { id: "animal7", emoji: "🦊", name: "Fox", category: "animals" },
  { id: "animal8", emoji: "🐶", name: "Dog", category: "animals" },
  
  // Flowers
  { id: "flower1", emoji: "🌸", name: "Cherry Blossom", category: "flowers" },
  { id: "flower2", emoji: "🌷", name: "Tulip", category: "flowers" },
  { id: "flower3", emoji: "🌹", name: "Rose", category: "flowers" },
  { id: "flower4", emoji: "🌺", name: "Hibiscus", category: "flowers" },
  { id: "flower5", emoji: "🌻", name: "Sunflower", category: "flowers" },
  { id: "flower6", emoji: "💐", name: "Bouquet", category: "flowers" },
  { id: "flower7", emoji: "🪻", name: "Hyacinth", category: "flowers" },
  { id: "flower8", emoji: "🌼", name: "Blossom", category: "flowers" },
  
  // Food
  { id: "food1", emoji: "🍰", name: "Cake", category: "food" },
  { id: "food2", emoji: "🧁", name: "Cupcake", category: "food" },
  { id: "food3", emoji: "🍩", name: "Donut", category: "food" },
  { id: "food4", emoji: "🍪", name: "Cookie", category: "food" },
  { id: "food5", emoji: "🍓", name: "Strawberry", category: "food" },
  { id: "food6", emoji: "🍒", name: "Cherries", category: "food" },
  { id: "food7", emoji: "☕", name: "Coffee", category: "food" },
  { id: "food8", emoji: "🧋", name: "Boba Tea", category: "food" },
  
  // Emotions
  { id: "emotion1", emoji: "🥰", name: "Love Face", category: "emotions" },
  { id: "emotion2", emoji: "😊", name: "Happy", category: "emotions" },
  { id: "emotion3", emoji: "🤗", name: "Hugging", category: "emotions" },
  { id: "emotion4", emoji: "😍", name: "Heart Eyes", category: "emotions" },
  { id: "emotion5", emoji: "🥺", name: "Pleading", category: "emotions" },
  { id: "emotion6", emoji: "😇", name: "Angel", category: "emotions" },
  { id: "emotion7", emoji: "🤩", name: "Star Eyes", category: "emotions" },
  { id: "emotion8", emoji: "😸", name: "Happy Cat", category: "emotions" },
];

const CATEGORIES = [
  { id: "hearts", name: "Hearts", icon: "💖" },
  { id: "stars", name: "Stars", icon: "⭐" },
  { id: "sparkles", name: "Sparkles", icon: "✨" },
  { id: "animals", name: "Animals", icon: "🦋" },
  { id: "flowers", name: "Flowers", icon: "🌸" },
  { id: "food", name: "Food", icon: "🧁" },
  { id: "emotions", name: "Emotions", icon: "🥰" },
];

interface StickerPickerProps {
  selectedStickers: string[];
  onStickerToggle: (stickerId: string) => void;
  maxStickers?: number;
}

export function StickerPicker({ selectedStickers, onStickerToggle, maxStickers = 5 }: StickerPickerProps) {
  const [activeCategory, setActiveCategory] = useState<string>("hearts");

  const filteredStickers = STICKERS.filter(s => s.category === activeCategory);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Add Stickers ✨</span>
        <span className="text-xs text-muted-foreground">
          {selectedStickers.length}/{maxStickers} selected
        </span>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "px-2 py-1 rounded-full text-xs transition-all font-quicksand",
              activeCategory === cat.id
                ? "bg-gradient-to-r from-[#FF8FAB] to-[#FFB6D9] text-white shadow-md"
                : "bg-[#FFB6D9]/20 hover:bg-[#FFB6D9]/40 text-foreground"
            )}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Sticker grid */}
      <div className="grid grid-cols-8 gap-1 p-2 bg-gradient-to-r from-[#FFB6D9]/20 to-[#D4B4F1]/20 rounded-xl border border-[#FFB6D9]/30">
        {filteredStickers.map((sticker) => {
          const isSelected = selectedStickers.includes(sticker.id);
          const canSelect = selectedStickers.length < maxStickers || isSelected;

          return (
            <button
              key={sticker.id}
              type="button"
              onClick={() => canSelect && onStickerToggle(sticker.id)}
              disabled={!canSelect}
              className={cn(
                "sticker text-2xl rounded-xl p-1 transition-all",
                isSelected && "sticker-selected bg-gradient-to-r from-[#D4B4F1]/50 to-[#E5D4FF]/50 shadow-md",
                !canSelect && "opacity-40 cursor-not-allowed",
                canSelect && !isSelected && "hover:bg-[#FFB6D9]/30"
              )}
              title={sticker.name}
            >
              {sticker.emoji}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface StickerDisplayProps {
  stickerIds: string[];
  size?: "sm" | "md" | "lg";
}

export function StickerDisplay({ stickerIds, size = "md" }: StickerDisplayProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  if (stickerIds.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1">
      {stickerIds.map((id, index) => {
        const sticker = STICKERS.find(s => s.id === id);
        if (!sticker) return null;

        return (
          <span
            key={`${id}-${index}`}
            className={cn(
              sizeClasses[size],
              "animate-bounce-slow",
              index % 2 === 0 ? "animate-wiggle" : ""
            )}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {sticker.emoji}
          </span>
        );
      })}
    </div>
  );
}

export function getStickersFromIds(ids: string[]): Sticker[] {
  return ids.map(id => STICKERS.find(s => s.id === id)).filter(Boolean) as Sticker[];
}
