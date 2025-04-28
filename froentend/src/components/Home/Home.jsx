import React from 'react'
import './Home.css'

const Home = () => {
    return (
        <div className=''>
            <section className='banner -z-50 relative flex flex-col justify-center items-center'>
                <div className='w-[50vw] z-10 text-center'>
                    <p className='text-2xl lg:text-6xl font-bold z-10 py-5'>Welcome to  Quick Bites – Your Ultimate Food Delivery Experience!</p>
                    <p className='z-10 text-gray-300 text-xl lg:text-4xl'>
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

        </div>
    )
}

export default Home