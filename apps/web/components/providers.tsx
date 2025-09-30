"use client";

import * as React from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL || "");

/**
 * Provides a ConvexProvider preconfigured with the application's Convex client to descendant components.
 *
 * @param children - React nodes to render inside the ConvexProvider
 * @returns The provider-wrapped children as a React element
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
