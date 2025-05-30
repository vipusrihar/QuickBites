import { Modal, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const showModal =
    location.pathname === '/account/register' ||
    location.pathname === '/account/login';

  const handleOnClose = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <Modal open={showModal} onClose={handleOnClose}>
      <Box
        sx={{
          width: { xs: '90%', sm: 400 },
          margin: 'auto',
          mt: '20vh',
          p: 4,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        {location.pathname === '/account/register' ? (
          <RegisterForm />
        ) : (
          <LoginForm />
        )}
      </Box>
    </Modal>
  );
};

export default Auth;
