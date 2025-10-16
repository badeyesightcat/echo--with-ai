"use client";

import * as React from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ScreenContext } from "@/modules/widget/context/screen-context";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL || "");

export function Providers({ children }: { children: React.ReactNode }) {
  const screen = React.useContext(ScreenContext);

  return (
    <ConvexProvider client={convex}>
      <ScreenContext value={screen}>{children}</ScreenContext>
    </ConvexProvider>
  );
}
