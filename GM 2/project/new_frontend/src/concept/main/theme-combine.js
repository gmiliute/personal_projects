import { elements } from './elements';
import { colourSchema } from './colour-schema';

export const themeCombine = ({ colorPreset, contrast }) => {
  const palette = colourSchema({ colorPreset, contrast });
  const components = elements({ palette });

  return {
    components,
    palette,
  };
};
