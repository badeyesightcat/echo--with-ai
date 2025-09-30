"use client";

import * as React from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL || "");

/**
 * Wraps descendants with a ConvexProvider that supplies the shared Convex client.
 *
 * @param children - React nodes to be rendered inside the ConvexProvider
 * @returns A React element that provides the Convex client to its children
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
