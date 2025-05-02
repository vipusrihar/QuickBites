import { Divider } from '@mui/material'
import React from 'react'
import CartItem from './CartItem'

const cartitems = [1,1,1]
const Cart = () => {
  return (
    <div>
      <main className='lg:flex justify-between'>

        <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>

           
          <div>
            {cartitems.map((item, index) => (
              <CartItem key={index} />
            ))}


          </div>
          <Divider/>
          <div className='billDetails px-5 text-sm'>
          <p className='font-extralight py-5'>
          BillDetails
          </p>
          <div className='space-y-3'>
          <div className='flex justify-between text-gray-400'>
          <p>Items Total</p>
          <p>Rs 3434</p>

          </div>
          <div className='flex justify-between text-gray-400'>
          <p>Deleivery Fees</p>
          <p>Rs 344</p>

          </div>
          <div className='flex justify-between text-gray-400'>
          <p>QuickBites Fees</p>
          <p>Rs 4</p>

          </div>

          <Divider/>

          <div className='flex justify-between text-gray-400'>
            <p>Total Charge</p>
            <p>Rs4223</p>
          </div>
          </div>

          </div>
        </section>

        <Divider orientation='vertical' flexItem/>
        
        {/* <section className='lg:w-[70%] flex justify-center [x-5 pb-10 lg:pb-0'>

      
        </section> */}
      </main>
    </div>
  )
}

export default Cart
