import {
  ArrowLeftIcon,
  CheckIcon,
  CopyIcon,
  MicIcon,
  MicOffIcon,
  PhoneCallIcon,
  PhoneIcon,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { WidgetHeader } from "../components/widget-header";
import { WidgetScreenType } from "../../types";
import { useWidgetDispatch, useWidgetSettings } from "../../context";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export const WidgetContactScreen = () => {
  const dispatch = useWidgetDispatch();
  const widgetSettings = useWidgetSettings();
  const phoneNumber = widgetSettings?.vapiSettings?.phoneNumber;

  const setScreen = (payload: WidgetScreenType) =>
    dispatch({ type: "SCREEN", payload });

  const [copied, setCopied] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = async () => {
    if (!phoneNumber) {
      return;
    }
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopied(true);
    } catch (error) {
      console.error(error);
    } finally {
      timerRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      <WidgetHeader>
        <div className="flex items-center gap-x-2">
          <Button
            variant="transparent"
            size="icon"
            onClick={() => setScreen("selection")}
            type="button"
            aria-label="Back"
          >
            <ArrowLeftIcon />
          </Button>
          <p>Call Us</p>
        </div>
      </WidgetHeader>

      <div className="flex flex-col h-full items-center justify-center gap-y-4">
        <div className="flex items-center justify-center rounded-full border bg-primary-foreground p-3">
          <PhoneIcon className="size-6 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">Available 24/7</p>
        <p className="font-bold text-2xl">{phoneNumber}</p>
      </div>

      {!!phoneNumber?.trim() && (
        <div className="border-t bg-background p-4">
          <div className="flex flex-col items-center gap-y-2">
            <Button
              onClick={handleCopy}
              className="w-full"
              size={"lg"}
              variant={"outline"}
            >
              {copied ? (
                <>
                  <CheckIcon className="mr-2 size-4" />
                  Copied!
                </>
              ) : (
                <>
                  <CopyIcon className="mr-2 size-4" />
                  Copy number
                </>
              )}
            </Button>

            <Button
              asChild
              className="w-full"
              size={"lg"}
            >
              <Link href={`tel:${phoneNumber}`}>
                <PhoneCallIcon /> Call now
              </Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
