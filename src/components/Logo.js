'use client';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Logo({ className, variant = 'full', src }) {
  const pathname = usePathname();

  // Decide logo source
  let finalSrc = src || '/eisr_logo.png';

  return (
    <div className={cn('relative transition-all duration-300', className)}>
      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center w-[200px] lg:w-[240px] h-[60px] lg:h-[70px]">
          <Image
            src={finalSrc}
            alt="Journal Logo"
            fill
            sizes="(max-width: 768px) 200px, 240px"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
