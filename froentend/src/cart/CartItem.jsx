import React from 'react'
import { IconButton } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const CartItem = () => {
    return (
        <div className='px-5'>
            <div className='lg:flex items-center lg:space-x-5'>

                <div>
                    <img
                        className='w-[5rem] h-[5rem] object-cover'
                        src='https://images.pexels.com/photos/1556698/pexels-photo-1556698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                        alt=''
                    />
                </div>

                <div className='flex items-center  justify-center lg:w-[70%]'>

                    <div className='space-y-1 lg:space-y-3 w-full'>
                        <p>Burger</p>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center space-x-1'>

                                <IconButton>
                                    <RemoveIcon />
                                </IconButton>
                                <div className='w-5 h-5 text-xs flex items-center justify-center '>
                                    5
                                </div>
                                <IconButton>
                                    <AddIcon />
                                </IconButton>
                            </div>

                        </div>

                    </div>

                    <p>
                        Rs.234
                    </p>
                </div>


            </div>
            <div>
                
            </div>

        </div>
    )
}

export default CartItem
