import { Avatar, IconButton, Switch } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="px-5 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between items-center">
      <li className="logo font-semibold text-gray-300 text-2xl list-none">
        QuickBites
      </li>

      <div className="flex items-center space-x-2 lg:space-x-10">
        <IconButton>
          <SearchIcon sx={{ fontSize: "1.5rem" }} />
        </IconButton>

        <IconButton>
          <ShoppingCartIcon sx={{ fontSize: "1.5rem" }} />
        </IconButton>

        <IconButton>
          <AccountCircleIcon sx={{ fontSize: "2rem" }} />
        </IconButton>

        {/* <Avatar sx={{ bgcolor: 'white', color: 'pink', width:'2rem', height : '2rem' }}>V</Avatar> */}

        <IconButton onClick={handleThemeChange}>
          {isDarkMode ? <ModeNightIcon sx={{ fontSize: "1.5rem" }} /> : <LightModeIcon sx={{ fontSize: "1.5rem" }} />}
        </IconButton>

      </div>
    </div>
  );
};

export default Navbar;
