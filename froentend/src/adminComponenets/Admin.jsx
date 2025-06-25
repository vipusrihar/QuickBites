import React, { useEffect } from 'react';
import AdminSlideBar from './AdminSlideBar';
import DashBoard from './DashBoard';
import Orders from './Orders';
import Menu from './Menu';
import FoodCategory from './FoodCategory';
import Details from './Details';
import { Route, Routes } from 'react-router-dom';
import CreateMenuForm from './CreateMenuForm';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantsCategory} from '../state/restaurant/Action';
import {fetchRestaurantOrders} from '../state/restaurantOrder/Action';
const Admin = () => {
  const dispatch = useDispatch();
  const jwt = localStorage("jwt");
  const {restaurant} = useSelector(store => store)
  const handleClose = () => {
    // Add close logic for temporary drawer on small screens
  };


  useEffect( ()=>{
    dispatch(getRestaurantsCategory({jwt,restaurantId:restaurant.usersRestaurant?.id}));
    dispatch(fetchRestaurantOrders({jwt, restaurantId: restaurant.usersRestaurant}))

  },[])

  return (
    <div>
      <div className="lg:flex justify-between">
        <div>
          <AdminSlideBar handleClose={handleClose} />
        </div>

        <div className="lg:w-[80%] p-4">
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="menu" element={<Menu />} />
            <Route path="category" element={<FoodCategory />} />
            <Route path="details" element={<Details />} />
            <Route path='menu/addMenu' element={<CreateMenuForm/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
