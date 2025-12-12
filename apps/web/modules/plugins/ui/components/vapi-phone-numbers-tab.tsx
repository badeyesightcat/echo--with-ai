import { CheckCircleIcon, PhoneIcon, XCircleIcon } from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { useVapiPhoneNumbers } from "../../hooks/use-vapi-data";

export const VapiPhoneNumbersTab = () => {
  const { data: phoneNumbers, isLoading, error } = useVapiPhoneNumbers();

  return (
    <div className="border-t">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-6 py-4">Phone Number</TableHead>
            <TableHead className="px-6 py-4">Name</TableHead>
            <TableHead className="px-6 py-4">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {(() => {
            if (isLoading) {
              return (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="px-6 py-8 text-center text-muted-foreground"
                  >
                    Loading phone numbers...
                  </TableCell>
                </TableRow>
              );
            }

            if (error) {
              return (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="px-6 py-8 text-center"
                  >
                    <p className="text-destructive font-medium">
                      Failed to load phone numbers
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {error.message}
                    </p>
                  </TableCell>
                </TableRow>
              );
            }

            if (phoneNumbers.length === 0) {
              return (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="px-6 py-8 text-center text-muted-foreground"
                  >
                    No phone numbers configured
                  </TableCell>
                </TableRow>
              );
            }

            return phoneNumbers.map((phoneNumber) => (
              <TableRow
                key={phoneNumber.id}
                className="hover:bg-muted/50"
              >
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <PhoneIcon className="size-4 text-muted-foreground" />
                    <span className="font-mono">
                      {phoneNumber.number || "Not configured"}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="px-6 py-4">
                  {phoneNumber.name || "Unnamed"}
                </TableCell>

                <TableCell className="px-6 py-4">
                  <Badge
                    className="capitalize"
                    variant={
                      phoneNumber.status === "active"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {phoneNumber.status === "active" && (
                      <CheckCircleIcon className="mr-1 size-3" />
                    )}

                    {phoneNumber.status !== "active" && (
                      <XCircleIcon className="mr-1 size-3" />
                    )}

                    {phoneNumber.status || "Unknown"}
                  </Badge>
                </TableCell>
              </TableRow>
            ));
          })()}
        </TableBody>
      </Table>
    </div>
  );
};
