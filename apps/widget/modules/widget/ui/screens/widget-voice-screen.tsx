import { ArrowLeftIcon, MicIcon, MicOffIcon } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import {
  AIConversation,
  AIConversationScrollButton,
  AIConversationContent,
} from "@workspace/ui/components/ai/conversation";
import {
  AIMessage,
  AIMessageContent,
} from "@workspace/ui/components/ai/message";
import { useVapi } from "../../hooks/use-vapi";
import { WidgetHeader } from "../components/widget-header";
import { WidgetScreenType } from "../../types";
import { useWidgetDispatch } from "../../context";
import { cn } from "@workspace/ui/lib/utils";

export const WidgetVoiceScreen = () => {
  const dispatch = useWidgetDispatch();
  const setScreen = (payload: WidgetScreenType) =>
    dispatch({ type: "SCREEN", payload });
  const {
    isConnected,
    isConnecting,
    isSpeaking,
    transcript,
    startCall,
    endCall,
  } = useVapi();

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
          <p>Voice chat</p>
        </div>
      </WidgetHeader>

      {transcript.length > 0 ? (
        <AIConversation className="flex-1">
          <AIConversationContent>
            {transcript.map((message, idx) => (
              <AIMessage
                key={`${message.role}-${idx}-${message.text}`}
                from={message.role}
              >
                <AIMessageContent>{message.text}</AIMessageContent>
              </AIMessage>
            ))}
          </AIConversationContent>
          <AIConversationScrollButton />
        </AIConversation>
      ) : (
        <div className="flex flex-col flex-1 items-center justify-center gap-y-4">
          <div className="flex items-center justify-center rounded-full border bg-primary-foreground p-3">
            <MicIcon className="size-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Transcript will appear here</p>
        </div>
      )}

      <div className="border-t p-4">
        <div className="flex flex-col items-center gap-y-4">
          {isConnected && (
            <div className="flex items-center gap-x-2">
              <div
                className={cn(
                  "size-4 rounded-full",
                  isSpeaking ? "animate-pulse bg-red-500" : "bg-green-500"
                )}
              />
              <span className="text-muted-foreground text-sm">
                {isSpeaking ? "Assistant speaking..." : "Listening..."}
              </span>
            </div>
          )}

          <div className="flex w-full justify-center">
            {isConnected ? (
              <Button
                className="w-full"
                variant={"destructive"}
                size="lg"
                onClick={() => endCall()}
              >
                <MicOffIcon />
                End call
              </Button>
            ) : (
              <Button
                className="w-full"
                disabled={isConnecting}
                size="lg"
                onClick={() => startCall()}
              >
                <MicIcon />
                Start call
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
