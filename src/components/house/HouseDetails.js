import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { TextField } from '@material-ui/core';
import {Button} from '@mui/material';
import { goToHome } from '../../services/routing.service';


async function allHouses(){
    return goToHome();
  }


function HouseDetails() {
    return(
        <Grid justifyContent="center" container spacing={2} >
        <Grid item xs={8} sx={{marginTop:"100px"}}>
         <center>
         <span style={{color: 'darkBlue'}}>
             <strong >HOUSE INFO</strong>
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
             defaultValue="ETH"
             style={{ margin: 8 }}
             fullWidth
             margin="normal"
             inputProps={{
                readOnly: true,
              }}
             variant="outlined" 
         />
         <TextField
           id="outlined-basic"
           label="Size"
           style={{ margin: 8 }}
           fullWidth
           defaultValue="m2"
           margin="normal"
           inputProps={{
            readOnly: true,
          }}
           variant="outlined" 
         />
 
         <TextField
           id="outlined-basic"
           label="Adress"
           style={{ margin: 8 }}
           fullWidth
           defaultValue=""
           margin="normal"
           inputProps={{
            readOnly: true,
          }}
           variant="outlined" 
         />
 
         <TextField
           id="outlined-basic"
           label="Description"
           multiline
           rows={3}
           style={{ margin: 8 }}
           fullWidth
           defaultValue=""
           margin="normal"
           inputProps={{
            readOnly: true,
          }}
           variant="outlined" 
         />
 
         <TextField
           id="outlined-basic"
           label="Documents"
           style={{ margin: 8 }}
           fullWidth
           defaultValue=""
           margin="normal"
           inputProps={{
            readOnly: true,
          }}
           variant="outlined" 
         />
 
         <TextField
           id="outlined-basic"
           label="Number of Rooms"
           style={{ margin: 8 }}
           fullWidth
           defaultValue=""
           margin="normal"
           inputProps={{
            readOnly: true,
          }}
           variant="outlined" 
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
     >
       <Button variant="contained" onClick={allHouses}>Go Back</Button>
     </Stack>
     </div>
 
 
               </Stack>
             </Card>
         </Grid>
       </Grid>
    ) ;
    }
    
    export default HouseDetails;