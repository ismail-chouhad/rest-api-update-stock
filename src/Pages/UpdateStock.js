import { Alert, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import axios from "axios";
import { Fragment, useState } from "react";
import SideBar from "../Components/SideBar/SideBar";

const UpdateStock = () => {
  const buttonStyle = {  marginTop: "10px" }
  const [token,setToken] = useState('');
  const [sku,setSKU] = useState('');
  const [action,setAction] = useState('');
  const [valeur,setValeur] = useState(null)
  const [updateStock,setUpdateStock] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const data = {
    token : `${token}`,
    sku : `${sku}`,
    action : `${action}`,
    valeur : parseInt(valeur)
  };

  const handleClick = () => {
    setIsLoading(true);
    // console.log( `${token} and ${sku}`);
    const config ={
      method : 'post',
      baseURL : 'http://localhost/my-website/wp-json/choc-api/v1',
      data : data
    }
    axios.request('/update-stock',config)
    .then(res => {
      setShowTable(true);
      setErrorAlert(false);
      // console.log(res.data);
      setUpdateStock(res.data);
    })
    .catch(err => {
      setShowTable(false)
      setErrorAlert(true)
      // console.log(err.response.data.message);
      setErrorMessage(err.response.data.message)
      setUpdateStock([]);
    })
    .finally(() => {
      setIsLoading(false);
    })
  };

  return (
    <div className="parent">
      <div className="child-1">
        <SideBar/>
      </div>
      <div className="child-2">
        {errorAlert ? <Alert severity="error">{errorMessage}</Alert> : <></> }
        <div className="child-2-1">
          <Fragment>
            <Grid container className='content-zone'>
              <Grid item xs={9} sm={9}>
                  <TextField
                  required
                  id="token"
                  name="token"
                  label="Token"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={token}
                  onChange={(e)=>setToken(e.target.value)}/>

                  <TextField
                  required
                  id="sku"
                  name="sku"
                  label="SKU"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={sku}
                  onChange={(e)=>setSKU(e.target.value)}/>
                  
                  <TextField
                  required
                  id="action"
                  name="action"
                  label="Action (+ or -)"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={action}
                  onChange={(e)=>setAction(e.target.value)}/>

                  <TextField
                  required
                  id="value"
                  name="value"
                  label="Value"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={valeur}
                  onChange={(e)=>setValeur(e.target.value)}/>

              </Grid>
              <Grid item xs={12} style={buttonStyle}>
                  <Button variant="contained" onClick={handleClick}>
                    {isLoading ? <h5>Loading ...</h5> : <h5>Update Stock</h5>}
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
                        <TableCell ><b>Stock status</b></TableCell>
                        <TableCell ><b>Stock quantity</b></TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                    updateStock.map(item => (
                    <TableRow key={item}>
                      <TableCell>
                          {item.stock_status}
                      </TableCell>
                      <TableCell>
                          {item.stock_quantity}
                      </TableCell>
                    </TableRow>
                    ))
                    }
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
export default UpdateStock;
