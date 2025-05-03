import { TextField, Button } from '@mui/material';
import React from 'react';

const DelivaryForm = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <form className="space-y-4 p-6 shadow-md rounded-md bg-white">
                <div>
                    <TextField fullWidth label="Delivery Address" variant="standard" />
                    <TextField fullWidth label="Phone Number" variant="standard" />
                </div>
                <Button variant="contained" fullWidth>Place Order</Button>
            </form>
        </div>
    );
};

export default DelivaryForm;
