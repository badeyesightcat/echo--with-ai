"use client";

import { Button } from "@workspace/ui/components/button";
import { useVapi } from "@/modules/widget/hooks/use-vapi";

export default function Page() {
  const {
    isConnected,
    isConnecting,
    isSpeaking,
    transcript,
    startCall,
    endCall,
  } = useVapi();

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full mx-auto w-full max-w-md">
      <Button onClick={startCall}>Call Tom for getting help.</Button>
      <Button
        onClick={endCall}
        variant="destructive"
      >
        Hang up the phone call
      </Button>
      <p>is connected: {isConnected ? "yes" : "no"}</p>
      <p>is connecting: {isConnecting ? "yes" : "no"}</p>
      <p>is speaking: {isSpeaking ? "yes" : "no"}</p>
      <p>{JSON.stringify(transcript, null, 2)}</p>
    </div>
  );
}
