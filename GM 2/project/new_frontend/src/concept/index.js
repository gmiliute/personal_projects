import { createTheme as createMuiTheme, responsiveFontSizes } from '@mui/material/styles';
import { ltr as createBaseOptions } from './base/ltr';
import { themeCombine as createLightOptions } from './main/theme-combine';

export const createTheme = (config) => {
  let theme = createMuiTheme(
    createBaseOptions({
      direction: config.direction
    }),
        createLightOptions({
        colorPreset: config.colorPreset,
        contrast: config.contrast
      }));

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
