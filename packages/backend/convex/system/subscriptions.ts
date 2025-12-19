import { ConvexError, v } from "convex/values";
import { internalMutation, internalQuery } from "../_generated/server";

const VALID_STATUSES = [
  "active",
  "canceled",
  "incomplete",
  "past_due",
  "trialing",
] as const;

export const upsert = internalMutation({
  args: {
    organizationId: v.string(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    if (!VALID_STATUSES.includes(args.status as any)) {
      throw new ConvexError({
        code: "INVALID_ARGUMENT",
        message: `Invalid subscription status: ${args.status}`,
      });
    }

    const existingSubscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_organization_id", (q) =>
        q.eq("organizationId", args.organizationId)
      )
      .unique();

    if (existingSubscription) {
      await ctx.db.patch(existingSubscription._id, { status: args.status });
    } else {
      await ctx.db.insert("subscriptions", {
        organizationId: args.organizationId,
        status: args.status,
      });
    }
  },
});

export const getByOrganizationId = internalQuery({
  args: {
    organizationId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("subscriptions")
      .withIndex("by_organization_id", (q) =>
        q.eq("organizationId", args.organizationId)
      )
      .unique();

    // if (!subscription) {
    //   throw new ConvexError({
    //     code: "NOT_FOUND",
    //     message: "Subscription not found",
    //   });
    // }

    // return subscription;
  },
});
