import { Button, TextField, Typography } from '@mui/material'
import { Field, Formik, Form } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const intialValue = {
  eamil: "",
  password: ""
}

const LoginForm = () => {

  const navigate = useNavigate();

  const handleSubmit = () => {

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
