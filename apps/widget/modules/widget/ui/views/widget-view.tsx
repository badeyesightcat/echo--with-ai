"use client";

import { useScreen } from "@/modules/widget/context";
import { WidgetAuthScreen } from "@/modules/widget/ui/screens/widget-auth-screen";
import { WidgetErrorScreen } from "@/modules/widget/ui/screens/widget-error-screen";
import { WidgetLoadingScreen } from "@/modules/widget/ui/screens/widget-loading-screen";
import { WidgetSelectionScreen } from "@/modules/widget/ui/screens/widget-selection-screen";
import { WidgetChatScreen } from "@/modules/widget/ui/screens/widget-chat-screen";
import { WidgetInboxScreen } from "@/modules/widget/ui/screens/widget-inbox-screen";
import { WidgetVoiceScreen } from "../screens/widget-voice-screen";
import { WidgetContactScreen } from "../screens/widget-contact-screen";

interface Props {
  organizationId: string;
}

export const WidgetView = ({ organizationId }: Props) => {
  const screen = useScreen();

  const screenComponents = {
    loading: <WidgetLoadingScreen organizationId={organizationId} />,
    error: <WidgetErrorScreen />,
    selection: <WidgetSelectionScreen />,
    voice: <WidgetVoiceScreen />,
    auth: <WidgetAuthScreen />,
    inbox: <WidgetInboxScreen />,
    chat: <WidgetChatScreen />,
    contact: <WidgetContactScreen />,
  };

  return (
    <main className="flex flex-col h-full w-full overflow-hidden rounded-xl border bg-muted">
      {screenComponents[screen]}
    </main>
  );
};
