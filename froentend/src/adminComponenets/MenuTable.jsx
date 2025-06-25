import {
  Avatar,
  Box, Card, CardHeader, IconButton, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material'
import React, { useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFoodAction, getMenuItemByRestaurantId } from '../state/Menu/Action'

const MenuTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, menu } = useSelector((store) => store);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMenuItemByRestaurantId({
      restaurantId : restaurant.usersRestaurant.id,
      jwt,
      // vegetarian : false,
      // seasonal: false,
      // nonveg:false
    }))
  }, [])

  const handleCreate = () => {
    navigate('addMenu');
  };

  const handleDeleteFood = (foodId) => {
    dispatch(deleteFoodAction({foodId,jwt}))
  }

  return (
    <div className='mt-2 pt-1'>
      <Box className="mt-1">
        <Card>
          <CardHeader
            title="All Menu"
            sx={{ pt: 2, alignItems: 'center' }}
            action={
              <IconButton aria-label='add-menu' onClick={handleCreate}>
                <AddIcon />
              </IconButton>
            }
          />
        </Card>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="menu table">
            <TableHead>
              <TableRow>
                <TableCell align='right'>ID</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align='right'>Price</TableCell>
                <TableCell align='right'>Description</TableCell>
                <TableCell align="right">Availability</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {menu.menuItems.map((item) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align='right'>{item.id}</TableCell>
                  <TableCell align="right"><Avatar src={item.images[0]}></Avatar></TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align="right">{item.status}</TableCell>
                  <TableCell align="right">change</TableCell>
                  <TableCell align='right'>
                    <div className="flex justify-end gap-2">
                      <IconButton size="small"><Edit /></IconButton>
                      <IconButton size="small" onClick={handleDeleteFood(item.id)}><Delete /></IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  )
};

export default MenuTable;
