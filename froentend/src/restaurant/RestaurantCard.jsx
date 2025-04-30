import { Card, Chip, IconButton } from '@mui/material';
import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const RestaurantCard = () => {
  const isOpened = true;
  const isFavourite = false;

  return (
    <Card className="w-[18rem] shadow-lg">
      <div className={`${isOpened ? 'cursor-pointer' : 'cursor-not-allowed'} relative`}>
        <img
          src="https://images.pexels.com/photos/1322184/pexels-photo-1322184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="restaurant"
          className="w-full h-[10rem] rounded-t-md object-cover"
        />

        {/* Status Chip inside the image container */}
        <Chip
          size="small"
          className="!absolute top-2 left-2"
          color={isOpened ? 'success' : 'error'}
          label={isOpened ? 'Open' : 'Closed'}
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg">Shri Vani Vilas</p>
          <IconButton>
            {isFavourite ? <FavoriteIcon className="text-red-500" /> : <FavoriteBorderIcon />}
          </IconButton>
        </div>
        <p className="text-gray-500 text-sm mt-1">Pure Vegetarian restaurant</p>
      </div>
    </Card>
  );
};

export default RestaurantCard;
