import { useFormik } from 'formik';
import React, { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Button, CircularProgress, FormControl, IconButton, InputLabel, Menu, MenuItem, Select, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import { uploadImageToCloudinary } from './utills/uploadToCloudinary';
import { useDispatch, useSelector } from 'react-redux';
import {createMenuItem} from '../state/Menu/Action';


const initialValues = {
  name: '',
  description: '',
  image: [],
  price: '',
  restautrantId: '',
  foodType: '',
  category: ''

};

const CreateMenuForm = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {restautrant} = useSelector((store) => store);
  const [uploadImage, setUploadImage] = useState(false);

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const data = {
        name: values.name,
        description: values.description,
        image: values.image,
        price: values.price,
        restautrantId: 2,
        category: values.category,
        foodType: values.foodType,
      };

      dispatch(createMenuItem({menu:values,jwt}))

      console.log('data----', data);
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
        <h1 className="font-bold text-2xl text-center py-2">Add New Menu Form</h1>

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
                  className='w-24 h-25 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600' >
                  <AddPhotoAlternateIcon />
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
                id="price"
                name="price"
                label="Price"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.price}

              />
            </Grid>

            <Grid size={{ xs: 12, sm: 3 }}>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-category-native-simple">Category</InputLabel>
                <Select
                  fullWidth
                  native
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  inputProps={{
                    id: 'outlined-category-native-simple',
                  }}
                >
                {restautrant.category.map((item) => <MenuItem value={item.name}>{item.name}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 3 }}>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-category-native-simple">Food Type</InputLabel>
                <Select
                  native
                  fullWidth
                  name="foodType"
                  value={formik.values.foodType}
                  onChange={formik.handleChange}
                  inputProps={{
                    id: 'outlined-foodtype-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value="VEG">VEG</option>
                  <option value="NONVEG">NONVEG</option>
                  <option value="DRINK">DRINK</option>
                  <option value="SNACKS">SNACKS</option>
                </Select>

              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth size="large">
                Create Menu
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default CreateMenuForm;
