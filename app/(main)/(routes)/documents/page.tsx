'use client';

import { useUser } from '@clerk/clerk-react';
import { PlusCircle } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

const Documents = () => {
  const { user } = useUser();

  return (
    <div className='h-full flex flex-col justify-center items-center space-y-4'>
      <Image src='/empty.png' alt='No content' height={300} width={300} className='dark:hidden' />
      <Image src='/empty-dark.png' alt='No content' height={300} width={300} className='dark:block hidden' />
      <h2 className='text-lg font-medium'>Welcome to {user?.firstName}&apos;s Zotion</h2>
      <Button size='sm'>
        <PlusCircle className='w-4 h-4 mr-2' /> Create new note
      </Button>
    </div>
  );
};

export default Documents;
