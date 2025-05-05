import React, { useState } from 'react'
import ProfileNavigation from './ProfileNavigation'
import { Route , Routes} from 'react-router-dom'
import UserProfile from './UserProfile'
import UserOrders from './UserOrders'
import UserNotifications from './UserNotifications';
import UserAddress from './UserAddress';

const Profile = ({ openSlideBar, setOpenSlideBar }) => {
  

  return (
    <div className='lg:flex justify-between'>
      <div className='sticky h-[80vh] lg:w-[20%]'>
      <ProfileNavigation open={openSlideBar} handleClose={() => setOpenSlideBar(false)} />
      </div>
      <div className='lg:w-[80%]'>
      <Routes>
        <Route path='/' element={<UserProfile/>}/>
        <Route path='/orders' element={<UserOrders/>}/>
        <Route path='/notifications' element={<UserNotifications/>}/>
        <Route path='/address' element={<UserAddress/>}/>


      </Routes>

      </div>
    </div>
  )
}

export default Profile
