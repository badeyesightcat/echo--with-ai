"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { STATUS_FILTER_KEY } from "@/modules/dashboard/constants";
import { PersistedState, WebActionType, WebStateType } from "../types";

const WebStateContext = createContext<WebStateType | null>(null);
const WebDispatchContext = createContext<Dispatch<WebActionType> | null>(null);

const webReducer = (
  state: WebStateType,
  action: WebActionType
): WebStateType => {
  switch (action.type) {
    case "FILTER":
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

// const getPersistedState = (state: WebStateType): PersistedState => {
//   const persisted = {} as PersistedState;

//   Object.keys(state).forEach((key) => {
//     if (key.startsWith(STATUS_FILTER_KEY)) {
//       persisted[key] = state[key];
//     }
//   });

//   return persisted;
// };

const loadInitialState = () => {
  const defaultState: WebStateType = {
    filter: "all",
  };

  try {
    let savedState = {} as PersistedState;
    if (typeof localStorage !== "undefined") {
      Object.keys(localStorage).filter((key) => {
        if (key.startsWith(STATUS_FILTER_KEY)) {
          defaultState.filter = localStorage[key];
        }
      });
    }

    if (Object.keys(savedState).length > 0) {
      return {
        ...defaultState,
        ...savedState,
      };
    }
  } catch (error) {
    console.error("Failed to load state from localStorage:", error);
  }
  return defaultState;
};

export const WebProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(webReducer, undefined, loadInitialState);

  // const persistedKeys = useMemo(
  //   () => Object.keys(getPersistedState(state)),
  //   [state]
  // );

  // const persistedValues = useMemo(
  //   () => Object.values(getPersistedState(state)),
  //   [state]
  // );

  useEffect(() => {
    // Extract only the fields we want to save
    // const persistedState = getPersistedState(state);

    try {
      localStorage.setItem(STATUS_FILTER_KEY, state.filter);
      // Object.keys(persistedState).forEach((key) => {
      //   localStorage.setItem(key, persistedState[key] as string);
      // });
    } catch (error) {
      console.error("Failed to save state to localStorage:", error);
    }

    // Dependency Array Update:
    // We now include the 'customSettings' object in the dependency array.
    // The reducer ensures a new reference for customSettings is created whenever it changes,
    // which correctly triggers this effect.
  }, [state]);

  return (
    <WebStateContext.Provider value={state}>
      <WebDispatchContext.Provider value={dispatch}>
        {children}
      </WebDispatchContext.Provider>
    </WebStateContext.Provider>
  );
};

export const useWebState = () => {
  const context = useContext(WebStateContext);

  if (context === null) {
    throw new Error("useWebState must be used within an WebProvider");
  }

  return context;
};

export const useWebDispatch = () => {
  const context = useContext(WebDispatchContext);

  if (context === null) {
    throw new Error("useWebDispatch must be used within an WebProvider");
  }

  return context;
};

export const useStatusFilter = () => {
  const { filter } = useWebState();
  // const statusFilterKey = `${STATUS_FILTER_KEY}-${organizationId}`;

  return filter;
};
