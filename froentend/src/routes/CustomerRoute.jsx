import { Home } from '@mui/icons-material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RestaurantDetails from '../components/restaurant/RestaurantDetails'
import Cart from '../components/cart/Cart'
import Profile from '../components/Profile/Profile'
import RegisterForm from '../components/auth/RegisterForm'
import LoginForm from '../components/auth/LoginForm'

const CustomerRoute = () => {
    return (
        <Routes>
           
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
            <Route path="/account/register" />
            <Route path="/account/login" />
            <Route path="/admin/restaurant" element={<Home />} />

        </Routes>
    )
}

export default CustomerRoute
