import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'
import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useDispatch, useSelector } from 'react-redux';
import { updateRestaurantStatus } from '../state/restaurant/Action';

const Details = () => {
  const {restaurant} = useSelector((store) => store)
  const dispatch = useDispatch()

  console.log("Restaurant Details : ",restaurant)

  const handleRestaurantStatus = () => {
    dispatch(updateRestaurantStatus({restaurantId:restaurant.usersRestaurant.id, jwt:localStorage.getItem("jwt")}))
  }
  return (
    <div className='lg:px-20 px-5 pb-10'>
      <div className='py-5 flex justify-center items-center gap-5'>
        <h1 className='text-2xl lg:text-7xl text-center font-bold p-5'>{restaurant.usersRestaurant?.name}</h1>

        <div>
          <Button color={restaurant.usersRestaurant?.open ? "primary" : "error"} className='py-[1rem] px-[2rem]' onClick={handleRestaurantStatus} size='large'>
            {restaurant.usersRestaurant?.open ? "close" : "open"}
          </Button>
        </div>

      </div>
      <Grid container spacing={2}>

        <Grid item xs={12} lg={12}>
          <Card>
            <CardHeader title={<span className='text-gray-700'>Restaurant</span>} />
            <CardContent>
              <div className='space-y-4 text-gray-500'>
                <div className='flex'>
                  <p className='w-48'>Owner</p>
                  <p className='text-gray-400'>
                    <span className='pr-55'>-</span>
                    {restaurant.usersRestaurant?.owner?.firstName}
                  </p>
                </div>
                {/* <div className='flex'>
                  <p className='w-48'>Owner</p>
                  <p className='text-gray-400'>
                    <span className='pr-55'>-</span>
                    Vipusa Sriharan
                  </p>
                </div> */}
                <div className='flex'>
                  <p className='w-48'>Restaurant Name</p>
                  <p className='text-gray-400'>
                    <span className='pr-55'>-</span>
                    {restaurant.usersRestaurant?.name}
                  </p>
                </div>
                {/* <div className='flex'>
                  <p className='w-48'>Address</p>
                  <p className='text-gray-400'>
                    <span className='pr-55'>-</span>
                    Vipusa Sriharan
                  </p>
                </div> */}
                <div className='flex'>
                  <p className='w-48'>Opening Hours</p>
                  <p className='text-gray-400'>
                    <span className='pr-55'>-</span>
                    {restaurant.usersRestaurant?.openingTime} - {restaurant.usersRestaurant?.closingTime}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Status</p>
                  <p className='text-gray-400'>
                    <span className='pr-55'>-</span>
                    {
                    restaurant.usersRestaurant?.status
                    ? 
                    <span className='px-5 py-2 rounded-full bg-green-400 text-gray-900'>Open</span>
                     : 
                    <span className='px-5 py-2 rounded-full bg-red-400 text-gray-900'>Close</span>
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </Grid>
        
        <Grid item xs={12} lg={6} >
          <Card>
            <CardHeader title={<span className='text-gray-700'>Address</span>} />
            <CardContent>
              <div className='space-y-4 text-gray-500'>
                <div className='flex'>
                  <p className='w-48'>Country</p>
                  <p className='text-gray-400'>
                    <span className='pr-55'>-</span>
                    Srilanka
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>City</p>
                  <p className='text-gray-400'>
                    <span className='pr-55'>-</span>
                    {restaurant.usersRestaurant?.address?.city}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Postal Code</p>
                  <p className='text-gray-400'>
                    <span className='pr-55'>-</span>
                    {restaurant.usersRestaurant?.address?.zipCode}
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Address</p>
                  <p className='text-gray-400'>
                    <span className='pr-55'>-</span>
                    {restaurant.usersRestaurant?.address?.street}
                  </p>
                </div>
                
                
              </div>
            </CardContent>
          </Card>

        </Grid>


        <Grid item xs={12} lg={6} >
          <Card>
            <CardHeader title={<span className='text-gray-700'>Contact Details</span>} />
            <CardContent>
              <div className='space-y-4 text-gray-500'>
                <div className='flex'>
                  <p className='w-48'>Email</p>
                  <p className='text-gray-400'>
                    <span className='pr-55'>-</span>
                    vipu@gmail.com
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Mobile No</p>
                  <p className='text-gray-400'>
                    <span className='pr-55'>-</span>
                    +774533267
                  </p>
                </div>
                <div className='flex'>
                  <p className='w-48'>Social Medias</p>
                  <p className='text-gray-400'>
                    <span className='pr-55'>-</span>
                    <a href={restaurant.usersRestaurant?.socialMedias?.instagram} ><InstagramIcon sx={{fontSize:'3rem'}}/></a>
                    <a href={restaurant.usersRestaurant?.socialMedias?.twitter}><TwitterIcon sx={{fontSize:'3rem'}}/></a>
                    <a href={restaurant.usersRestaurant?.socialMedias?.facebook}><FacebookIcon sx={{fontSize:'3rem'}}/></a>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </Grid>
      </Grid>
    </div>
  )
}

export default Details
