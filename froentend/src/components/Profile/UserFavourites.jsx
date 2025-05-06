import React from 'react'
import RestaurantCard from '../restaurant/RestaurantCard'

const UserFavourites = () => {
  const favourites = [1, 1, 1, 1];

  return (
    <div>
      <h1 className='py-5 text-xl font-semibold text-center'>
        My Favourites
      </h1>
      <div className='flex flex-wrap gap-2 justify-center'>
        {favourites.map((item, index) =>
          <RestaurantCard key={index} />
        )}
      </div>
    </div>
  )
}

export default UserFavourites
