import React, { useEffect } from 'react';
import './Home.css';
import MutliItemCarousel from './MultiItemCarousel';
import RestaurantCard from '../restaurant/RestaurantCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurants } from '../../state/restaurant/Action';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const navigate = useNavigate();

    const restaurantState = useSelector(store => store.restaurant);
    console.log("Restaurants array:", restaurantState.restaurants);
    console.log("JWT: ", jwt);

    useEffect(() => {
        if (jwt) {
            dispatch(getAllRestaurants(jwt));
        }
    }, [dispatch, jwt]);

  

    return (
        <div>
            {/* Banner Section */}
            <section className='banner -z-50 relative flex flex-col justify-center items-center'>
                <div className='w-[50vw] z-10 text-center'>
                    <p className='text-2xl lg:text-5xl font-bold z-10 py-5'>
                        Welcome to Quick Bites – Your Ultimate Food Delivery Experience!
                    </p>
                    <p className='z-10 text-gray-300 text-xl lg:text-2xl'>
                        Craving something delicious? You've come to the right place! QuickBites brings your favorite restaurants
                        straight to your doorstep, offering a wide range of cuisines from local gems to international favorites.
                    </p>
                </div>
                <div className='cover absolute top-0 left-0 right-0'></div>
                <div className='fadout'></div>
            </section>

            {/* Top Meals Carousel */}
            <section className='p-10 lg:py-10 lg:px-20'>
                <p className='text-2xl font-semibold text-gray-400 py-3 pb-10'>Top Meals</p>
                <MutliItemCarousel />
            </section>

            {/* Restaurant Cards Section */}
            <section className='px-10 lg:py-10 lg:px-20 pb-5'>
                <h1 className='text-2xl font-semibold text-gray-400'>
                    Order From our HandPicked Favorites
                </h1>
                <div className='m-5 flex flex-wrap justify-around items-center gap-5'>
                    {restaurantState.restaurants.length > 0 ? (
                        restaurantState.restaurants.map((rest) => (
                            <RestaurantCard key={rest.id} restaurant={rest} />
                        ))
                    ) : (
                        <p className='text-gray-500'>No restaurants available.</p>
                    )}
                </div>

            </section>
        </div>
    );
};

export default Home;

