import React, {
  useCallback,
  useContext,
  createContext,
  useMemo,
  useState
} from "react";
import {
  ThemeProvider,
  createTheme
} from "@material-ui/core";

type PalletteType = 'light' | 'dark';

export interface IThemeContext {
  palletteType: PalletteType,
  togglePallette(): void
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

let pallettePreference = localStorage.getItem('palletteType') as PalletteType;
if (!pallettePreference || !['light', 'dark'].includes(pallettePreference)) {
  pallettePreference = 'dark'
}
export const ProvideThemeContext: React.FC = ({ children }) => {
  const [palletteType, setPallette] = useState<PalletteType>(
    pallettePreference
  )

  const togglePallette = useCallback(() => {
    setPallette((prevType) => {
      const newType = prevType === 'dark' ? 'light' : 'dark';
      localStorage.setItem('palletteType', newType);
      return newType;
    })
  }, [setPallette])

  const theme = useMemo(() =>
    createTheme({
      palette: {
        type: palletteType
      }
    })
    , [palletteType]
  )

  const ctx: IThemeContext = {
    palletteType,
    togglePallette
  }

  return (
    <ThemeContext.Provider value={ctx}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (ctx === undefined) {
    throw new Error("theme context must be wrapped in ProvideThemeContext");
  }
  return ctx;
}

