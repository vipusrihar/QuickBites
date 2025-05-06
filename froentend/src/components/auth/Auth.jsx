import { Modal } from '@mui/material'
import React from 'react'
import { useLocation, useNavigation } from 'react-router-dom'

const Auth = () => {
    const loaction = useLocation();
    const navogation =useNavigation();
  return (
    <>
     {/* <Modal open={loaction.pathname === '/account/register'  || location.pathname === '/account/login'}>

    <Box>

    </Box>

     </Modal> */}
    </>
  )
}

export default Auth
