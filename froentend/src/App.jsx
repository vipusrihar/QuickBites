import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from './Theme/DarkTheme';
import { dayTheme } from './Theme/DayTheme';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import { useEffect, useState } from 'react';
import Home from './components/Home/Home';
import RestaurantDetails from './components/restaurant/RestaurantDetails';
import Cart from './components/cart/Cart';
import Profile from './components/Profile/Profile';
import Auth from './components/auth/Auth';

import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './components/state/Action';
import { store } from './components/state/store';

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store.auth);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [dispatch, jwt]);

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
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<RestaurantDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/myprofile/*"
            element={
              <Profile
                openSlideBar={openSlideBar}
                setOpenSlideBar={setOpenSlideBar}
              />
            }
          />
        </Routes>
        <Auth />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
