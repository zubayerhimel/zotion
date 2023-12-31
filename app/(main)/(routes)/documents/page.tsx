'use client';

import { useUser } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';
import { PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';

const Documents = () => {
  const { user } = useUser();
  const router = useRouter();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: 'Untitled' }).then((documentId) => router.push(`/documents/${documentId}`));

    toast.promise(promise, {
      loading: 'Creating a new note...',
      success: 'Successfully created a new note',
      error: 'Failed to create a new note',
    });
  };

  return (
    <div className='h-full flex flex-col justify-center items-center space-y-4'>
      <Image src='/empty.png' alt='No content' height={300} width={300} className='dark:hidden' />
      <Image src='/empty-dark.png' alt='No content' height={300} width={300} className='dark:block hidden' />
      <h2 className='text-lg font-medium'>Welcome to {user?.firstName}&apos;s Zotion</h2>
      <Button size='sm' onClick={onCreate}>
        <PlusCircle className='w-4 h-4 mr-2' /> Create new note
      </Button>
    </div>
  );
};

export default Documents;
