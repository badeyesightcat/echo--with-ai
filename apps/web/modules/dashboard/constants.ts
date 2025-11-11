import { Doc } from "@workspace/backend/_generated/dataModel";

export const STATUS_FILTER_KEY = "echo_status_filter";

export const STATUS_FILTERS = [
  "all",
  "unresolved",
  "escalated",
  "resolved",
] as const;
