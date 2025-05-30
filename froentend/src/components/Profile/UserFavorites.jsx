import React from 'react'
import RestaurantCard from '../restaurant/RestaurantCard'
import { useSelector } from 'react-redux'

const UserFavorites = () => {
  const {auth} = useSelector(store => store)
  return (
    <div>
      <h1 className='py-5 text-xl font-semibold text-center'>
        My favorites
      </h1>
      <div className='flex flex-wrap gap-2 justify-center'>
        {auth.favorites.map((item, index) =>
          <RestaurantCard key={index} restaurant={item}/>
        )}
      </div>
    </div>
  )
}

export default UserFavorites
