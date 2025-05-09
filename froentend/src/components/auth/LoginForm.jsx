import { Button, TextField, Typography } from '@mui/material'
import { Field, Formik, Form } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../state/Action'

const intialValue = {
  email: "",
  password: ""
}

const LoginForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(loginUser({userData:values,navigate}))


  }

  return (
    <div>
      <Typography variant='h5' className='text-center'>
        Login
      </Typography>

      <Formik onSubmit={handleSubmit} initialValues={intialValue}>

        <Form>
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
            label="password"
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
          />

          <Button sx={{mt:2, padding:"1rem"}} type='submit' fullWidth variant='contained'>
            Login
          </Button>

          <Typography className='text-center pt-5'>
          Don't Have An Account <a onClick={() => {navigate('/account/register')}} className='text-blue-600'>Register</a>
        </Typography>
        </Form>
        

      </Formik>
    </div>
  )
}

export default LoginForm
