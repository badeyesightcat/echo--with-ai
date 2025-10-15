"use client";

import { WidgetFooter } from "../components/widget-footer";
import { WidgetHeader } from "../components/widget-header";

interface Props {
  organizationId: string;
}

export const WidgetView = ({ organizationId }: Props) => {
  return (
    // TODO: confirm whether or not min-h-screen and min-w-screen are needed
    <main className="flex flex-col h-full w-full overflow-hidden rounded-xl border bg-muted min-w-screen min-h-screen">
      <WidgetHeader>
        <div className="flex flex-col justify-between gap-y-0.5 p-5 font-semibold">
          <p className="text-3xl">Hi there! 👋</p>
          <p className="text-xl">How can we help you today?</p>
        </div>
      </WidgetHeader>
      <section className="flex flex-1">widget view: {organizationId}</section>
      <WidgetFooter />
    </main>
  );
};
