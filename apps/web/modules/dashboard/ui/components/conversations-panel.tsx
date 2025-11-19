"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import {
  ListIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckIcon,
  CornerUpLeftIcon,
} from "lucide-react";
import { ScrollArea, ScrollBar } from "@workspace/ui/components/scroll-area";
import { usePaginatedQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { getCountryFlagUrl, getCountryFromTimezone } from "@/lib/country-utils";
import Link from "next/link";
import { cn } from "@workspace/ui/lib/utils";
import { usePathname } from "next/navigation";
import { DicebearAvatar } from "@workspace/ui/components/dicebear-avatar";
import { formatDistanceToNow } from "date-fns";
import { ConversationStatusIcon } from "@workspace/ui/components/conversation-status-icon";
import { useStatusFilter, useWebDispatch } from "@/modules/dashboard/context";
import { Doc } from "@workspace/backend/_generated/dataModel";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger";
import { Skeleton } from "@workspace/ui/components/skeleton";

const conversationTypeSelect = [
  { type: "all", icon: ListIcon },
  { type: "unresolved", icon: ArrowRightIcon },
  { type: "escalated", icon: ArrowUpIcon },
  { type: "resolved", icon: CheckIcon },
];

export const ConversationsPanel = () => {
  const pathname = usePathname();
  const dispatch = useWebDispatch();
  const statusFilter = useStatusFilter();
  const setStatusFilter = (payload: Doc<"conversations">["status"]) =>
    dispatch({ type: "FILTER", payload });

  const conversations = usePaginatedQuery(
    api.private.conversations.getMany,
    {
      status: statusFilter === "all" ? undefined : statusFilter,
    },
    {
      initialNumItems: 10,
    }
  );

  const {
    topElementRef,
    canLoadMore,
    isLoadingMore,
    isExhausted,
    isLoadingFirstPage,
    handleLoadMore,
  } = useInfiniteScroll({
    status: conversations.status,
    loadMore: conversations.loadMore,
    loadSize: 10,
    // observerEnabled: false,
  });

  return (
    <div className="flex h-full w-full flex-col bg-primary-foreground text-sidebar-foreground">
      <div className="flex flex-col gap-3.5 border-b p-2">
        <Select
          defaultValue="all"
          onValueChange={setStatusFilter}
          value={statusFilter}
        >
          <SelectTrigger className="h-8 border-none px-1.5 shadow-none ring-0 hover:bg-accent hover:text-accent-foreground focus-visible:ring-0">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>

          <SelectContent>
            {conversationTypeSelect.map((typeItem) => (
              <SelectItem
                key={typeItem.type}
                value={typeItem.type}
              >
                <div className="flex items-center gap-2">
                  <typeItem.icon className="size-4" />
                  <span>
                    {typeItem.type[0]?.toUpperCase() + typeItem.type.slice(1)}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoadingFirstPage ? (
        <SkeletonConversations />
      ) : (
        <ScrollArea className="max-h-[calc(100vh-53px)]">
          <div className="flex w-full flex-1 flex-col text-sm">
            {conversations.results.map((conversation) => {
              const isLastMessageFromOperator =
                conversation.lastMessage?.message?.role !== "user";

              const country = getCountryFromTimezone(
                conversation.contactSession.metadata?.timezone
              );

              const countryFlagUrl = country?.code
                ? getCountryFlagUrl(country.code)
                : undefined;

              return (
                <Link
                  key={conversation._id}
                  href={`/conversations/${conversation._id}`}
                  className={cn(
                    "relative flex cursor-pointer items-start gap-3 border-b p-4 py-5 text-sm leading-tight hover:bg-accent hover:text-accent-foreground",
                    pathname === `/conversations/${conversation._id}` &&
                      "bg-muted text-accent-foreground"
                  )}
                >
                  <div
                    className={cn(
                      "-translate-y-1/2 absolute top-1/2 left-0 h-[64%] w-1 rounded-r-full bg-neutral-300 opacity-0 transition-opacity",
                      pathname === `/conversations/${conversation._id}` &&
                        "opacity-100"
                    )}
                  />
                  <DicebearAvatar
                    seed={conversation?.lastMessage?.message?.role!}
                    size={40}
                    badgeImageUrl={countryFlagUrl}
                  />
                  <div className="flex-1">
                    <div className="flex w-full items-center gap-2">
                      <span className="truncate font-bold">
                        {conversation.contactSession.name}
                      </span>
                      <span className="shrink-0 ml-auto text-muted-foreground text-xs">
                        {formatDistanceToNow(conversation._creationTime)}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center justify-between gap-2">
                      <div className="flex w-0 grow items-center gap-1">
                        {isLastMessageFromOperator && (
                          <CornerUpLeftIcon className="size-3 shrink-0 text-muted-foreground" />
                        )}
                        <span
                          className={cn(
                            "line-clamp-1 text-muted-foreground text-xs",
                            !isLastMessageFromOperator && "font-bold text-black"
                          )}
                        >
                          {conversation.lastMessage?.text}
                        </span>
                      </div>

                      <ConversationStatusIcon status={conversation.status} />
                    </div>
                  </div>
                </Link>
              );
            })}

            <InfiniteScrollTrigger
              ref={topElementRef}
              canLoadMore={canLoadMore}
              isLoadingMore={isLoadingMore}
              onLoadMore={handleLoadMore}
            />
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export const SkeletonConversations = () => {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto">
      <div className="relative flex w-full min-w-0 flex-col p-2">
        <div className="w-full space-y-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-lg p-4"
            >
              <Skeleton className="bg-muted h-10 w-10 shrink-0 rounded-full" />
              <div className="min-w-0 flex-1">
                <div className="flex w-full items-center gap-2">
                  <Skeleton className="bg-muted h-4 w-24" />
                  <Skeleton className="bg-muted ml-auto h-3 w-12 shrink-0" />
                </div>
                <div className="mt-2">
                  <Skeleton className="bg-muted h-3 w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
