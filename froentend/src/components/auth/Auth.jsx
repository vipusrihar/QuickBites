import { Modal, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const showModal =
    location.pathname === '/register' ||
    location.pathname === '/login';

  const handleOnClose = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <Modal open={showModal} onClose={handleOnClose}>
      <Box
        sx={{
          width: { xs: '90%', sm: 400 },
          maxHeight: '90vh',
          overflowY: 'auto',
          margin: 'auto',
          mt: '5vh',
          p: 4,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
        }}
      >

        {location.pathname === '/register' ? (
          <RegisterForm />
        ) : (
          <LoginForm />
        )}
      </Box>
    </Modal>
  );
};

export default Auth;
