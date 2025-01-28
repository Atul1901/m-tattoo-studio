import { lightTheme } from "../styles/theme";
import { ThemeType } from "../types/types";

export const useThemeIcons = () => {
  const themeIcons: ThemeType["icons"] = lightTheme.icons;
  return themeIcons;
};
