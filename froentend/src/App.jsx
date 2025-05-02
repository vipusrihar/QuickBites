import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from '../src/Theme/DarkTheme.js';
import { dayTheme} from '../src/Theme/DayTheme.js';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router'
import Navbar from './components/Navbar/Navbar.jsx';
import { useState } from 'react';
import Home from './components/Home/Home.jsx';
import RestaurantDetails from './restaurant/RestaurantDetails.jsx';
import Cart from './cart/Cart.jsx';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : dayTheme}>
      <CssBaseline />
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<Home/>} /> */}
          {/* <Route path='/' element={<RestaurantDetails/>} /> */}
          <Route path='/' element=<Cart/> />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
