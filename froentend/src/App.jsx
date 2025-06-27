import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from './Theme/DarkTheme';
import { dayTheme } from './Theme/DayTheme';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateMenuForm from './adminComponenets/CreateMenuForm';
import Navbar from './components/Navbar/Navbar';
import { useEffect, useState } from 'react';
import Home from './components/Home/Home';
import RestaurantDetails from './components/restaurant/RestaurantDetails';
import Cart from './components/cart/Cart';
import Profile from './components/Profile/Profile';
import Auth from './components/auth/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './state/authentication/Action';
import Admin from './adminComponenets/Admin'
import { AdminRoute } from './routes/AdminRoute';
import CreateRestaurantForm from './adminComponenets/CreateRestaurantForm';
import { getRestaurantByUserId } from './state/restaurant/Action';
import PaymentSuccess from './components/PaymentSuccess/paymentSuccess';

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector((store) => store.auth);


  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [dispatch, jwt]);

  useEffect(() => {
    if (jwt) {
      dispatch(getRestaurantByUserId( jwt));
    }
  }, [auth?.user]);


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

          {/* These two routes are placeholders for the modal */}
          <Route path="/login" element={<></>} />
          <Route path="/register" element={<></>} />


          <Route path="/admin/restaurants/*" element={<AdminRoute />} />

          <Route path='/payment/sucess/:id' element={<PaymentSuccess/>}/>
        </Routes>

        {/* Auth modal is always rendered and uses path to decide when to show */}
        <Auth />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
