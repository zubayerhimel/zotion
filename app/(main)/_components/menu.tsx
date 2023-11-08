'use client';

import { useUser } from '@clerk/clerk-react';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Trash } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface IMenu {
  documentId: Id<'documents'>;
}

export const Menu = ({ documentId }: IMenu) => {
  const router = useRouter();
  const { user } = useUser();

  const archive = useMutation(api.documents.archive);

  const onArchive = () => {
    const promise = archive({ id: documentId });
    toast.promise(promise, {
      loading: 'Moving to trash...',
      success: 'Note moved to trash.',
      error: 'Failed to archive note.',
    });

    router.push('/documents');
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='sm' variant='ghost'>
          <MoreHorizontal className='w-4 h-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-60' align='end' alignOffset={8} forceMount>
        <DropdownMenuItem onClick={onArchive}>
          <Trash className='w-4 h-4 mr-2' /> Move to trash
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className='text-xs text-muted-foreground p-2'>Last edited by {user?.fullName}</div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className='h-6 w-10' />;
};
