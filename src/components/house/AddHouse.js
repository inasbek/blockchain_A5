import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { TextField } from '@material-ui/core';
import {Button} from '@mui/material';
import { goToHome } from '../../services/routing.service';
import { ethers } from 'ethers'
import RealEstate from '../../RealEstate.json'
import { useState } from 'react'
import Web3 from 'web3';


function AddHouse() {
  const [web3Api, setWeb3Api] = React.useState({
    provider: null,
    contract: null,
    web3: null
});  
  const [account, setAccount] = React.useState(null);
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [documents, setDocuments] = useState("");
  const [nbRooms, setNbRooms] = useState("");


  const contractAddress = '0x9878da094dD1b7Cf19C4c5FaF5644a6ADD2CFe61';

  async function allHouses(){
    return goToHome();
  }
  
  async function addHouse(){
    await web3Api.contract.deployed();
    await web3Api.contract.post(price,size,Web3.utils.fromAscii(address), Web3.utils.fromAscii(description),
    Web3.utils.fromAscii(documents), nbRooms, {from: web3Api.provider.provider.selectedAddress});
    return goToHome();
  }
async function requestAccount() {
    const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(account);
}


  
 React.useEffect(() => {
    const loadProvider = async () => { 
        let provider = null;
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, RealEstate.abi, signer);
      
            setWeb3Api(
              {
                  web3: new Web3(provider),
                  provider,
                  contract : contract
              }
          );
      
          
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
},[web3Api.web3])

    return (
      <Grid justifyContent="center" container spacing={2} >
       <Grid item xs={8} sx={{marginTop:"100px"}}>
        <center>
        <span style={{color: 'darkBlue'}}>
            <strong >SELL YOUR HOUSE</strong>
        </span>
        </center>

          <Card >
              <Stack
                component="form"
                spacing={2}
                autoComplete="off"
                padding={2}
              >
          <TextField
            id="outlined-basic"
            label="Price"
            type="number"
            style={{ margin: 8 }}
            placeholder="ETH"
            fullWidth
            margin="normal"
            value={price}
            InputLabelProps={{
              shrink: true,
              required: true,
            }}
            variant="outlined" 
            onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Size"
          type="number"
          placeholder='m2'
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined" 
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="Address"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
            required: true,
          }}
          variant="outlined" 
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="Description"
          multiline
          rows={3}
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="Documents"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined" 
          value={documents}
          onChange={(e) => setDocuments(e.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="Number of Rooms"
          type="number"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined" 
          value={nbRooms}
          onChange={(e) => setNbRooms(e.target.value)}
        />

    <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
    <Stack 
        justify-content= "center"
        align-items= "center"
    spacing={2} direction="row">
      <Button variant="contained" onClick={addHouse}>Sell</Button>
      <Button variant="contained" onClick={allHouses}>Cancel</Button>
    </Stack>
    </div>


              </Stack>
            </Card>
        </Grid>
      </Grid>
    );
    }
    
    export default AddHouse;