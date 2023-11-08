'use client';

import { useMutation } from 'convex/react';
import { useState } from 'react';

import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { useOrigin } from '@/hooks/use-origin';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, Copy, Globe } from 'lucide-react';

interface IPublish {
  initialData: Doc<'documents'>;
}

const Publish = ({ initialData }: IPublish) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({ id: initialData._id, isPublished: true }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: 'Publishing...',
      success: 'Note published successfully.',
      error: 'Failed to publish.',
    });
  };

  const onUnPublish = () => {
    setIsSubmitting(true);

    const promise = update({ id: initialData._id, isPublished: false }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: 'Unpublishing...',
      success: 'Note unpublished successfully.',
      error: 'Failed to unpublish.',
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size='sm' variant='ghost'>
          Publish {initialData.isPublished && <Globe className='w-4 h-4 text-sky-400 ml-2' />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-72' align='end' alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className='space-y-4'>
            <div className='flex items-center gap-x-2'>
              <Globe className='animate-pulse text-sky-500 h-4 w-4' />
              <p className='text-xs font-medium text-sky-500'>This note is now live on web</p>
            </div>
            <div className='flex items-center'>
              <input value={url} className='flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate' disabled />
              <Button onClick={onCopy} disabled={copied} className='h-8 rounded-l-none'>
                {copied ? <Check className='h-4 w-4' /> : <Copy className='h-4 w-4' />}
              </Button>
            </div>
            <Button size='sm' className='w-full text-xs' disabled={isSubmitting} onClick={onUnPublish}>
              Unpublish
            </Button>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center'>
            <Globe className='h-8 w-8 text-muted-foreground mb-2' />
            <p className='text-sm font-medium mb-2'>Publish this note</p>
            <span className='text-xs text-muted-foreground mb-4'>Share your note with others</span>
            <Button loading={isSubmitting} disabled={isSubmitting} onClick={onPublish} className='w-full text-xs' size='sm'>
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Publish;
