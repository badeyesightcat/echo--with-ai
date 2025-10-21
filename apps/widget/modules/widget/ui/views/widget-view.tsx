"use client";

import { useWidgetState } from "@/modules/widget/context";
import { WidgetAuthScreen } from "@/modules/widget/ui/screens/widget-auth-screen";
import { WidgetErrorScreen } from "@/modules/widget/ui/screens/widget-error-screen";
import { WidgetLoadingScreen } from "@/modules/widget/ui/screens/widget-loading-screen";

interface Props {
  organizationId: string;
}

export const WidgetView = ({ organizationId }: Props) => {
  const { screen } = useWidgetState();

  const screenComponents = {
    loading: <WidgetLoadingScreen organizationId={organizationId} />,
    error: <WidgetErrorScreen />,
    selection: <p>TODO: selection</p>,
    voice: <p>TODO: voice</p>,
    auth: <WidgetAuthScreen />,
    inbox: <p>TODO: inbox</p>,
    chat: <p>TODO: chat</p>,
    contact: <p>TODO: contact</p>,
  };

  return (
    <main className="flex flex-col h-full w-full overflow-hidden rounded-xl border bg-muted">
      {screenComponents[screen]}
    </main>
  );
};
