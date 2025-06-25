import { Button, TextField, Typography, Link } from '@mui/material';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../state/authentication/Action';
import * as Yup from 'yup';

const initialValues = {
  email: "",
  password: ""
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(4, 'Minimum 6 characters').required('Required'),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(loginUser({ userData: values, navigate }));
     console.log('Form values:', values);
  };

  return (
    <div>
      <Typography variant='h5' className='text-center'>Login</Typography>

      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              as={TextField}
              name="email"
              label="Email"
              fullWidth
              variant="outlined"
              margin="normal"
              helperText={<ErrorMessage name="email" />}
              error={touched.email && Boolean(errors.email)}
            />
            <Field
              as={TextField}
              name="password"
              label="Password"
              fullWidth
              variant="outlined"
              margin="normal"
              type="password"
              helperText={<ErrorMessage name="password" />}
              error={touched.password && Boolean(errors.password)}
            />

            <Button sx={{ mt: 2, padding: "1rem" }} type='submit' fullWidth variant='contained'>
              Login
            </Button>

            <Typography className='text-center pt-5'>
              Don't Have An Account?{' '}
              <Link component="button" onClick={() => navigate('/register')} underline="hover">
                Register
              </Link>
            </Typography>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
