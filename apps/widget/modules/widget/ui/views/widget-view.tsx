"use client";

import { WidgetAuthScreen } from "@/modules/widget/ui/screens/widget-auth-screen";
import { useContext } from "react";
import { ScreenContext } from "@/modules/widget/context/screen-context";
interface Props {
  organizationId: string;
}

export const WidgetView = ({ organizationId }: Props) => {
  const screen = useContext(ScreenContext);
  console.log(screen);
  const screenComponents = {
    error: <p>TODO</p>,
    loading: <p>TODO</p>,
    selection: <p>TODO</p>,
    voice: <p>TODO</p>,
    auth: <WidgetAuthScreen />,
    inbox: <p>TODO</p>,
    chat: <p>TODO</p>,
    contact: <p>TODO</p>,
  };

  return (
    <main className="flex flex-col h-full w-full overflow-hidden rounded-xl border bg-muted">
      {screenComponents[screen]}
    </main>
  );
};
