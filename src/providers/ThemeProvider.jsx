import { createContext, useMemo, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import PropTypes from 'prop-types';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import { palette } from 'assets/colorPalette';

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export function useColorModeContext() {
  returnuseContext(ColorModeContext);
}

export default function CustomStyles({ children }) {
  // TODO: Save style prefs of a user in a cookie and update from there on hard load
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(() => {
    const customTheme = createTheme({
      breakpoints: {
        values: {
          xs: 0,
          mobile: 375,
          mobileLandscape: 480,
          sm: 600,
          tablet: 768,
          md: 900,
          lg: 1280,
          xl: 1536,
        },
      },
      mixins: {
        elevation: {
          '@media (min-width:0px)': '0',
          '@media (min-width:600px)': '1',
        },
      },
      palette: {
        mode,
        ...palette,
      },
      shape: {
        backgroundGradient: {
          backgroundColor: `rgb(244,67,54)`,
          background: `linear-gradient(270deg, rgba(244,67,54,1) 0%, rgba(244,67,54,1) 35%, rgba(255,121,97,1) 100%)`,
        },
        borderRadius: 4,
        button: { minWidth: 96 },
      },

      components: {
        MuiButtonBase: {
          defaultProps: {
            disableRipple: true, // No more ripple, on the whole application 💣
          },
        },
        MuiButton: {
          defaultProps: {
            disableElevation: true,
            disableRipple: true,
            disableFocusRipple: true,
            disableTouchRipple: true,
          },
        },
      },
    });

    // Make responsive!
    // See: https://material-ui.com/guides/responsive-ui/
    console.log(customTheme);
    return responsiveFontSizes(customTheme);
  }, [mode]);

  return (
    <>
      <CssBaseline />
      {inputGlobalStyles}
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

CustomStyles.propTypes = {
  children: PropTypes.any,
};

const inputGlobalStyles = (
  <GlobalStyles
    styles={{
      'html, body, #root': {
        width: '100%',
        margin: 0,
        padding: 0,
      },
      '*:focus': {
        outline: 'none',
      },
      'button:focus': {
        outline: 'none',
      },
      'a:focus': {
        outline: 'none',
      },
      'input:focus': {
        outline: 'none',
      },
      // These are the styles for the autofill
      // They are necessary to override the default styles
      // That are applied by the browser !!! Super Important !!!
      'input:-internal-autofill-selected': {
        backgroundColor: 'transparent !important',
      },
      'input:-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 1000px #fff inset !important',
        WebkitTextFillColor: '#000 !important',
        caretColor: '#000 !important',
      },
      'input:-webkit-autofill:hover': {
        WebkitBoxShadow: '0 0 0 1000px #fff inset !important',
        WebkitTextFillColor: '#000 !important',
      },
    }}
  />
);