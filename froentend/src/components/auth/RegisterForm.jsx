import React from 'react'
import { Typography, Button, TextField, MenuItem, InputLabel, Select, Alert } from '@mui/material'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerUser } from '../state/Action'


const initialValue = {
  email: "",
  password: "",
  role: "",
  firstName: "",
  lastName: "",
  // repassword: ""
}

const RegisterForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    // const { password, repassword } = values;
    // if (password !== repassword) {
    //   console.log("Passwords Not Match");
    //   return;
    // }
    dispatch(registerUser({ userData: values, navigate }))
    console.log('Form values:', values);
  }



  return (
    <div>
      <Typography variant='h5' className='text-center'>
        Register Form
      </Typography>

      <Formik onSubmit={handleSubmit} initialValues={initialValue}>

        <Form>
          <Field
            as={TextField}
            name="firstName"
            label="FirstName"
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Field
            as={TextField}
            name="lastName"
            label="LastName"
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Field
            as={TextField}
            name="email"
            label="email"
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Field
            as={TextField}
            name="password"
            label="Password"
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
          />

          {/* <Field
            as={TextField}
            name="repassword"
            label="Re enter password"
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
          /> */}
          <Field name="role">
            {({ field }) => (
              <Select
                {...field}
                fullWidth
                displayEmpty
                variant="outlined"
                margin="normal"
              >
                <MenuItem value="" disabled>
                  Select a role
                </MenuItem>
                <MenuItem value="ROLE_CUSTOMER">Customer</MenuItem>
                <MenuItem value="ROLE_RESTAURANT">Restaurant Owner</MenuItem>
              </Select>
            )}
          </Field>

          <Button sx={{ mt: 2, padding: "1rem" }} type='submit' fullWidth variant='contained'>
            Register
          </Button>

          <Typography className='text-center pt-5'>
            Already Have An Account  <a onClick={() => { navigate('/account/login') }} className='text-blue-600'> Login Here</a>
          </Typography>
        </Form>


      </Formik>
    </div>
  )
}

export default RegisterForm
