import { Modal, Box } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx'
const Auth = () => {
  const location = useLocation();  // Corrected typo
  const navigate = useNavigate();  // useNavigate if you need to navigate

  const showModal =
    location.pathname === '/account/register' || location.pathname === '/account/login';

  const handleOnClose = () => {
    navigate('/')
  }  



  return (
    <>
      <Modal open={showModal} onClose={handleOnClose}>
        <Box sx={{ width: 400, margin: 'auto', mt: '20vh', p: 4, bgcolor: 'background.paper' }}>
         {location.pathname === '/account/register' ?  <RegisterForm/> : <LoginForm/> }
        </Box>
      </Modal>
    </>
  );
};

export default Auth;
