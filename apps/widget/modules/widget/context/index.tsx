"use client";

import {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useContext,
  useEffect,
} from "react";
import {
  WidgetStateType,
  WidgetActionType,
  PersistedState,
} from "@/modules/widget/types";
import { CONTACT_SESSION_KEY } from "@/modules/widget/constants";

const WidgetStateContext = createContext<WidgetStateType | null>(null);
const WidgetDispatchContext = createContext<Dispatch<WidgetActionType> | null>(
  null
);

// const initialPersistedState = {} as PersistedState;

// const initialState = {
//   screen: "loading",
//   errorMessage: "Oppsie",
//   loadingMessage: "loading actually...",
//   organizationId: "",
// } as WidgetStateType;

// Define the reducer logic
const widgetReducer = (
  state: WidgetStateType,
  action: WidgetActionType
): WidgetStateType => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loadingMessage: action.payload };
    case "SCREEN":
      return { ...state, screen: action.payload };
    case "ERROR":
      return { ...state, errorMessage: action.payload };
    case "ORGANIZATION_ID":
      return { ...state, organizationId: action.payload };
    case "CONTACT_SESSION_ID_FAMILY":
      const dynamicKey = `${CONTACT_SESSION_KEY}-${action.payload.member}`;
      return {
        ...state,
        contactSessionIdFamily: {
          ...state.contactSessionIdFamily,
          [dynamicKey]: action.payload.value,
        },
        [dynamicKey]: action.payload.value,
      };
    default:
      return state;
  }
};

const getPersistedState = (state: WidgetStateType): PersistedState => {
  // const persisted = {} as PersistedState;
  // Object.keys(state).forEach((key) => {
  //   if (key.startsWith(CONTACT_SESSION_KEY)) {
  //     persisted[key] = state[key];
  //   }
  // });
  // return persisted;
  return { ...state.contactSessionIdFamily };
};

const loadInitialState = () => {
  const defaultState: WidgetStateType = {
    screen: "loading",
    errorMessage: "Oppsie",
    loadingMessage: "loading actually...",
    organizationId: "",
    contactSessionIdFamily: {},
  };

  try {
    let savedState = {} as PersistedState;
    if (typeof localStorage !== "undefined") {
      Object.keys(localStorage).filter((key) => {
        if (key.startsWith(CONTACT_SESSION_KEY)) {
          savedState[key] = localStorage[key];
        }
      });
      // savedState = localStorage.getItem(CONTACT_SESSION_KEY);
    }

    if (Object.keys(savedState).length > 0) {
      // const parsed = JSON.parse(savedState) as Partial<PersistedState>;
      // Merge saved persisted state with transient defaults
      return {
        ...defaultState,
        ...savedState,
        // Deep merge custom settings to prevent overwriting default sub-keys if loading fails
        // contactSessionIdFamily: {
        //   ...defaultState.contactSessionIdFamily,
        //   ...parsed,
        // },
      };
    }
  } catch (error) {
    console.error("Failed to load state from localStorage:", error);
  }
  return defaultState;
};

export const WidgetProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    widgetReducer,
    undefined,
    loadInitialState
  );

  useEffect(() => {
    // Extract only the fields we want to save
    const persistedState = getPersistedState(state);

    try {
      // localStorage.setItem(CONTACT_SESSION_KEY, JSON.stringify(persistedState));
      Object.keys(persistedState).forEach((key) => {
        localStorage.setItem(key, persistedState[key] as string);
      });
      console.log("State saved to localStorage:", persistedState);
    } catch (error) {
      console.error("Failed to save state to localStorage:", error);
    }

    // Dependency Array Update:
    // We now include the 'customSettings' object in the dependency array.
    // The reducer ensures a new reference for customSettings is created whenever it changes,
    // which correctly triggers this effect.
  }, [state.contactSessionIdFamily]);

  return (
    <WidgetStateContext.Provider value={state}>
      <WidgetDispatchContext.Provider value={dispatch}>
        {children}
      </WidgetDispatchContext.Provider>
    </WidgetStateContext.Provider>
  );
};

export const useWidgetState = () => {
  const context = useContext(WidgetStateContext);

  if (context === null) {
    throw new Error("useWidgetState must be used within an WidgetProvider");
  }

  return context;
};

export const useWidgetDispatch = () => {
  const context = useContext(WidgetDispatchContext);

  if (context === null) {
    throw new Error("useWidgetDispatch must be used within an WidgetProvider");
  }

  return context;
};
