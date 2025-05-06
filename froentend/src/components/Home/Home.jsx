import React from 'react'
import './Home.css'
import MutliItemCarousel from './MultiItemCarousel';
import RestaurantCard from '../restaurant/RestaurantCard'


const restaurants = [1,1,2,3,2,3,2,]

const Home = () => {

    return (
        <div className=''>
            <section className='banner -z-50 relative flex flex-col justify-center items-center'>
                <div className='w-[50vw] z-10 text-center'>
                    <p className='text-2xl lg:text-5xl font-bold z-10 py-5'>Welcome to  Quick Bites – Your Ultimate Food Delivery Experience!</p>
                    <p className='z-10 text-gray-300 text-xl lg:text-2xl'>
                        Craving something delicious? You've come to the right place! QuickBites brings your favorite restaurants
                        straight to your doorstep, offering a wide
                        range of cuisines from local gems to international favorites.
                    </p>
                </div>
                <div className='cover absolute top-0 left-0 right-0'>

                </div>
                <div className='fadout'>

                </div>
            </section>

            <section className='p-10 lg:py-10 lg:px-20'>
                <p className='text-2xl font-semibold text-gray-400 py-3 pb-10'>Top Meals</p>
                <MutliItemCarousel/>
            </section>

            <section className='px-10 lg:py-10 lg:px-20 pb-5'>
                <h1 className='text-2xl font-semibold text-gray-400'>
                    Order From our HandPicked Favourites
                </h1>
                <div className='m-5 flex flex-wrap justify-around items-center gap-5 '>
                    {
                        restaurants.map((item, index) => <RestaurantCard key={index}/>)
                    }
                </div>
            </section>

        </div>
    )
}

export default Home