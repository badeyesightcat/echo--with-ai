"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const users = useQuery(api.users.getMany);
  const addUser = useMutation(api.users.add);

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        apps/widget
        <Button onClick={() => addUser({ name: "Sue" })}>Add User</Button>
        <br />
        {JSON.stringify(users, null, 4)}
      </div>
    </div>
  );
}
