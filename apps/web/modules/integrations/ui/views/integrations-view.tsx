"use client";

import { useOrganization } from "@clerk/nextjs";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
import { IntegrationId, INTEGRATIONS } from "../../constants";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { useState } from "react";
import { createScript } from "../../utils";

export const IntegrationsView = () => {
  const { organization, isLoaded } = useOrganization();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState<string>("");

  const handleIntegrationClick = (integrationId: IntegrationId) => {
    if (!organization?.id) {
      toast.error("Organization ID not found");
      return;
    }

    if (!integrationId) {
      toast.error("Integration ID not found");
      return;
    }

    const snippet = createScript(integrationId, organization.id);
    if (snippet) {
      setSelectedSnippet(snippet);
      setDialogOpen(true);
    } else {
      toast.error("Failed to generate integration script.");
    }
  };

  const handleCopy = async () => {
    if (!organization?.id) {
      toast.error("Organization ID not available");
      return;
    }

    try {
      await navigator.clipboard.writeText(organization.id);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        No organization found
      </div>
    );
  }

  return (
    <>
      <IntegrationsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        snippet={selectedSnippet}
      />
      <div className="flex min-h-screen flex-col bg-muted p-8">
        <div className="mx-auto w-full max-w-screen-md">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-4xl">Setup & Integrations</h1>
            <p className="text-muted-foreground">
              Choose the integration that&apos;s right for your business
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="flex items-center gap-4">
              <Label
                className="w-34"
                htmlFor="organization-id"
              >
                Organization ID
              </Label>
              <Input
                id="organization-id"
                className="flex-1 font-mono text-sm bg-background"
                value={organization?.id ?? ""}
                disabled
                readOnly
              />
              <Button
                onClick={handleCopy}
                className="gap-2"
                size={"sm"}
              >
                <CopyIcon className="size-4" /> Copy
              </Button>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="space-y-6">
            <div className="space-y-1">
              <Label className="text-lg">Integrations</Label>
              <p className="text-muted-foreground text-sm">
                Add the following code to your website to enable the chatbox.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {INTEGRATIONS.map((integration) => (
                <button
                  key={integration.id}
                  className="flex items-center gap-4 rounded-lg border bg-background p-4 hover:bg-accent"
                  onClick={() => handleIntegrationClick(integration.id)}
                >
                  <Image
                    width={32}
                    height={32}
                    src={integration.icon}
                    alt={integration.title}
                  />
                  <p>{integration.title}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const IntegrationsDialog = ({
  open,
  onOpenChange,
  snippet,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  snippet: string;
}) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      toast.success("Code copied to clipboard.");
    } catch (error) {
      toast.error("Failed to copy the code to clipboard");
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Integrate with your website</DialogTitle>
          <DialogDescription>
            Follow these steps to add the chatbox to your website
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="rounded-md bg-accent p-2 text-sm">
              1. Copy the following code
            </div>
            <div className="group relative">
              <pre className="max-h-[300px] overflow-auto whitespace-pre-wrap break-all rounded-md bg-foreground p-2 font-mono text-secondary text-sm">
                {snippet}
              </pre>
              <Button
                className="absolute top-4 right-6 size-6 opacity-50 transition-opacity hover:opacity-100 md:opacity-0 md:group-hover:opacity-100"
                onClick={handleCopy}
                size={"icon"}
                variant={"secondary"}
              >
                <CopyIcon className="size-3" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="rounded-md bg-accent p-2 text-sm">
              2. Add the code in your page
            </div>
            <p className="text-muted-foreground text-sm">
              Paste the chatbox code above in your page. You can add it in the
              HTML head section.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
