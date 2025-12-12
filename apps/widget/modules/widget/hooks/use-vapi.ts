import Vapi from "@vapi-ai/web";
import { useState, useEffect } from "react";
import { useVapiSecrets, useWidgetSettings } from "../context";

interface TranscriptMessage {
  role: "user" | "assistant";
  text: string;
}

export const useVapi = () => {
  const vapiSecrets = useVapiSecrets();
  const widgetSettings = useWidgetSettings();
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);

  useEffect(() => {
    if (!vapiSecrets) {
      return;
    }

    const vapiInstance = new Vapi(vapiSecrets.publicApiKey);
    setVapi(vapiInstance);

    vapiInstance.on("call-start", () => {
      setIsConnected(true);
      setIsConnecting(false);
      setTranscript([]);
    });

    vapiInstance.on("call-end", () => {
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
    });

    vapiInstance.on("speech-start", () => {
      setIsSpeaking(true);
    });

    vapiInstance.on("speech-end", () => {
      setIsSpeaking(false);
    });

    vapiInstance.on("error", (error) => {
      console.log("VAPI_ERROR", error);
      setIsConnecting(false);
    });

    vapiInstance.on("message", (message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setTranscript((prev) => {
          return [
            ...prev,
            {
              role: message.role === "user" ? "user" : "assistant",
              text: message.transcript,
            },
          ];
        });
      }
    });

    // MUST return a cleanup code in order to disconnect itself out of the system
    return () => {
      vapiInstance?.stop();
    };
  }, []);

  const startCall = () => {
    if (!vapiSecrets || !widgetSettings?.vapiSettings.assistantId) {
      return;
    }
    setIsConnecting(true);

    if (vapi) {
      vapi.start(widgetSettings.vapiSettings.assistantId);
    }
  };

  const endCall = () => {
    if (vapi) {
      vapi.stop();
    }
  };

  return {
    isConnected,
    isConnecting,
    isSpeaking,
    transcript,
    startCall,
    endCall,
  };
};
