import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { ExpandMore } from '@mui/icons-material';
import Button from '@mui/material/Button';

const MenuCard = () => {
    return (
        <div className='mb-5'>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <div className='lg:flex items-center justify-between'>
                        <div className='lg:flex items-center lg:gap-5'>
                            <img
                                className='w-[7rem] h-[7rem] object-cover rounded'
                                src='https://images.pexels.com/photos/1556698/pexels-photo-1556698.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                                alt="Burger"
                            />
                            <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
                                <p className='font-semibold text-xl'>Burger</p>
                                <p>Rs.499</p>
                                <p className='text-gray-400'>Nice Food</p>
                            </div>
                        </div>
                    </div>
                </AccordionSummary>

                <AccordionDetails>
                    <p className="text-gray-600 mb-2">You can customize your burger by choosing add-ons or changing ingredients.</p>
                    <Button variant='contained' type='submit' disabled={false}>
                        {true ? "Add to Cart" : "Out of Stock"}
                    </Button>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default MenuCard;
