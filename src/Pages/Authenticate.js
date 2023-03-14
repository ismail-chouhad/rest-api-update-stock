import { Alert, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import axios from "axios";
import { Fragment, useState } from "react";
import SideBar from "../Components/SideBar/SideBar";

const Authenticate = () => {
  const buttonStyle = {  marginTop: "10px" }
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [token,setToken] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isLoading,setIsLoading] = useState(false);

  const data = {
    email : `${email}`,
    password : `${password}`
  };

  const handleClick = () => {
    setIsLoading(true);
    // console.log( `${email} and ${password}`);
    const config ={
      method : 'post',
      baseURL : 'http://localhost/my-website/wp-json/choc-api/v1',
      data : data
    }
    axios.request('/authenticate',config)
    .then(res => {
      setShowTable(true);
      setErrorAlert(false);
      // console.log(res.data.token);
      setToken(res.data.token);
    })
    .catch(err => {
      setShowTable(false)
      setErrorAlert(true)
      // console.log(err.response.data.message);
      setErrorMessage(err.response.data.message)
      setToken([]);
    })
    .finally(() => {
      setIsLoading(false)
    });
  };

  return (
    <div className="parent">
      <div className="child-1">
        <SideBar/>
      </div>
      {
        isLoading
      }
      <div className="child-2">
        {errorAlert ? <Alert severity="error">{errorMessage}</Alert> : <></> }
        <div className="child-2-1">
          <Fragment>
            <Grid container className='content-zone'>
              <Grid item xs={9} sm={9}>
                  <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}/>

                  <TextField
                  required
                  id="password"
                  name="password"
                  label="Password"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}/>
              </Grid>
              <Grid item xs={12} style={buttonStyle}>
                  <Button variant="contained" onClick={handleClick}>
                    {isLoading ? <h5>Loading ...</h5> : <h5>Generate</h5>}
                  </Button>
              </Grid>
            </Grid>
          </Fragment>
        </div>
        <div className="child-2-2">
          <Fragment>
            <Grid container className='content-zone'>
              {showTable && (
              <TableContainer component={Paper} className='table'>
                <Table sx={{ minWidth: 90 }} aria-label="simple table">
                  <TableHead>
                      <TableRow>
                          <TableCell ><b>Token</b></TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                          {token}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              )}
            </Grid>
          </Fragment>
        </div>
      </div>
    </div>
  )
}
export default Authenticate;