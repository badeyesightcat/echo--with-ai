import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { HomeIcon, InboxIcon } from "lucide-react";
import { useScreen, useWidgetDispatch } from "../../context";
import { WidgetScreenType } from "../../types";

export const WidgetFooter = () => {
  const dispatch = useWidgetDispatch();
  const screen = useScreen();
  const setScreen = (payload: WidgetScreenType) =>
    dispatch({ type: "SCREEN", payload });

  return (
    <footer className="flex items-center justify-between border-t bg-background">
      <Button
        className="h-14 flex-1 rounded-none"
        onClick={() => setScreen("selection")}
        size="icon"
        variant="ghost"
      >
        <HomeIcon
          className={cn("size-5", screen === "selection" && "text-primary")}
        />
      </Button>

      <Button
        className="h-14 flex-1 rounded-none"
        onClick={() => setScreen("inbox")}
        size="icon"
        variant="ghost"
      >
        <InboxIcon
          className={cn("size-5", screen === "inbox" && "text-primary")}
        />
      </Button>
    </footer>
  );
};
