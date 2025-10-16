import { createContext } from "react";
import { WidgetScreen } from "@/modules/widget/types";

export const ScreenContext = createContext<WidgetScreen>("auth");
