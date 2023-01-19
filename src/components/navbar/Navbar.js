import './Navbar.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import { goToHome, goToMyRealEstates } from '../../services/routing.service';
import { Button } from '@mui/material';


async function goHome(){
    return goToHome();
}

export function Navbar() {
    return (

        <div className="background">
            <AppBar sx={{backgroundColor: "#0041a0"}}>
            <Toolbar disableGutters>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{mr: 2, display: {xs: 'none', md: 'flex'}, marginRight: 10}}
                >
                    <img className={"img"} src={require('../../logo.png')} height="15" width="15" alt="logo" onClick={goHome}/>
                </Typography>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{mr: 2, display: {xs: 'none', md: 'flex'}, marginRight: 10}}
                >
                    <Button onClick={goHome}>ALLRealEstates</Button>
                    <Button onClick={goToMyRealEstates}>MyRealEstates</Button>
                </Typography>

                <Box className="nav-menu" sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                <span> Account : {localStorage.getItem('MetaMask')==null ?  <Button onClick={async () => {
              const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
              console.log(accounts)
            }}>Connect Wallet</Button> : localStorage.getItem('MetaMask')}</span>

   
                    
                </Box>
  
            </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;