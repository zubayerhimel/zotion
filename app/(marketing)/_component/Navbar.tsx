'use client';

import { useConvexAuth } from 'convex/react';
import { SignInButton, UserButton } from '@clerk/clerk-react';
import Link from 'next/link';

import { useScrollTop } from '@/hooks/use-scroll-top';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Spinner } from '@/components/spinner';
import { cn } from '@/lib/utils';

import Logo from './Logo';

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();

  return (
    <div className={cn('z-50 bg-background fixed top-0 flex items-center w-full py-4 px-6 dark:bg-[#1f1f1f]', scrolled && 'border-b shadow-sm')}>
      <Logo />
      <div className='md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2'>
        {isLoading && <Spinner />}

        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode='modal'>
              <Button variant='ghost' size='sm'>
                Login
              </Button>
            </SignInButton>
            <SignInButton mode='modal'>
              <Button size='sm'>Get Zotion Free</Button>
            </SignInButton>
          </>
        )}

        {isAuthenticated && !isLoading && (
          <>
            <Button variant='ghost' asChild>
              <Link href='/documents'>Enter Zotion</Link>
            </Button>
            <UserButton afterSignOutUrl='/' />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
