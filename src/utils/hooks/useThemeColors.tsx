import { lightTheme } from "../styles/theme";
import { ThemeType } from "../types/types";

export const useThemeColors = () => {
  const themeColors: ThemeType["colors"] = lightTheme.colors;
  // scheme === "light" ? lightTheme.colors : darkTheme.colors;
  return themeColors;
};
