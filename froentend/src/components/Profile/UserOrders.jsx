import React, { useEffect } from 'react';
import OrderCard from './OrderCard';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersOrders } from '../../state/order/Action';

const UserOrders = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const { orders } = useSelector((store) => store.order);

  useEffect(() => {
    if (jwt) {
      dispatch(getUsersOrders(jwt));
    }
  }, [dispatch, jwt]);

  return (
    <div className='flex items-center flex-col'>
      <h1 className='text-xl text-center py-7 font-semibold'>My Orders</h1>
      <div className='space-y-5 w-full lg:w-1/2'>
          {orders && orders.length > 0 ? (
          orders.map((item, index) => (
            <OrderCard key={index} order={item} />
          ))
        ) : (
          <p className='text-center text-gray-600'>There are no orders.</p>
        )}
      </div>
    </div>
  );
};

export default UserOrders;
