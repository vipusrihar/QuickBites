import { Button, Card } from '@mui/material'
import React from 'react'
import PlaceIcon from '@mui/icons-material/Place';

const AddressCard = ({ item, showButton, handleSelectAddress }) => {


    return (
        <Card className='flex gap-5 w-60 p-5'>

            <PlaceIcon />
            <div className='space-y-3 text-gray-500'>
                <h1 className='font-semibold text-lg text-gray-300'>
                    Home
                </h1>
                <p>
                    Thoddilady, Chanakanai

                </p>

                {showButton && <Button variant="outlined" fullWidth onClick={() => handleSelectAddress(item)} > Select Address </Button>}
            </div>

        </Card>
    )
}

export default AddressCard
