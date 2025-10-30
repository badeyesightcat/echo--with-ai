import { WIDGET_SCREENS } from "@/modules/widget/constants";
import { Id } from "@workspace/backend/_generated/dataModel";

export type WidgetScreenType = (typeof WIDGET_SCREENS)[number];

export interface PersistedState {
  [key: string]: string | null | undefined | any;
}

export interface WidgetStateType extends PersistedState {
  screen: WidgetScreenType;
  errorMessage: string | null;
  loadingMessage: string | null;
  organizationId: string | null;
  // contactSessionIdUpdated: number | undefined;
  conversationId: Id<"conversations"> | null;
}

export type WidgetActionType =
  | { type: "SCREEN"; payload: WidgetScreenType }
  | { type: "ERROR"; payload: string | null }
  | { type: "LOADING"; payload: string | null }
  | { type: "ORGANIZATION_ID"; payload: string | null }
  | {
      type: "CONTACT_SESSION_ID_FAMILY";
      payload: {
        member: string | null;
        value: string | null;
      };
    }
  | { type: "CONVERSATION_ID"; payload: Id<"conversations"> | null };
