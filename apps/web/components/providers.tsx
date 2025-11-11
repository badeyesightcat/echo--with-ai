"use client";

import * as React from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useAuth } from "@clerk/nextjs";
import { WebProvider } from "@/modules/dashboard/context";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error(
    "Missing NEXT_PUBLIC_CONVEX_URL environment variable in your .env.local file."
  );
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProviderWithClerk
      client={convex}
      useAuth={useAuth}
    >
      <WebProvider>{children}</WebProvider>
    </ConvexProviderWithClerk>
  );
}
