"use client";

import { WidgetHeader } from "@/modules/widget/ui/components/widget-header";
import {
  useContactSessionId,
  useHasVapiSecrets,
  useOrganizationId,
  useWidgetDispatch,
  useWidgetSettings,
} from "@/modules/widget/context";
import { Button } from "@workspace/ui/components/button";
import {
  ChevronRightIcon,
  MessageSquareTextIcon,
  MicIcon,
  PhoneIcon,
} from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { WidgetScreenType } from "../../types";
import { useState } from "react";
import { Id } from "@workspace/backend/_generated/dataModel";
import { WidgetFooter } from "../components/widget-footer";

export const WidgetSelectionScreen = () => {
  const dispatch = useWidgetDispatch();
  const organizationId = useOrganizationId();
  const contactSessionId = useContactSessionId(organizationId);
  const widgetSettings = useWidgetSettings();
  const hasVapiSecrets = useHasVapiSecrets();

  const setScreen = (payload: WidgetScreenType) =>
    dispatch({ type: "SCREEN", payload });
  const setErrorMessage = (payload: string) =>
    dispatch({ type: "ERROR", payload });
  const setConversationId = (payload: Id<"conversations"> | null) =>
    dispatch({ type: "CONVERSATION_ID", payload });

  const [isPending, setIsPending] = useState(false);
  const createConversation = useMutation(api.public.conversations.create);

  const handleNewConversation = async () => {
    if (!contactSessionId) {
      setScreen("auth");
      return;
    }

    if (!organizationId) {
      setScreen("error");
      setErrorMessage("Missing organization ID");
      return;
    }

    setIsPending(true);
    try {
      const conversationId = await createConversation({
        organizationId,
        contactSessionId,
      });

      setConversationId(conversationId);
      setScreen("chat");
    } catch (error) {
      setScreen("auth");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-0.5 p-5 font-semibold">
          <p className="text-3xl">Hi there! 👋</p>
          <p className="text-xl">Let&apos;s get you started</p>
        </div>
      </WidgetHeader>

      <div className="flex flex-col flex-1 gap-y-4 p-4 overflow-y-auto">
        <Button
          className="h-16 w-full justify-between bg-primary-foreground"
          variant="outline"
          onClick={handleNewConversation}
          disabled={isPending}
        >
          <div className="flex items-center gap-x-2">
            <MessageSquareTextIcon className="size-4" />
            <span>Start chat</span>
          </div>
          <ChevronRightIcon />
        </Button>

        {hasVapiSecrets &&
          widgetSettings?.vapiSettings?.assistantId?.trim() && (
            <Button
              className="h-16 w-full justify-between bg-primary-foreground"
              variant="outline"
              onClick={() => setScreen("voice")}
              disabled={isPending}
            >
              <div className="flex items-center gap-x-2">
                <MicIcon className="size-4" />
                <span>Start voice call</span>
              </div>
              <ChevronRightIcon />
            </Button>
          )}

        {hasVapiSecrets &&
          widgetSettings?.vapiSettings?.phoneNumber?.trim() && (
            <Button
              className="h-16 w-full justify-between bg-primary-foreground"
              variant="outline"
              onClick={() => setScreen("contact")}
              disabled={isPending}
            >
              <div className="flex items-center gap-x-2">
                <PhoneIcon className="size-4" />
                <span>Call us</span>
              </div>
              <ChevronRightIcon />
            </Button>
          )}
      </div>

      <WidgetFooter />
    </>
  );
};
