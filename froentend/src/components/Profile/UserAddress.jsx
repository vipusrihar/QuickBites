import { Card, CardContent } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const UserAddress = () => {
  const user = useSelector((store) => store.auth.user);

  return (
    <div>
      <h1 className="py-5 text-xl font-semibold text-center">Saved Address</h1>

      <div className="grid grid-cols-3 gap-4 justify-center p-10">
        {user?.addresses && user.addresses.length > 0 ? (
          user.addresses.map((addr, index) => (
            <Card key={index} className="w-[18rem] shadow-lg">
              <CardContent>
                <p className="text-xl font-medium text-gray-700">
                  {addr?.street || 'No Street'}, {addr?.city || 'No City'}, {addr?.zipCode || 'No Zip'}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 text-center">No saved addresses.</p>
        )}
      </div>
    </div>
  );
};

export default UserAddress;
