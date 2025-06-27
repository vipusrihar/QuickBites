import React, { useEffect } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFoodAction, getMenuItemByRestaurantId } from '../state/Menu/Action';

const MenuTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jwt = localStorage.getItem("jwt");
  const restaurant = useSelector((store) => store.restaurant);
  const menu = useSelector((store) => store.menu);

  const isLoading = menu.loading; // Optional: depends on your state structure

  useEffect(() => {
    if (restaurant?.usersRestaurant?.id) {
      dispatch(getMenuItemByRestaurantId({
        restaurantId: restaurant.usersRestaurant.id,
        jwt,
      }));
    }
  }, [restaurant, jwt, dispatch]);

  const handleCreate = () => {
    navigate('addMenu');
  };

  const handleDeleteFood = (foodId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      dispatch(deleteFoodAction({ foodId, jwt }));
    }
  };

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
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Change</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <CircularProgress size={24} />
                  </TableCell>
                </TableRow>
              ) : menu.menuItems?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No food items found.
                  </TableCell>
                </TableRow>
              ) : (
                menu.menuItems.map((item) => (
                  <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align='right'>{item.id}</TableCell>
                    <TableCell align="right">
                      <Avatar
                        src={item?.imagePath || ''}
                        alt={item.name}
                        sx={{ width: 40, height: 40, margin: 'auto' }}
                      />
                    </TableCell>
                    <TableCell align="right">{item.name}</TableCell>
                    <TableCell align="right">{item.price}</TableCell>
                    <TableCell align="right">{item.status}</TableCell>
                    <TableCell align="right">change</TableCell>
                    <TableCell align='right'>
                      <div className="flex justify-end gap-2">
                        <IconButton size="small">
                          <Edit />
                        </IconButton>
                        <IconButton size="small" onClick={() => handleDeleteFood(item.id)}>
                          <Delete />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default MenuTable;
