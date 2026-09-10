import { mutation, type MutationCtx } from "./_generated/server";
import { v } from "convex/values";

export const sendMessage = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    subject: v.optional(v.string()),
    content: v.string(),
  },
  handler: async (
    ctx: MutationCtx,
    args: {
      name: string;
      email: string;
      subject?: string;
      content: string;
    },
  ) => {
    const messageId = await ctx.db.insert("messages", {
      name: args.name,
      email: args.email,
      subject: args.subject,
      content: args.content,
      createdAt: Date.now(),
    });
    return messageId;
  },
});
