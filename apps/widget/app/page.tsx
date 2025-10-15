"use client";

import { WidgetView } from "@/modules/widget/ui/views/widget-view";
import { Suspense, use } from "react";

interface Props {
  searchParams: Promise<{
    organizationId: string;
  }>;
}

const Page = ({ searchParams }: Props) => {
  const { organizationId } = use(searchParams);

  return (
    <Suspense>
      <WidgetView organizationId={organizationId} />
    </Suspense>
  );
};

export default Page;
