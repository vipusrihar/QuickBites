import { Box, Card, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Delete, Edit } from '@mui/icons-material';
import CreateCategoryForm from './CreateCategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantsCategory } from '../state/restaurant/Action';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const FoodCategoryTable = () => {
    const { restaurant } = useSelector((store) => store);
    const dispatch = useDispatch();

    const jwt = localStorage.getItem("jwt");

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        dispatch(getRestaurantsCategory({ jwt, restaurantId: restaurant.usersRestaurant?.id }));
    }, [])

    console.log("Restaurant Details : ", restaurant)
    return (
        <div className='mt-2 pt-1'>
            <Box className="mt-1">
                <Card>
                    <CardHeader title={"FoodCategory"} sx={{ pt: 2, alignItems: 'center' }}
                        action={
                            <IconButton aria-label='settings' onClick={handleOpen}> <AddIcon /></IconButton>
                        } />
                </Card>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <CreateCategoryForm />
                    </Box>
                </Modal>




                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='left'>ID</TableCell>
                                <TableCell align="left">Image</TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {/* restaurant.categories */}
                            {[1,1,1].map((item) => (
                                <TableRow
                                    key={item.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {"1"}
                                    </TableCell>
                                    <TableCell align="left">{item.name}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    )
}

export default FoodCategoryTable
