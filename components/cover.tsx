'use client';

import { useCoverImage } from '@/hooks/use-cover-image';
import { ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { useMutation } from 'convex/react';
import { Button } from './ui/button';
import { useEdgeStore } from '@/lib/edgetstore';
import { Skeleton } from './ui/skeleton';

interface ICover {
  url?: string;
  preview?: boolean;
}

export const Cover = ({ url, preview }: ICover) => {
  const params = useParams();
  const { edgestore } = useEdgeStore();
  const coverImage = useCoverImage();
  const removeCoverImage = useMutation(api.documents.removeCoverImage);

  const onRemoveCoverImage = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }

    removeCoverImage({
      id: params.documentId as Id<'documents'>,
    });
  };

  return (
    <div className={cn('relative w-full h-[35vh] group', !url && 'h-[12vh]', url && 'bg-muted')}>
      {!!url && <Image src={url} fill alt='cover' className='object-cover' />}
      {url && !preview && (
        <div className='opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2 transition ease-in-out'>
          <Button onClick={() => coverImage.onReplace(url)} variant='outline' size='sm' className='text-muted-foreground text-xs'>
            <ImageIcon className='h-4 w-4 mr-2' />
            Change cover
          </Button>
          <Button onClick={onRemoveCoverImage} variant='outline' size='sm' className='text-muted-foreground text-xs'>
            <X className='h-4 w-4 mr-2' />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className='w-full h-[12vh] ' />;
};
