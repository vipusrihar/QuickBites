import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { Divider, Drawer } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {logout} from '../../state/authentication/Action'

const menu = [
    { title: "Orders", icon: <ShoppingBagIcon /> },
    { title: "Favorites", icon: <FavoriteBorderIcon /> },
    { title: "Address", icon: <AddReactionIcon /> },
    { title: "Notification", icon: <NotificationsIcon /> },
    { title: "Payment", icon: <AccountBalanceWalletIcon /> },
    { title: "Logout", icon: <LogoutIcon /> }
]

const ProfileNavigation = ({ open, handleClose }) => {
    const isSmallScreen = useMediaQuery("(max-width:900px)")
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleNavigate = (item) => {
        
        navigate(`/myprofile/${item.title.toLowerCase()}`);
        if (isSmallScreen) handleClose();
        if( item.title.toLowerCase() === "logout" ){
            dispatch(logout());
            navigate("/")
        }
      };
      

    return (
        <div>
            <Drawer
                variant={isSmallScreen ? "temporary" : "permanent"}
                onClose={handleClose}
                sx={{
                    zIndex: 1, '& .MuiDrawer-paper': {
                        width: isSmallScreen ? '50vw' : '20vw',
                    },
                }}
                anchor='left'
                open={isSmallScreen ? open : true} >
                <div className='items-left h-[90vh] flex flex-col justify-center text-xl gap-6 mt-16'>

                    {menu.map((item, i) => (
                        <React.Fragment key={i}>
                            <div onClick={() => handleNavigate(item)} className='px-5 flex items-center space-x-5 cursor-pointer'>
                                {item.icon}
                                <span>{item.title}</span>
                            </div>
                            {i !== menu.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}


                </div>
            </Drawer>
        </div>
    )
}

export default ProfileNavigation
