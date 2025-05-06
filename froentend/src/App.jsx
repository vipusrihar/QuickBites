import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from '../src/Theme/DarkTheme.js';
import { dayTheme } from '../src/Theme/DayTheme.js';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Fixed
import Navbar from './components/Navbar/Navbar.jsx';
import { useState } from 'react';
import Home from './components/Home/Home.jsx';
import RestaurantDetails from './components/restaurant/RestaurantDetails.jsx';
import Cart from './components/cart/Cart.jsx';
import Profile from './components/Profile/Profile.jsx';
import Auth from './components/auth/Auth.jsx';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [openSlideBar, setOpenSlideBar] = useState(false);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : dayTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          setProfileNavOpen={setOpenSlideBar}
          profileNavBar={openSlideBar}
        />
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/restaurant/:id' element={<RestaurantDetails />} />
          <Route path='/cart' element={<Cart />} /> */}
          <Route
            path="/myprofile/*"
            element={
              <Profile openSlideBar={openSlideBar} setOpenSlideBar={setOpenSlideBar} />
            }
          />

        </Routes>
        <Auth/>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
