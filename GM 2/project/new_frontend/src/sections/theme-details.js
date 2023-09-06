import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const initialSettings = {
  colorPreset: 'plum',
  contrast: 'high',
  direction: 'ltr',
  layout: 'horizontal',
  navColor: 'evident',
  paletteMode: 'light',
  responsiveFontSizes: true,
  stretch: false
};

export const ThemeDetails = createContext();

export const SettingsProvider = ({ children }) => {
  const [state, setState] = useState({
    ...initialSettings,
  });

  return (
    <ThemeDetails.Provider value={state}>
      {children}
    </ThemeDetails.Provider>
  );
};

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const SettingsConsumer = ThemeDetails.Consumer;
