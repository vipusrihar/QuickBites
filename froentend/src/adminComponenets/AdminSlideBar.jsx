import React from 'react';
import {
  AdminPanelSettings,
  ShopTwo,
  Logout,
  Dashboard,
  ShoppingBag,
  Category
} from '@mui/icons-material';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {logout} from '../state/authentication/Action'

const menu = [
  { title: "DashBoard", icon: <Dashboard />, path: "/" },
  { title: "Orders", icon: <ShoppingBag />, path: "/orders" },
  { title: "Menu", icon: <ShopTwo />, path: "/menu" },
  { title: "FoodCategory", icon: <Category />, path: "/category" },
  { title: "Details", icon: <AdminPanelSettings />, path: "/details" },
  { title: "Logout", icon: <Logout />, path: "/logout" },
];

const AdminSlideBar = ({ handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width:1080px)");
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) =>{
    navigation(`/admin/restaurants${item.path}`)
    if(item.title === 'Logout'){
        navigation("/");
        dispatch(logout);
        handleClose();
    }
  }
  return (
    <Drawer
      variant={isSmallScreen ? 'temporary' : 'permanent'}
      anchor="left"
      open={true}
      onClose={handleClose}
      sx={{ zIndex: 1 }}
    >
      <div className="w-[70vw] lg:w-[20vw] h-screen flex flex-col justify-center text-xl space-y-[1.65rem]">
        {menu.map((item, index) => (
          <React.Fragment key={index}>
            <div onClick={() => handleNavigate(item)} className="px-5 flex items-center gap-6 cursor-pointer hover:bg-gray-100 py-2 rounded-md">
              {item.icon}
              <span>{item.title}</span>
            </div>
           {index !== menu.length-1 && <Divider />}
          </React.Fragment>
        ))}
      </div>
      {/* <p>checking drawer is working</p> */}
    </Drawer>
  );
};

export default AdminSlideBar;
