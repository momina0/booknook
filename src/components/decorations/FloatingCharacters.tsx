import { GhibliCat, DustBunny, FloatingLeaf, GhibliSparkle } from "./GhibliCat";

export function FloatingCharacters() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating Ghibli decorations */}
      <div className="absolute top-20 left-[10%] animate-[ghibli-float_6s_ease-in-out_infinite] opacity-20">
        <GhibliCat variant="sitting" size="sm" animated />
      </div>
      <div className="absolute top-40 right-[15%] opacity-15" style={{ animationDelay: "0.5s" }}>
        <DustBunny size="sm" />
      </div>
      <div className="absolute bottom-32 left-[5%] opacity-20">
        <FloatingLeaf variant="green" className="animate-[leafFall_8s_ease-in-out_infinite]" />
      </div>
      <div className="absolute top-1/4 right-[8%] animate-[ghibli-float_5s_ease-in-out_infinite] opacity-15" style={{ animationDelay: "1.2s" }}>
        <GhibliCat variant="peeking" size="xs" animated />
      </div>
      <div className="absolute bottom-20 right-[12%] opacity-20" style={{ animationDelay: "1s" }}>
        <GhibliSparkle size="sm" />
      </div>
      <div className="absolute top-[60%] left-[3%] opacity-15">
        <GhibliCat variant="sleeping" size="xs" animated />
      </div>
      <div className="absolute top-16 left-[30%] opacity-15" style={{ animationDelay: "0.7s" }}>
        <DustBunny size="xs" />
      </div>
      <div className="absolute bottom-40 right-[25%] animate-[ghibli-float_7s_ease-in-out_infinite] opacity-15" style={{ animationDelay: "1.5s" }}>
        <FloatingLeaf variant="autumn" className="animate-[leafFall_10s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}

export function SmallSparkle({ className }: { className?: string }) {
  return (
    <span className={`inline-block animate-sparkle ${className}`}>
      <GhibliSparkle size="xs" />
    </span>
  );
}

export function HeartIcon({ className }: { className?: string }) {
  return (
    <span className={`inline-block animate-sparkle ${className}`}>
      <GhibliSparkle size="xs" />
    </span>
  );
}
