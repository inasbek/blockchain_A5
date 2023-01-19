import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import {Card, CardContent, CardMedia, Typography, CardActions, Collapse, styled, IconButton, IconButtonProps} from '@mui/material';
import Web3 from 'web3';
import { goToAddHouse, goToNotifications } from '../../services/routing.service';
import addHouse from '../house/AddHouse';
import { useState } from 'react'
import { ethers } from 'ethers'
import RealEstate from '../../RealEstate.json'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
export function hex_to_ascii(str1)
{
    var hex  = str1.toString();
    var str = '';
    for (var n = 2; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


function Home() {
      const [web3Api, setWeb3Api] = React.useState({
        provider: null,
        contract: null,
        web3: null
    });  
    const [account, setAccount] = React.useState(null);
    const [posts, setPosts] = React.useState ([]);
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

const contractAddress = '0x9878da094dD1b7Cf19C4c5FaF5644a6ADD2CFe61';

async function requestAccount() {
    const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(account);
   
}
function checkMetamask(provider)  {
    if (provider.provider.selectedAddress) {
        localStorage.setItem('MetaMask', provider.provider.selectedAddress)
        
        return true
    }
    else {
        localStorage.setItem('MetaMask', null);
        return false
    }
}

  React.useEffect(() => {
    const loadProvider = async () => { 
        let provider = null;
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, RealEstate.abi, signer);
            //console.log(provider.provider.selectedAddress);
            checkMetamask(provider);
            setWeb3Api(
              {
                  web3: new Web3(provider),
                  provider,
                  contract : contract
              }
          );
      
            try {
              const data = await contract;
              const realEstates = await data.getAllRealEstates();
            
              setPosts(realEstates);
              //console.log('data', realEstates[0]);
        
            } catch (err) {
              console.log("Error: ", err)
            }
          }
          
    }
    
    loadProvider();
    
}, []);
    
React.useEffect(() => {
    const getAccount = async () => {
    const accounts = await web3Api.web3.eth.getAccounts()
    setAccount(accounts[0]);
}
web3Api.web3 && getAccount()
},[web3Api.web3]) ;

async function getPosts(){    
    try {
    const data = await web3Api.contract;
    const realEstates = await data.getAllRealEstates();   
    setPosts(realEstates);

  } catch (err) {
    console.log("Error: ", err)
  }

}


async function addHouseFunction(){
    return goToAddHouse();
}

async function buyRealEstate(id){
    await web3Api.contract.deployed();
    await web3Api.contract.buy(id, {from : web3Api.provider.provider.selectedAddress, value : posts[id].Price.toString()});
    window.location.href = '/myrealestates';
  }

return (
<div className="home">
    <div className="posts">
    <Box sx={{ flexGrow: 1, marginTop : '100px', marginLeft:"200px" }}>
        <br/>
        <div
         justify-content= "center"
         align-items= "center"
        >
        <Button variant="contained" sx={{ marginLeft:"400px" }}onClick={addHouseFunction}>Sell your House</Button>
       
        </div>

      <Grid container spacing={2} sx={{ marginTop : '20px'}}>
      {
         posts && posts.map((post, index) => (
             post.owner.toLowerCase()==web3Api.provider.provider.selectedAddress.toLowerCase() ? null : <Grid  xs={3} sx={{ marginLeft:"40px", marginTop:"20px" }}>
            <Card>
                <CardMedia
                component="img"
                height="140"
                image={require("../../images/house1.jpg")}
                alt="House"
            />
            <CardContent>
            <Typography gutterBottom variant="h8" component="div">
            {parseInt((post.Price))} ETH  ¤  {parseInt((post.Size))} m² 
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {hex_to_ascii(post.Address)}
            </Typography>
            <Button onClick={buyRealEstate(index)}> Buy </Button>
            <CardActions disableSpacing>
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <div>
                                <Typography variant="body2" color="text.secondary">
                                    Description : {hex_to_ascii(post.Description)}
                                </Typography>
                                <br/>
                                <Typography variant="body2" color="text.secondary">
                                    Documents : {hex_to_ascii(post.Documents)}
                                </Typography>
                                </div>
                            </CardContent>
                        </Collapse>


          </CardContent>
          </Card>
            </Grid>
        
                        )
                    )
      }

      </Grid>
    </Box>
    </div>
</div>
);
}

export default Home;