'use client';

import { useQuery } from 'convex/react';
import { FileIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { SidebarItem } from './sidebar-item';

interface IDocumentList {
  parentDocumentId?: Id<'documents'>;
  level?: number;
  data?: Doc<'documents'>[];
}

const DocumentList = ({ parentDocumentId, level = 0, data }: IDocumentList) => {
  const params = useParams();
  const router = useRouter();

  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const documents = useQuery(api.documents.getSidebar, { parentDocument: parentDocumentId });

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (documents === undefined) {
    return (
      <>
        <SidebarItem.Skeleton level={level} />
        {level === 0 && (
          <>
            <SidebarItem.Skeleton level={level} /> <SidebarItem.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }} className={cn('hidden text-sm font-medium text-muted-foreground/80', expanded && 'last:block', level === 0 && 'hidden')}>
        No pages inside
      </p>
      {documents?.map((document) => (
        <div key={document._id}>
          <SidebarItem
            id={document._id}
            onClick={() => onRedirect(document._id)}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={params.documentId === document._id}
            level={level}
            onExpand={() => onExpand(document._id)}
            expanded={expanded[document._id]}
          />

          {expanded[document._id] && <DocumentList parentDocumentId={document._id} level={level + 1} />}
        </div>
      ))}
    </>
  );
};

export default DocumentList;
