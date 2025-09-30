"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";

/**
 * Displays a centered widget that lists users and provides a button to add a new user named "Sue".
 *
 * Renders the current result of `api.users.getMany` and a Button which triggers the `api.users.add` mutation with `{ name: "Sue" }`.
 *
 * @returns The component's JSX element containing the users JSON and an "Add User" button.
 */
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
