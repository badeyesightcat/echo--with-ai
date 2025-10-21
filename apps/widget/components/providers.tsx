"use client";

import * as React from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { WidgetProvider } from "@/modules/widget/context";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL || "");

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProvider client={convex}>
      <WidgetProvider>{children}</WidgetProvider>
    </ConvexProvider>
  );
}
