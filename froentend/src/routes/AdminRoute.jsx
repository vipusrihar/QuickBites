import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateRestaurantForm from '../adminComponenets/CreateRestaurantForm'
import Admin from '../adminComponenets/Admin'
import CreateMenuForm from '../adminComponenets/CreateMenuForm'
import { useSelector } from 'react-redux'

export const AdminRoute = () => {
    const {restaurant} = useSelector(store => store)

    return (
        <div>
            <Routes>
                <Route path='/*' element={
                    !restaurant.userRestaurant 
                    ? 
                    <CreateRestaurantForm />
                    : 
                    <Admin />}>
                </Route>
            </Routes>
        </div>
    )
}


