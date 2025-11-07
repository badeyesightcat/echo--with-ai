"use client";

import { WidgetHeader } from "@/modules/widget/ui/components/widget-header";
import { WidgetFooter } from "../components/widget-footer";
import { Button } from "@workspace/ui/components/button";
import { ArrowLeftIcon } from "lucide-react";
import {
  useContactSessionId,
  useOrganizationId,
  useWidgetDispatch,
} from "../../context";
import { WidgetScreenType } from "../../types";
import { usePaginatedQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { useEffect } from "react";
import { Id } from "@workspace/backend/_generated/dataModel";
import { formatDistanceToNow } from "date-fns";
import { ConversationStatusIcon } from "@workspace/ui/components/conversation-status-icon";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger";

export const WidgetInboxScreen = () => {
  const organizationdId = useOrganizationId();
  const contactSessionId = useContactSessionId(organizationdId);

  const dispatch = useWidgetDispatch();
  const setScreen = (payload: WidgetScreenType) =>
    dispatch({ type: "SCREEN", payload });
  const setConversationId = (payload: Id<"conversations">) =>
    dispatch({ type: "CONVERSATION_ID", payload });

  const conversations = usePaginatedQuery(
    api.public.conversations.getMany,
    contactSessionId
      ? {
          contactSessionId,
        }
      : "skip",
    {
      initialNumItems: 10,
    }
  );

  const { topElementRef, handleLoadMore, canLoadMore, isLoadingMore } =
    useInfiniteScroll({
      status: conversations.status,
      loadMore: conversations.loadMore,
      loadSize: 10,
      // observerEnabled: false,
    });

  useEffect(() => {
    conversations.results.length > 0 && console.log(conversations);
  }, [conversations]);

  return (
    <>
      <WidgetHeader>
        <div className="flex items-center gap-x-2">
          <Button
            variant="transparent"
            size="icon"
            onClick={() => setScreen("selection")}
          >
            <ArrowLeftIcon />
          </Button>
          <p>Inbox</p>
        </div>
      </WidgetHeader>

      <div className="flex flex-col flex-1 gap-y-2 p-4 overflow-y-auto">
        {conversations.results.length > 0 &&
          conversations.results.map((conversation) => (
            <Button
              className="h-20 w-full justify-between bg-primary-foreground"
              key={conversation._id}
              variant="outline"
              onClick={() => {
                setConversationId(conversation._id);
                setScreen("chat");
              }}
            >
              <div className="flex flex-col w-full gap-4 overflow-hidden">
                <div className="flex w-full items-center justify-between gap-x-2">
                  <p className="text-muted-foreground text-xs">Chat</p>
                  <p className="text-muted-foreground text-xs">
                    {formatDistanceToNow(new Date(conversation._creationTime))}
                  </p>
                </div>

                <div className="flex w-full items-center justify-between gap-x-2">
                  <p className="truncate text-sm">
                    {conversation.lastMessage?.text}
                  </p>
                  <ConversationStatusIcon status={conversation.status} />
                </div>
              </div>
            </Button>
          ))}

        <InfiniteScrollTrigger
          canLoadMore={canLoadMore}
          isLoadingMore={isLoadingMore}
          onLoadMore={handleLoadMore}
          ref={topElementRef}
        />
      </div>

      <WidgetFooter />
    </>
  );
};
