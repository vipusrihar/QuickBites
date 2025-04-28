import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from '../src/Theme/DarkTheme.js';
import { dayTheme} from '../src/Theme/DayTheme.js';
import { CssBaseline } from '@mui/material';
import Button from '@mui/material/Button';
import Navbar from './components/Navbar/Navbar.jsx';
import { useState } from 'react';
import Home from './components/Home/Home.jsx';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : dayTheme}>
      <CssBaseline />
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Home/>
    </ThemeProvider>
  )
}

export default App
