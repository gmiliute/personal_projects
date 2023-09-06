import { texts } from './texts';
import { elements } from './elements';

export const ltr = (config) => {
  const { direction = 'ltr' } = config;

  return {
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1440
      }
    },
    components: elements(),
    direction,
    shape: {
      borderRadius: 8
    },
    typography: texts()
  };
};
