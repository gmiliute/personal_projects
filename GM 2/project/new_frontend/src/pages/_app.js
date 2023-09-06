import { useEffect } from 'react';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { SettingsConsumer, SettingsProvider } from '../sections/theme-details';
import { AuthConsumer, AuthProvider } from '../sections/jwt';
import { createTheme } from '../concept';
import { cacheT } from '../utils/cache-t';
import { SettingsDrawer } from '../sections';

const clientSideEmotionCache = cacheT();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          ETHERDER
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AuthProvider>
            <AuthConsumer>
              {(auth) => (
                <SettingsProvider>
                  <SettingsConsumer>
                    {(settings) => {

                      const theme = createTheme({
                        colorPreset: settings.colorPreset,
                        contrast: settings.contrast,
                        direction: settings.direction,
                        paletteMode: settings.paletteMode,
                        responsiveFontSizes: settings.responsiveFontSizes
                      });

                      const showSlashScreen = !auth.isInitialized;

                      return (
                        <ThemeProvider theme={theme}>
                          <Head>
                            <meta
                              name="color-scheme"
                              content={settings.paletteMode}
                            />
                            <meta
                              name="theme-color"
                              content={theme.palette.neutral[900]}
                            />
                          </Head>
                            <CssBaseline />
                            {showSlashScreen
                              ? <SplashScreen />
                              : (
                                <>
                                  {getLayout(
                                    <Component {...pageProps} />
                                  )}
                                  <SettingsDrawer
                                    canReset={settings.isCustom}
                                    onClose={settings.handleDrawerClose}
                                    onReset={settings.handleReset}
                                    onUpdate={settings.handleUpdate}
                                    open={settings.openDrawer}
                                    values={{
                                      colorPreset: settings.colorPreset,
                                      contrast: settings.contrast,
                                      direction: settings.direction,
                                      paletteMode: settings.paletteMode,
                                      responsiveFontSizes: settings.responsiveFontSizes,
                                      stretch: settings.stretch,
                                      layout: settings.layout,
                                      navColor: settings.navColor
                                    }}
                                  />
                                </>
                              )}
                        </ThemeProvider>
                      );
                    }}
                  </SettingsConsumer>
                </SettingsProvider>
              )}
            </AuthConsumer>
          </AuthProvider>
        </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
