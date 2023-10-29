'use client';

import { SignInButton } from '@clerk/clerk-react';
import { useConvexAuth } from 'convex/react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className='max-w-3xl space-y-4'>
      <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
        Your Ideas, Documents & Plans unified. Welcome to <span className='underline'>Zotion</span>
      </h1>
      <h3 className='text-base sm:text-xl md:text-2xl font-medium'>Zotion is a connected workspace magic happens better, faster</h3>
      {isLoading && (
        <div className='w-full flex justify-center items-center'>
          <Spinner size='lg' />
        </div>
      )}

      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href='/documents'>
            Enter Zotion <ArrowRight className='h-4 w-4 ml-2' />
          </Link>
        </Button>
      )}

      {!isLoading && !isAuthenticated && (
        <SignInButton mode='modal'>
          <Button>
            Get Zotion Free <ArrowRight className='h-4 w-4 ml-2' />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};

export default Heading;
