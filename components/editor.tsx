'use client';

import { useTheme } from 'next-themes';
import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { BlockNoteView, useBlockNote } from '@blocknote/react';
import '@blocknote/core/style.css';

import { useEdgeStore } from '@/lib/edgetstore';

interface IEditor {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: IEditor) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUploadFile = async (file: File) => {
    const res = await edgestore.publicFiles.upload({ file });

    return res.url;
  };

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUploadFile,
  });

  return (
    <div>
      <BlockNoteView editor={editor} theme={resolvedTheme === 'dark' ? 'dark' : 'light'} />
    </div>
  );
};

export default Editor;
