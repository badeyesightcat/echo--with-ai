import { WIDGET_SCREENS } from "@/modules/widget/constants";

export type WidgetScreenType = (typeof WIDGET_SCREENS)[number];

export interface PersistedState {
  [key: string]: string | null | undefined | any;
}

export interface WidgetStateType extends PersistedState {
  screen: WidgetScreenType;
  errorMessage: string | null;
  loadingMessage: string | null;
  organizationId: string | null;
  contactSessionIdFamily?: { [key: string]: string | null };
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
    };
