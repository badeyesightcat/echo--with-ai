"use client";

import { useOrganization } from "@clerk/nextjs";
import { OrgSelectionView } from "@/modules/auth/ui/views/org-selection-view";
// import { AuthLayout } from "@/modules/auth/ui/layouts/auth-layout";

export const OrganizationGuard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { organization } = useOrganization();
  // console.log(organization);

  if (!organization) {
    return <OrgSelectionView />;
  }
  return <>{children}</>;
};
