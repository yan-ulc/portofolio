import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const sendMessage = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    content: v.string(),
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: async (ctx: any, args: any) => {
    const messageId = await ctx.db.insert("messages", {
      name: args.name,
      email: args.email,
      content: args.content,
      createdAt: Date.now(),
    });
    return messageId;
  },
});
