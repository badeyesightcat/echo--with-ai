import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@workspace/ui/components/resizable";
import { ContactPanel } from "../components/contact-panel";

const ConversationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-full flex-1"
    >
      <ResizablePanel
        className="h-full"
        defaultSize={60}
      >
        <div className="flex flex-1 h-full flex-col">{children}</div>
      </ResizablePanel>

      <ResizableHandle className="hidden lg:block" />

      <ResizablePanel
        className="hidden lg:block"
        defaultSize={40}
        maxSize={40}
        minSize={20}
      >
        <ContactPanel />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ConversationIdLayout;
