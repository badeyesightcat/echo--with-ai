"use client";

import { AlertTriangleIcon } from "lucide-react";
import { WidgetHeader } from "@/modules/widget/ui/components/widget-header";
import { useWidgetState } from "@/modules/widget/context";

export const WidgetErrorScreen = () => {
  const { errorMessage } = useWidgetState();

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-0.5 p-5 font-semibold">
          <p className="text-3xl">Hi there! 👋</p>
          <p className="text-xl">Let&apos;s get you started</p>
        </div>
      </WidgetHeader>
      <div className="flex flex-col flex-1 items-center justify-center gap-y-4 p-4 text-muted-foreground">
        <AlertTriangleIcon />
        <p className="text-sm">{errorMessage || "Invalid configuration"}</p>
      </div>
    </>
  );
};
