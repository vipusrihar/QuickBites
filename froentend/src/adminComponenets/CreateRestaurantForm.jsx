import { useFormik } from 'formik';
import React, { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Button, CircularProgress, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import { uploadImageToCloudinary } from './utills/uploadToCloudinary';
import { useDispatch } from 'react-redux';
import { createRestaurant } from '../state/restaurant/Action'

const initialValues = {
  name: '',
  city: '',
  address: '',
  description: '',
  postalCode: '',
  image: [],
  mobile: '',
  twitter: '',
  instagram: '',
  facebook: '',
  openingHours: '',
  openingTime: '',
  closingTime: '',
};

const CreateRestaurantForm = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  function fixTimeFormat(timeStr) {
    // Handles "9:00 AM" or "09:00"
    const date = new Date(`1970-01-01T${timeStr}`);
    if (isNaN(date)) {
      // If the input is already in "HH:mm:ss" or invalid, return as-is
      return timeStr;
    }

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = "00";

    return `${hours}:${minutes}:${seconds}`;
  }


  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const data = {
        description: values.description,
        city: values.city,
        address: values.address,
        postalCode: values.postalCode,
        mobile: values.mobile,
        name: values.name,
        image: values.image,
        twitter: values.twitter,
        instagram: values.instagram,
        facebook: values.facebook,
        openingHours: fixTimeFormat(values.openingHours),
        openingTime: fixTimeFormat(values.openingTime),
        closingTime: values.closingTime
      };
      console.log('data----', data);

      dispatch(createRestaurant({ data, token: jwt }))
    },
  });

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploadImage(true);
    const image = await uploadImageToCloudinary(file);
    formik.setFieldValue('image', [...formik.values.image, image]);
    setUploadImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImage = [...formik.values.image];
    updatedImage.splice(index, 1);
    formik.setFieldValue('image', updatedImage);
  };

  return (
    <div className="py-10 px-5 lg:flex items-center justify-center min-h-screen">
      <div className="lg:max-w-4xl">
        <h1 className="font-bold text-2xl text-center py-2">Add New Restaurant Form</h1>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Grid container spacing={2}>
            <Grid className='flex flex-wrap gap-5' size={{ xs: 12, sm: 6 }}>

              <input
                accept='image/'
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
                type='file' />
              <label
                className='relative'
                htmlFor='fileInput'>
                <span
                  className='wa-24 h-25 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600' >
                  <AddPhotoAlternateIcon
                    className='text-white' />
                </span>
                {
                  uploadImage &&
                  <div
                    className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'>
                    <CircularProgress />
                  </div>
                }
              </label>
              <div className='flex flex-wrap gap-2'>
                {
                  formik.values.image.map((image, index) =>
                    <div className='relative'>
                      <img
                        className="w-24 h-24 object-cover" src={image} alt={`Uploaded ${index}`} />
                      <IconButton
                        size='small'
                        sx={
                          {
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            outline: 'none'
                          }
                        }

                        onClick={() => handleRemoveImage(index)}>
                        <CloseIcon sx={{ fontSize: '1rem' }} />
                      </IconButton>
                    </div>
                  )
                }

              </div>

            </Grid>

            <Grid size={{ xs: 12, sm: 12 }}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.name}

              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12 }}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.description}
                multiline rows={4} />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                id="address"
                name="address"
                label="Address"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.address}

              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                id="city"
                name="city"
                label="City"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.city}

              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                id="postalCode"
                name="postalCode"
                label="Postal Code"
                variant="outlined"
                onChange={formik.handleChange} value={formik.values.postalCode} />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                id="openingTime"
                name="openingTime"
                label="Opening Time"
                placeholder="9:00 AM "
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.openingTime}
                type="time"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                id="closingTime"
                name="closingTime"
                label="Closing Time"
                placeholder="10:00 PM"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.closingTime}
                type="time"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                id="mobile"
                name="mobile"
                label="Phone Number"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.mobile} />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                id="instagram"
                name="instagram"
                label="Instagram"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.instagram} />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                id="twitter"
                name="twitter"
                label="Twitter"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.twitter} />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                id="facebook"
                name="facebook"
                label="Facebook"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.facebook} />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth size="large">
                Create Restaurant
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default CreateRestaurantForm;
