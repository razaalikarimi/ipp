'use client';
import { cn } from '@/lib/utils';

export default function Logo({ className, variant = 'full', scrolled = false }) {
  return (
    <div className={cn("relative transition-all duration-300", className)}>
      {/* Compact Logo Box - Dynamic size based on scroll state */}
      <div className={cn(
        "bg-white border transition-all duration-500 flex flex-col items-center",
        scrolled 
          ? "px-2 py-1.5 rounded-[10px] shadow-sm border-[#F1F1F1] min-w-[120px] scale-80" 
          : "px-5 py-4 rounded-[20px] shadow-2xl border-[#E5E7EB] min-w-[190px]"
      )}>
         {/* Smaller exact image asset */}
         <div className={cn(
           "relative h-auto flex items-center justify-center transition-all duration-500",
           scrolled ? "w-[90px]" : "w-[160px]"
         )}>
            <img 
              src="/eisr_logo.png" 
              alt="EISR Eye-Innovations Scientific Research" 
              className="w-full h-auto object-contain"
            />
         </div>
      </div>
    </div>
  );
}
