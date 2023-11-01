import { v } from 'convex/values';

import { mutation, query } from './_generated/server';
import { Doc, Id } from './_generated/dataModel';

export const archive = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Not authenticated');
    const userId = identity.subject;

    const existingDocuments = await ctx.db.get(args.id);
    if (!existingDocuments) throw new Error('Document not found!');

    if (existingDocuments.userId !== userId) throw new Error('Unauthorized user');

    const recursiveArchive = async (documentId: Id<'documents'>) => {
      const children = await ctx.db
        .query('documents')
        .withIndex('by_user_parent', (q) => q.eq('userId', userId).eq('parentDocument', documentId))
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: true,
        });

        await recursiveArchive(child._id);
      }
    };
    const documents = await ctx.db.patch(args.id, { isArchived: true });
    recursiveArchive(args.id);

    return documents;
  },
});

export const getSidebar = query({
  args: {
    parentDocument: v.optional(v.id('documents')),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Not authenticated');

    const userId = identity.subject;
    const documents = await ctx.db
      .query('documents')
      .withIndex('by_user_parent', (q) => q.eq('userId', userId).eq('parentDocument', args.parentDocument))
      .filter((q) => q.eq(q.field('isArchived'), false))
      .order('desc')
      .collect();

    return documents;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id('documents')),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }

    const userId = identity.subject;
    const document = await ctx.db.insert('documents', {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    });

    return document;
  },
});

export const getTrash = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }
    const userId = identity.subject;
    const documents = await ctx.db
      .query('documents')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .filter((q) => q.eq(q.field('isArchived'), true))
      .order('desc')
      .collect();

    return documents;
  },
});

export const restore = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }
    const userId = identity.subject;

    const existingDocuments = await ctx.db.get(args.id);
    if (!existingDocuments) throw new Error('Note not found');

    if (existingDocuments.userId !== userId) throw new Error('Unauthorized user');

    const recursiveRestore = async (documentId: Id<'documents'>) => {
      const children = await ctx.db
        .query('documents')
        .withIndex('by_user_parent', (q) => q.eq('userId', userId).eq('parentDocument', documentId))
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: false,
        });
        recursiveRestore(child._id);
      }
    };
    const options: Partial<Doc<'documents'>> = {
      isArchived: false,
    };

    if (existingDocuments.parentDocument) {
      const parent = await ctx.db.get(existingDocuments.parentDocument);
      if (parent?.isArchived) {
        options.parentDocument = undefined;
      }
    }

    const documents = await ctx.db.patch(args.id, options);
    recursiveRestore(args.id);

    return documents;
  },
});

export const remove = mutation({
  args: { id: v.id('documents') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }
    const userId = identity.subject;

    const existingDocuments = await ctx.db.get(args.id);
    if (!existingDocuments) throw new Error('Note not found');

    if (existingDocuments.userId !== userId) throw new Error('Unauthorized user');

    const document = await ctx.db.delete(args.id);

    return document;
  },
});

export const getSearch = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error('Not authenticated');
    }
    const userId = identity.subject;

    const documents = await ctx.db
      .query('documents')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .filter((q) => q.eq(q.field('isArchived'), false))
      .order('desc')
      .collect();

    return documents;
  },
});
