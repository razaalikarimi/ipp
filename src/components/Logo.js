'use client';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function Logo({ className, variant = 'full', src }) {
  const pathname = usePathname();
  
  // Path-based logo routing
  const isJEIML = pathname === '/journals/jeiml' || pathname.startsWith('/journals/jeiml/');
  const isJCSRA = pathname === '/journals/jcsra' || pathname.startsWith('/journals/jcsra/');
  
  let finalSrc = src;
  if (!finalSrc) {
    if (isJEIML) finalSrc = '/jeiml_logo.png';
    else if (isJCSRA) finalSrc = '/jcsra_logo.png';
    else finalSrc = '/eisr_logo.png';
  }

  return (
    <div className={cn("relative transition-all duration-300", className)}>
      <div className="flex flex-col items-center">
         <div className="relative h-full flex items-center justify-center w-[160px]">
            <img 
              src={finalSrc} 
              alt="Journal Logo" 
              className="w-full h-auto object-contain max-h-[70px]"
            />
         </div>
      </div>
    </div>
  );
}
