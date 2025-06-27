import { Box, Button, Card, CardHeader, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { fetchRestaurantOrders, updateOrderStatus } from '../state/restaurantOrder/Action';

const orderStatus = [
    { label: "Pending", value: "PENDING" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Out For Deleivery", value: "OUT_FOR_DELIVERY" },
    { label: "Delivered", value: "DELIVERED" }
]

const OrderTable = () => {

    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const restaurant = useSelector((store) => store.restaurant);
    const restaurantOrders = useSelector((store) => store.restaurantOrders);

    useEffect(() => {
        dispatch(fetchRestaurantOrders({ jwt, restaurantId: restaurant.usersRestaurant?.id }))

    }, []);



    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState(null);


    const handleClick = (event, orderId) => {
        setAnchorEl(event.currentTarget);
        setSelectedOrderId(orderId);
    };

    const handleUpdateOrder = (orderId, orderStatus, jwt) => {
        dispatch(updateOrderStatus({ orderId, orderStatus, jwt }));
        handleClose();
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedOrderId(null);
    };



    return (
        <div className='px-2'>

            <Box className="mt-1">
                <Card>
                    <CardHeader title={"All Orders"} sx={{ pt: 2, alignItems: 'center' }} />
                </Card>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='right'>ID</TableCell>
                                <TableCell align="right">Customer</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align='right'>Price</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Update</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {restaurantOrders?.order?.map((item) => (
                                <TableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {item.id}
                                    </TableCell>
                                    <TableCell align="right">{item.customer?.firstName}</TableCell>
                                    <TableCell align="right">
                                        {item.items.map((orderItem, index) => (
                                            <p key={index}>{orderItem.food?.name}</p>
                                        ))}

                                    </TableCell>
                                    <TableCell align="right">{item.total}</TableCell>
                                    <TableCell align="right">{item.orderStatus}</TableCell>
                                    <TableCell align="right">
                                        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={(e) => handleClick(e, item.id)}>
                                            Update
                                        </Button>

                                        {selectedOrderId === item.id && (
                                            <Menu
                                                id="simple-menu"
                                                anchorEl={anchorEl}
                                                keepMounted
                                                open={Boolean(anchorEl)}
                                                onClose={handleClose}
                                            >
                                                {orderStatus.map((status) => (
                                                    <MenuItem key={status.value} onClick={() => handleUpdateOrder(item.id, status.value, jwt)}>
                                                        {status.label}
                                                    </MenuItem>
                                                ))}
                                            </Menu>
                                        )}

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

        </div>
    )
}

export default OrderTable
