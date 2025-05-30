import { Card, Chip, IconButton } from '@mui/material';
import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { addToFavorite } from '../../state/authentication/Action';
import { isPresentInfavorites } from '../config/logic';
import { useSelector, useDispatch } from 'react-redux';

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const auth = useSelector((state) => state.auth);

  const handleAddToFavorite = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking favorite icon
    if (!jwt || !auth.user) return;
    dispatch(addToFavorite(jwt, restaurant.id, auth.user.id));
  };

  const handleNavigateToRestaurant = () => {
    if (restaurant.working) {
      navigate(`/restaurant/${restaurant.id}`);
    }
  };

  return (
    <Card className="w-[18rem] shadow-lg">
      <div
        onClick={handleNavigateToRestaurant}
        className={`${restaurant.working ? 'cursor-pointer' : 'cursor-not-allowed'} relative`}
      >
        <img
          src={restaurant.image}
          alt="restaurant"
          className="w-full h-[10rem] rounded-t-md object-cover"
        />
        <Chip
          size="small"
          className="!absolute top-2 left-2"
          color={restaurant.working ? 'success' : 'error'}
          label={restaurant.working ? 'Open' : 'Closed'}
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center">
          <p
            className="font-semibold text-lg"
            onClick={handleNavigateToRestaurant}
          >
            {restaurant.name}
          </p>
          <IconButton onClick={handleAddToFavorite}>
            {isPresentInfavorites(auth.favorites, restaurant) ? (
              <FavoriteIcon className="text-red-500" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </div>
        <p className="text-gray-500 text-sm mt-1">{restaurant.description}</p>
      </div>
    </Card>
  );
};

export default RestaurantCard;
