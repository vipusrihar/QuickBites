import { Divider, Card, Button, Modal, Box, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import CartItem from './CartItem.jsx';
import AddressCard from './AddressCard.jsx';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';

const cartitems = [1, 1, 1];

const Cart = () => {
  const createOrderUsingSelectedAddress = (item) => {
    console.log("Selected address:", item);
    // handle order placement here
  };

  const [open, setOpen] = useState(false);

  const handleAddAddress = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initialValues = {
    streetAddress: "",
    city: "",
    district: "",


  }
  const validationSchema = Yup.object().shape({

    streetAddress: Yup.string().required("Street Address is required"),
    city: Yup.string().required("City name is requrired"),
    district: Yup.string().required("District is required")
  })

  const handleSubmit = (values) => {
    console.log('Submitted values:', values);
    handleClose(); // close modal after submission
  }

  return (
    <>
      <main className='lg:flex justify-between'>

        {/* Cart Section */}
        <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
          <div>
            {cartitems.map((item, index) => (
              <CartItem key={index} />
            ))}
          </div>
          <Divider />
          <div className='billDetails px-5 text-sm'>
            <p className='font-extralight py-5'>Bill Details</p>
            <div className='space-y-3'>
              <div className='flex justify-between text-gray-400'>
                <p>Items Total</p>
                <p>Rs 3434</p>
              </div>
              <div className='flex justify-between text-gray-400'>
                <p>Delivery Fees</p>
                <p>Rs 344</p>
              </div>
              <div className='flex justify-between text-gray-400'>
                <p>QuickBites Fees</p>
                <p>Rs 4</p>
              </div>
              <Divider />
              <div className='flex justify-between text-gray-400'>
                <p>Total Charge</p>
                <p>Rs 4223</p>
              </div>
            </div>
          </div>
        </section>

        <Divider orientation='vertical' flexItem />

        {/* Address Section */}
        <section className='lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
          <div>
            <h1 className='text-center font-semibold text-2xl py-10'>Choose Delivery Address</h1>
            <div className='flex gap-5 flex-wrap justify-center'>
              {[1, 2, 3].map((item, index) => (
                <AddressCard
                  key={index}
                  item={item}
                  showButton={true}
                  handleSelectAddress={createOrderUsingSelectedAddress}
                />
              ))}

              {/* Add New Address Card */}
              <Card className='flex gap-5 w-60 p-5 items-start bg-gray-800'>
                <AddLocationIcon className='mt-1' />
                <div className='space-y-3 text-gray-300'>
                  <h1 className='font-semibold text-lg'>
                    Add a new Address
                  </h1>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={handleAddAddress}
                  >
                    Add Address
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="streetAddress"
                      label="Street Address"
                      fullWidth
                      variant="outlined"
                      error={touched.streetAddress && Boolean(errors.streetAddress)}
                      helperText={<ErrorMessage name="streetAddress" />}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="city"
                      label="City"
                      fullWidth
                      variant="outlined"
                      error={touched.city && Boolean(errors.city)}
                      helperText={<ErrorMessage name="city" />}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="district"
                      label="District"
                      fullWidth
                      variant="outlined"
                      error={touched.district && Boolean(errors.district)}
                      helperText={<ErrorMessage name="district" />}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                      Save Address
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>

    </>
  );
};

export default Cart;
