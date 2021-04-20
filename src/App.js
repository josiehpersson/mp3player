import React from 'react';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import Mp3Container from './components/Mp3Container';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#7912B8',
    },
    secondary: {
      main: '#D80094',
    },
    error: {
      main: '#FF346C',
    },
    warning: {
      main: '#FF7F4D',
    },
    info: {
      main: '#0099F7',
    },
    success: {
      main: '#00C0A9',
    }
  },
  spacing: 8,
})
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Mp3Container />
    </ThemeProvider>
  );
}

export default App;
