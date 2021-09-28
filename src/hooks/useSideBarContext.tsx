import React, {
  useCallback,
  useContext,
  createContext,
  useEffect,
  useState
} from "react";
import {
  useMediaQuery,
  useTheme
} from "@material-ui/core";

export interface ISideBarContext {
  expanded: boolean,
  setExpanded(expand: boolean): void,
  toggleExpanded(): void
}

export const SideBarContext = createContext<ISideBarContext | undefined>(undefined)

export const ProvideSideBarContext: React.FC = ({ children }) => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'));
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const defaultExpanded = isLarge;
    setExpanded(defaultExpanded)
  }, [isLarge])

  const toggleExpanded = useCallback(() => {
    setExpanded((expanded) => !expanded)
  }, [setExpanded]);

  const ctx = {
    toggleExpanded,
    expanded,
    setExpanded
  }

  return (
    <SideBarContext.Provider value={ctx}>{children}</SideBarContext.Provider>
  )
}

export const useSideBarContext = () => {
  const ctx = useContext(SideBarContext);
  if (ctx === undefined) {
    throw new Error(
      "Sidebar Context must be used within ProvideSidebarContext"
    )
  }
  return ctx;
}