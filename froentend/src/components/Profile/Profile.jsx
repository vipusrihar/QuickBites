import React, { useState } from 'react'
import ProfileNavigation from './ProfileNavigation'
import { Route , Routes} from 'react-router-dom'
import UserProfile from './UserProfile.jsx'
import UserOrders from './UserOrders.jsx'
import UserNotifications from './UserNotifications.jsx';
import UserAddress from './UserAddress.jsx';
import UserPayment  from './UserPayment.jsx';
import UserFavorites from './UserFavorites.jsx'

const Profile = ({ openSlideBar, setOpenSlideBar }) => {
  

  return (
    <div className='lg:flex justify-between'>
      <div className='sticky h-[80vh] lg:w-[20%]'>
      <ProfileNavigation open={openSlideBar} handleClose={() => setOpenSlideBar(false)} />
      </div>
      <div className='lg:w-[80%] sticky '>
      <Routes>
        <Route path='/' element={<UserProfile/>}/>
        <Route path='orders' element={<UserOrders/>}/>
        <Route path='payment' element={<UserPayment/>}/>
        <Route path='notifications' element={<UserNotifications/>}/>
        <Route path='address' element={<UserAddress/>}/>
        <Route path='favorites' element={<UserFavorites/>}/>


      </Routes>

      </div>
    </div>
  )
}

export default Profile
