import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { ExpandMore } from '@mui/icons-material';
import Button from '@mui/material/Button';

const MenuCard = ({ item: menuItem }) => {
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
                src={menuItem.imageUrl || 'https://via.placeholder.com/150'}
                alt={menuItem.name}
              />
              <div className='space-y-1 lg:space-y-5 lg:max-w-2xl'>
                <p className='font-semibold text-xl'>{menuItem.name}</p>
                <p>Rs.{menuItem.price}</p>
                <p className='text-gray-400'>{menuItem.description}</p>
                <p>{menuItem.foodType}| {menuItem.category} </p>
              </div>
            </div>
          </div>
        </AccordionSummary>

        <AccordionDetails>
          <p className="text-gray-600 mb-2">
            {menuItem.instructions || 'You can customize your order by choosing add-ons or changing ingredients.'}
          </p>
          <Button variant='contained' disabled={!menuItem.inStock}>
            {menuItem.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MenuCard;
