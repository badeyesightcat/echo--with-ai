"use client";

import { WidgetHeader } from "@/modules/widget/ui/components/widget-header";
import {
  useContactSessionId,
  useConversationId,
  useOrganizationId,
  useWidgetDispatch,
} from "@/modules/widget/context";
import { Button } from "@workspace/ui/components/button";
import { ArrowLeftIcon, MenuIcon } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { WidgetScreenType } from "../../types";
import { Id } from "@workspace/backend/_generated/dataModel";

export const WidgetChatScreen = () => {
  const dispatch = useWidgetDispatch();
  const organizationdId = useOrganizationId();
  const conversationId = useConversationId();
  const contactSessionId = useContactSessionId(organizationdId);
  const setScreen = (payload: WidgetScreenType) =>
    dispatch({ type: "SCREEN", payload });
  const setConversationId = (payload: Id<"conversations"> | null) =>
    dispatch({ type: "CONVERSATION_ID", payload });
  const conversation = useQuery(
    api.public.conversations.getOne,
    conversationId && contactSessionId
      ? {
          contactSessionId,
          conversationId,
        }
      : "skip"
  );
  const onBack = () => {
    setConversationId(null);
    setScreen("selection");
  };

  return (
    <>
      <WidgetHeader className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Button
            size={"icon"}
            variant={"transparent"}
            onClick={onBack}
          >
            <ArrowLeftIcon />
          </Button>
          <p>Chat</p>
        </div>
        <Button
          size={"icon"}
          variant={"transparent"}
        >
          <MenuIcon />
        </Button>
      </WidgetHeader>
      <div className="flex flex-col flex-1 gap-y-4 p-4">
        <p className="text-sm">{JSON.stringify(conversation)}</p>
      </div>
    </>
  );
};
