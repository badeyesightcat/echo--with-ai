import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { createClerkClient, type WebhookEvent } from "@clerk/backend";
import { internal } from "./_generated/api";
import { FREE_PLAN_MAX_MEMBERS, PRO_PLAN_MAX_MEMBERS } from "./constants";
// import { verifyWebhook } from "@clerk/backend/webhooks";

const clerkSecretKey = process.env.CLERK_SECRET_KEY;
if (!clerkSecretKey) {
  throw new Error("CLERK_SECRET_KEY environment variable is required");
}

const clerkClient = createClerkClient({
  secretKey: clerkSecretKey,
});

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
if (!webhookSecret) {
  throw new Error("CLERK_WEBHOOK_SECRET environment variable is required");
}

const validateRequest = async (req: Request): Promise<WebhookEvent | null> => {
  const payloadString = await req.text();
  const svixHeaders = {
    "svix-id": req.headers.get("svix-id") || "",
    "svix-timestamp": req.headers.get("svix-timestamp") || "",
    "svix-signature": req.headers.get("svix-signature") || "",
  };

  const wh = new Webhook(webhookSecret);

  try {
    // return await verifyWebhook(req);
    return wh.verify(payloadString, svixHeaders) as unknown as WebhookEvent;
  } catch (error) {
    console.error("Error verifying webhook event:", error);
    return null;
  }
};

const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const event = await validateRequest(request);

    if (!event) {
      return new Response("Error occurred", { status: 400 });
    }

    switch (event.type) {
      case "subscription.updated": {
        const subscription = event.data as {
          status: string;
          payer?: {
            organization_id: string;
          };
        };

        const organizationId = subscription.payer?.organization_id;

        if (!organizationId) {
          return new Response("Missing organization ID", { status: 400 });
        }

        const isActive = subscription.status === "active";

        const newMaxAllowedMemberships = isActive
          ? PRO_PLAN_MAX_MEMBERS
          : FREE_PLAN_MAX_MEMBERS;

        try {
          await clerkClient.organizations.updateOrganization(organizationId, {
            maxAllowedMemberships: newMaxAllowedMemberships,
            publicMetadata: {
              plan: isActive ? "pro" : "free",
            },
          });
        } catch (error) {
          console.error("Failed to update organization:", error);
          return new Response("Failed to update organization", { status: 500 });
        }

        await ctx.runMutation(internal.system.subscriptions.upsert, {
          status: subscription.status,
          organizationId,
        });

        break;
      }
      default:
        console.log("Ignored clerk webhook event:", event.type);
    }

    return new Response(null, { status: 200 });
  }),
});

export default http;
