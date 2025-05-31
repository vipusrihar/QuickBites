import { Typography, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { registerUser } from '../../state/authentication/Action';

const initialValues = {
  email: "",
  password: "",
  repassword: "",
  role: "",
  firstName: "",
  lastName: ""
};

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  repassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm your password'),
  role: Yup.string().required('Role is required')
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const { repassword, ...userData } = values;
    dispatch(registerUser({ userData, navigate }));
    console.log('Form values:', userData);
  };

  return (
    <div>
      <Typography variant='h5' align='center'>
        Register Form
      </Typography>

      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              as={TextField}
              name="firstName"
              label="First Name"
              fullWidth
              variant="outlined"
              margin="normal"
              helperText={<ErrorMessage name="firstName" />}
              error={touched.firstName && Boolean(errors.firstName)}
            />
            <Field
              as={TextField}
              name="lastName"
              label="Last Name"
              fullWidth
              variant="outlined"
              margin="normal"
              helperText={<ErrorMessage name="lastName" />}
              error={touched.lastName && Boolean(errors.lastName)}
            />
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
              type="password"
              fullWidth
              variant="outlined"
              margin="normal"
              helperText={<ErrorMessage name="password" />}
              error={touched.password && Boolean(errors.password)}
            />
            <Field
              as={TextField}
              name="repassword"
              label="Confirm Password"
              type="password"
              fullWidth
              variant="outlined"
              margin="normal"
              helperText={<ErrorMessage name="repassword" />}
              error={touched.repassword && Boolean(errors.repassword)}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Field
                name="role"
                as={Select}
                label="Role"
                displayEmpty
                error={touched.role && Boolean(errors.role)}
              >
                <MenuItem value="" disabled>Select a role</MenuItem>
                <MenuItem value="USER">Customer</MenuItem>
                <MenuItem value="RESTAURANT">Restaurant Owner</MenuItem>
              </Field>
              <Typography variant="caption" color="error">
                <ErrorMessage name="role" />
              </Typography>
            </FormControl>

            <Button sx={{ mt: 2, padding: "1rem" }} type='submit' fullWidth variant='contained'>
              Register
            </Button>

            <Typography align="center" sx={{ pt: 3 }}>
              Already have an account?{' '}
              <span
                onClick={() => navigate('/login')}
                style={{ color: '#1976d2', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Login here
              </span>
            </Typography>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
