import { Avatar, IconButton } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = ({ isDarkMode, setIsDarkMode, setProfileNavOpen }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:900px)");

  const handleAvatharClick = () => {
    if(user.role === "ROLE_CUSTOMER"){
      navigate('/myprofile')
    }else{
      navigate('/admin/restaurant')
    }
  }

  return (
    <div className="sticky top-0 px-5 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between items-center">
      <li className="logo font-semibold text-gray-300 text-2xl list-none">
        {isSmallScreen && (
          <IconButton onClick={() => setProfileNavOpen(prev => !prev)}>
            <ViewHeadlineIcon />
          </IconButton>
        )}
       <p onClick={() => navigate('/')}>
       QuickBites
       </p>
      </li>

      <div className="flex items-center space-x-2 lg:space-x-10">
        <IconButton>
          <SearchIcon sx={{ fontSize: "1.5rem" }} />
        </IconButton>

        <IconButton>
          <ShoppingCartIcon sx={{ fontSize: "1.5rem" }} />
        </IconButton>

        <div>
          {user ? (
            <Avatar onClick={handleAvatharClick} sx={{ bgcolor: 'white', color: '#e91e63' }}>
              {user.firstName[0].toUpperCase()}
            </Avatar>
          ) : (
            <IconButton onClick={() => navigate('/account/login')}>
              <AccountCircleIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
          )}
        </div>

        <IconButton onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? (
            <ModeNightIcon sx={{ fontSize: "1.5rem" }} />
          ) : (
            <LightModeIcon sx={{ fontSize: "1.5rem" }} />
          )}
        </IconButton>
      </div>
    </div>
  );
};

export default Navbar;
