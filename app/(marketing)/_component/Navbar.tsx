'use client';

import { useScrollTop } from '@/hooks/use-scroll-top';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';

const Navbar = () => {
  const scrolled = useScrollTop();

  return (
    <div className={cn('z-50 bg-background fixed top-0 flex items-center w-full py-4 px-6 dark:bg-[#1f1f1f]', scrolled && 'border-b shadow-sm')}>
      <Logo />
      <div className='md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2'>
        <Button variant='ghost'>Login</Button>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
