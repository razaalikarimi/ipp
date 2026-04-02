'use client';

import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Logo({ className, variant = 'full', src }) {
  const pathname = usePathname();

  // Path-based logo routing
  const isJEIML =
    pathname === '/journals/jeiml' ||
    pathname.startsWith('/journals/jeiml/');

  const isJCSRA =
    pathname === '/journals/jcsra' ||
    pathname.startsWith('/journals/jcsra/');

  // Decide logo source
  let finalSrc = src;
  if (!finalSrc) {
    if (isJEIML) finalSrc = '/jeiml_logo.png';
    else if (isJCSRA) finalSrc = '/jcsra_logo.png';
    else finalSrc = '/eisr_logo.png';
  }

  return (
    <div className={cn('relative transition-all duration-300', className)}>
      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center w-[200px] lg:w-[240px] h-[80px] lg:h-[90px]">
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
