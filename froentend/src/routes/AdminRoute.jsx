import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateRestaurantForm from '../adminComponenets/CreateRestaurantForm'
import Admin from '../adminComponenets/Admin'
import CreateMenuForm from '../adminComponenets/CreateMenuForm'
import { useSelector } from 'react-redux'

export const AdminRoute = () => {
    const restaurant = useSelector(store => store.restaurant);


    console.log("Restaurant:", restaurant);


    return (
        <div>
            <Routes>
                <Route path='/*' element={
                    !restaurant.usersRestaurant
                        ?
                        <CreateRestaurantForm />
                        :
                        <Admin/>}
                />
            </Routes>
        </div>
    )
}


