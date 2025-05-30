import { Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuCard from "./MenuCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantById } from '../../state/restaurant/Action'
const categories = ['pizza', 'biriyani', 'burger', 'chicken', 'rice'];

const foodTypes = [
    { label: "All", value: 'all' },
    { label: "Vegetarian Only", value: 'vegetarian' },
    { label: 'Non Vegetarian', value: 'non-vegetarian' },
]



const menu = [1, 1, 1, 1, 1, 1, 1]
const RestaurantDetails = () => {

    const [foodType, setFoodType] = useState("all");


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant } = useSelector((store) => store.restaurant);
    const { auth } = useSelector(store => store);

    console.log("auth", auth, "restaurant", restaurant);
    const { id } = useParams();


    useEffect(() => {
        dispatch(getRestaurantById({ restaurantId: id, jwt }));
    }, [dispatch, id, jwt]);


    const HandleFilter = (e) => {
        setFoodType(e.target.value)
    }


    return (
        <div>
            <section className="px-5 lg:px-10 py-5 min-h-screen">
                <div className="p-4 max-w-6xl mx-auto">
                    <div className="w-full mb-0">
                        <img
                            src="https://images.pexels.com/photos/1383776/pexels-photo-1383776.jpeg"
                            alt="Top"
                            className="w-full h-[50vh] object-cover rounded-lg"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
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

                <div className="pt-1 pb-5 pl-5">
                    <h1 className="text-2xl font-semibold">
                        {restaurant.name}
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm">
                        <span>
                            {restaurant?.description
                                ? `${restaurant.description} straight to your doorstep, offering a wide range of cuisines from local gems to international favorites.`
                                : 'Straight to your doorstep, offering a wide range of cuisines from local gems to international favorites.'
                            }
                        </span>
                    </p>

                    <p className="text-gray-500 text-sm flex items-center gap-3 mb-1">
                        <LocationOnIcon fontSize="22" />
                        <span>
                            {restaurant.address}
                        </span>
                    </p>
                    <p className="text-gray-500 text-sm flex items-center gap-3">
                        <CalendarTodayIcon fontSize="22" />
                        <span>
                            {restaurant.openingTime} - {restaurant.closingTime}
                        </span>
                    </p>

                </div>

            </section>

            <Divider />
            <section className="pt-[2rem] lg:flex relative">
                <div className="spcae-y-10 lg:w-[20%] filter p-5">
                    <div className="box space-y-5 lg:sticky top-28 d">

                        <div>
                            <p>
                                <Typography variant="h5" sx={{ paddingBottom: '1rem' }}>
                                    Food Type
                                </Typography>
                                <FormControl className="py-10 space-y-5" component={"fieldset"}>
                                    <RadioGroup onChange={HandleFilter} name="foodType" value={foodType || 'all'}>
                                        {foodTypes.map(
                                            (item) =>
                                                <FormControlLabel
                                                    key={item.value}
                                                    value={item.value}
                                                    control={<Radio />}
                                                    label={item.label} />
                                        )}
                                    </RadioGroup>
                                </FormControl>

                                <Divider />

                                <Typography variant="h5" sx={{ paddingBottom: '1rem' }}>
                                    Food Category
                                </Typography>
                                <FormControl className="py-10 space-y-5" component={"fieldset"}>
                                    <RadioGroup onChange={HandleFilter} name="foodType" value={foodType || 'all'}>
                                        {categories.map(
                                            (item) =>
                                                <FormControlLabel
                                                    key={item}
                                                    value={item}
                                                    control={<Radio />}
                                                    label={item} />
                                        )}
                                    </RadioGroup>
                                </FormControl>
                            </p>
                        </div>


                    </div>
                </div>

                <div className="spcae-y-5 lg:w-[80%] lg:pl-10">
                    {menu.map((item) =>
                        <MenuCard />
                    )}
                </div>

            </section>
        </div>

    );
};

export default RestaurantDetails;
