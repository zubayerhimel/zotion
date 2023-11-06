import { useMutation } from 'convex/react';
import { useRef, useState } from 'react';

import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface ITitle {
  initialData: Doc<'documents'>;
}

const Title = ({ initialData }: ITitle) => {
  const update = useMutation(api.documents.update);
  const inputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(initialData?.title || 'Untitled');
  const [isEditing, setIsEditing] = useState(false);

  const enableInput = () => {
    setTitle(initialData.title);
    setIsEditing(true);

    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    update({
      id: initialData._id,
      title: event.target.value || 'Untitled',
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      disableInput();
    }
  };

  return (
    <div className='flex items-center gap-x-1'>
      {!!initialData.icon && <p>{initialData.icon}</p>}

      {isEditing ? (
        <Input value={title} onChange={onChange} ref={inputRef} onBlur={disableInput} onClick={enableInput} className='h-7 px-2 focus-visible:ring-transparent' />
      ) : (
        <Button className='font-normal h-auto p-1' variant='ghost' size='sm' onClick={enableInput}>
          <span className='truncate'>{initialData?.title}</span>
        </Button>
      )}
    </div>
  );
};

export default Title;

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className='h-6 w-20 rounded-full' />;
};
