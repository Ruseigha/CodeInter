import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


// add a new comment to an interview
export const addComment = mutation({
  args: { 
          interviewId: v.id("interviews"), 
          content: v.string(), 
          rating: v.string() 
        },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("User is not authenticated");

    return await ctx.db.insert("comments", {
      interviewId: args.interviewId,
      content: args.content,
      rating: args.rating,
      interviewerId: identity.subject,
    })
  }
})

// get all comments for an interview
export const getComments = query({
  args: { interviewId: v.id("interviews") },
  handler: async (ctx, args) => {
    const comments = await ctx.db.query("comments")
      .withIndex("by_interview_id", (q) => q.eq("interviewId", args.interviewId))
      .collect();
    return comments;
  }
})