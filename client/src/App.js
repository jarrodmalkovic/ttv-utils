import React from 'react';
import SideMenu from './components/layout/SideMenu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import store from './store';
import Notifications from './components/layout/Notifications';

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Notifications />
        <CssBaseline />
        <SideMenu />
      </ThemeProvider>
    </Provider>
  );
}
