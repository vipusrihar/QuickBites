import React from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { green } from '@mui/material/colors';
import { Button, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className='min-h-screen px-5 flex items-center justify-center'>
            <div className='w-full lg:w-1/4'>
                <Card sx={{ padding: 4, borderRadius: 2, textAlign: 'center' }}>
                    <TaskAltIcon sx={{ fontSize: '5rem', color: green[500] }} />
                    <h1 className='py-5 text-2xl font-semibold'>Order Success</h1>
                    <p className='py-3 text-gray-500'>Thank you for choosing us!</p>
                    <Button
                        onClick={() => navigate('/')}
                        variant='contained'
                        sx={{ marginTop: '1.5rem' }}
                    >
                        Go To Home
                    </Button>
                </Card>
            </div>
        </div>
    );
};

export default PaymentSuccess;
