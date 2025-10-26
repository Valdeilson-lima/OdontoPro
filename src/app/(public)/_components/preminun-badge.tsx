import { Star } from "lucide-react";

interface PremiumBadgeProps {
  label?: string;
  className?: string;
}

export function PremiumBadge({ label = "Premium", className = "" }: PremiumBadgeProps) {
  return (
    <div
      className={`absolute top-2 right-2 z-20 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg ${className}`}
      aria-label={label}
      title={label}
    >
      <Star className="w-4 h-4" />
      <span className="uppercase tracking-wider select-none">{label}</span>
    </div>
  );
}
