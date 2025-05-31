import {
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MenuCard from "./MenuCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantById } from "../../state/restaurant/Action";

const foodTypes = [
  { label: "All", value: "all" },
  { label: "Vegetarian", value: "veg" },
  { label: "Non Vegetarian", value: "non-veg" },
];

const categories = [
  { label: "Pizza", value: "pizza" },
  { label: "Biriyani", value: "biriyani" },
  { label: "Burger", value: "burger" },
  { label: "Chicken", value: "chicken" },
  { label: "Rice", value: "rice" },
];


const RestaurantDetails = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant } = useSelector((store) => store.restaurant);
  const auth = useSelector((store) => store.auth);


  const { id } = useParams();

  useEffect(() => {
    dispatch(getRestaurantById({ restaurantId: id, jwt }));
  }, [dispatch, id, jwt]);

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const menu = restaurant?.menuItems
  return (
    <div>
      {/* Top Images Section */}
      <section className="px-5 lg:px-10 py-5 min-h-screen">
        <div className="p-4 max-w-6xl mx-auto">
          <div className="w-full mb-4">
            <img
              src="https://images.pexels.com/photos/1383776/pexels-photo-1383776.jpeg"
              alt="Top"
              className="w-full h-[50vh] object-cover rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img
              src="https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg"
              alt="Bottom Left"
              className="w-full h-[40vh] object-cover rounded-lg"
            />
            <img
              src="https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg"
              alt="Bottom Right"
              className="w-full h-[40vh] object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="pt-1 pb-5 pl-5">
          <h1 className="text-2xl font-semibold">
            {restaurant?.name || "Restaurant Name"}
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            {restaurant?.description
              ? `${restaurant.restaurant.description} straight to your doorstep, offering a wide range of cuisines from local gems to international favorites.`
              : "Straight to your doorstep, offering a wide range of cuisines from local gems to international favorites."}
          </p>

          <p className="text-gray-500 text-sm flex items-center gap-3 mb-1">
            <LocationOnIcon fontSize="22" />
            <span>{restaurant?.restaurant?.address}</span>
          </p>

          <p className="text-gray-500 text-sm flex items-center gap-3">
            <CalendarTodayIcon fontSize="22" />
            <span>
              {restaurant?.openingTime} -{" "}
              {restaurant?.closingTime}
            </span>
          </p>
        </div>
      </section>

      <Divider />

      {/* Filter + Menu Section */}
      <section className="pt-[2rem] lg:flex relative">
        {/* Sidebar Filters */}
        <div className="space-y-10 lg:w-[20%] p-5">
          <div className="space-y-5 lg:sticky top-28">
            {/* Food Type Filter */}
            <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
              Food Type
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                name="foodType"
                value={
                  foodTypes.some((ft) => ft.value === selectedFilter)
                    ? selectedFilter
                    : ""
                }
                onChange={handleFilterChange}
              >
                {foodTypes.map((item) => (
                  <FormControlLabel
                    key={item.value}
                    value={item.value}
                    control={<Radio />}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Divider sx={{ margin: "1rem 0" }} />

            {/* Food Category Filter */}
            <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
              Food Category
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                name="foodCategory"
                value={
                  categories.some((cat) => cat.value === selectedFilter)
                    ? selectedFilter
                    : ""
                }
                onChange={handleFilterChange}
              >
                {categories.map((item) => (
                  <FormControlLabel
                    key={item.value}
                    value={item.value}
                    control={<Radio />}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
        </div>

        {/* Menu Cards */}
        <div className="space-y-5 lg:w-[80%] lg:pl-10">
          {menu?.map((menuItem, index) => (
            <MenuCard key={index} item={menuItem} />
          ))}

        </div>
      </section>
    </div>
  );
};

export default RestaurantDetails;
