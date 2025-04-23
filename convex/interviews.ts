import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// get all interviews 
export const getInterviews = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("User is not authenticated");

    const interviews = await ctx.db.query("interviews").collect();

    return interviews;  
  }
});