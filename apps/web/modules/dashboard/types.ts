import { Doc } from "@workspace/backend/_generated/dataModel";
export type WebStatusFilterType = Doc<"conversations">["status"] | "all";

export interface PersistedState {
  [key: string]: string | null | undefined | any;
}

export interface WebStateType extends PersistedState {
  filter: WebStatusFilterType;
}

export type WebActionType = { type: "FILTER"; payload: WebStatusFilterType };
