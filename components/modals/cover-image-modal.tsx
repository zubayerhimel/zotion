'use client';

import { useMutation } from 'convex/react';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import { api } from '@/convex/_generated/api';
import { useCoverImage } from '@/hooks/use-cover-image';
import { useEdgeStore } from '@/lib/edgetstore';
import { AlertDialogHeader } from '../ui/alert-dialog';
import { Dialog, DialogContent } from '../ui/dialog';
import { Id } from '@/convex/_generated/dataModel';
import { SingleImageDropzone } from '../single-image-dropzone';

export const CoverImageModal = () => {
  const params = useParams();
  const update = useMutation(api.documents.update);
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();

  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onClose = () => {
    setIsSubmitting(false);
    setFile(undefined);
    coverImage.onClose();
  };

  const onFileChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: coverImage.url,
        },
      });

      await update({
        id: params.documentId as Id<'documents'>,
        coverImage: res.url,
      });

      onClose();
    }
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <AlertDialogHeader>
          <h2 className='text-center text-lg font-semibold'>Cover Image</h2>
        </AlertDialogHeader>

        <SingleImageDropzone className='w-full outline-none' disabled={isSubmitting} value={file} onChange={onFileChange} />
      </DialogContent>
    </Dialog>
  );
};
