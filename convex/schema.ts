import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Placeholder table for contact messages or similar future features
  messages: defineTable({
    name: v.string(),
    email: v.string(),
    content: v.string(),
    createdAt: v.number(),
  }),
});
