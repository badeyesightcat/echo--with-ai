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
import { useAction, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { WidgetScreenType } from "../../types";
import { Id } from "@workspace/backend/_generated/dataModel";
import {
  AIConversation,
  AIConversationContent,
  AIConversationScrollButton,
} from "@workspace/ui/components/ai/conversation";
import {
  AIInput,
  AIInputSubmit,
  AIInputTextarea,
  AIInputToolbar,
  AIInputTools,
} from "@workspace/ui/components/ai/input";
import {
  AIMessage,
  AIMessageContent,
} from "@workspace/ui/components/ai/message";
import { AIResponse } from "@workspace/ui/components/ai/response";
import {
  AISuggestion,
  AISuggestions,
} from "@workspace/ui/components/ai/suggestion";
import { useThreadMessages, toUIMessages } from "@convex-dev/agent/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@workspace/ui/components/form";
import { useInfiniteScroll } from "@workspace/ui/hooks/use-infinite-scroll";
import { InfiniteScrollTrigger } from "@workspace/ui/components/infinite-scroll-trigger";
import { DicebearAvatar } from "@workspace/ui/components/dicebear-avatar";

const formSchema = z.object({
  message: z.string().min(1, "Message is required"),
});

export const WidgetChatScreen = () => {
  const dispatch = useWidgetDispatch();
  const organizationdId = useOrganizationId();
  const conversationId = useConversationId();
  const contactSessionId = useContactSessionId(organizationdId);

  const onBack = () => {
    setConversationId(null);
    setScreen("selection");
  };

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

  const messages = useThreadMessages(
    api.public.messages.getMany,
    conversation?.threadId && contactSessionId
      ? {
          threadId: conversation.threadId,
          contactSessionId,
        }
      : "skip",
    {
      initialNumItems: 10,
    }
  );

  const { topElementRef, handleLoadMore, canLoadMore, isLoadingMore } =
    useInfiniteScroll({
      status: messages.status,
      loadMore: messages.loadMore,
      loadSize: 10,
      // observerEnabled: false,
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const createMessage = useAction(api.public.messages.create);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!conversation || !contactSessionId) {
      console.log(conversation, contactSessionId);
      return;
    }

    form.reset();

    await createMessage({
      threadId: conversation.threadId,
      prompt: values.message,
      contactSessionId,
    });
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

      <AIConversation>
        <AIConversationContent>
          <InfiniteScrollTrigger
            canLoadMore={canLoadMore}
            isLoadingMore={isLoadingMore}
            onLoadMore={handleLoadMore}
            ref={topElementRef}
          />

          {toUIMessages(messages.results ?? [])?.map((message) => (
            <AIMessage
              from={message.role === "user" ? "user" : "assistant"}
              key={message.id}
            >
              <AIMessageContent>
                <AIResponse>{message.content}</AIResponse>
              </AIMessageContent>

              {message.role === "assistant" && (
                <DicebearAvatar
                  seed="assistant"
                  size={32}
                  className=""
                  badgeClassName=""
                  imageUrl="/bot.svg" // this refers to one in the public directory
                  badgeImageUrl="/logo.svg"
                />
              )}
            </AIMessage>
          ))}
        </AIConversationContent>
      </AIConversation>
      {/* TODO: Add suggestions */}

      <Form {...form}>
        <AIInput
          className="rounded-none border-x-0 border-b-0"
          // intention of the use of form.handleSubmit,
          // it catches all the values entered to the form and
          // implements validation first before sending data to the server
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            disabled={conversation?.status === "resolved"}
            name="message"
            render={({ field }) => (
              <AIInputTextarea
                disabled={conversation?.status === "resolved"}
                onChange={field.onChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    form.handleSubmit(onSubmit)();
                  }
                }}
                placeholder={
                  conversation?.status === "resolved"
                    ? "This conversation has been resolved."
                    : "Type your message..."
                }
                value={field.value}
              />
            )}
          />

          <AIInputToolbar>
            <AIInputTools />
            <AIInputSubmit
              disabled={
                conversation?.status === "resolved" || !form.formState.isValid
              }
              status="ready"
              type="submit"
            />
          </AIInputToolbar>
        </AIInput>
      </Form>
    </>
  );
};
