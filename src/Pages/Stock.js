import {
  Alert,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Fragment, useState } from "react";
import { PropagateLoader } from "react-spinners";
import SideBar from "../Components/SideBar/SideBar";

const Stock = () => {
  const buttonStyle = { marginTop: "10px" };
  const [token, setToken] = useState("");
  const [sku, setSKU] = useState("");
  const [stock, setStock] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const data = {
    token: `${token}`,
    sku: `${sku}`,
  };

  const handleClick = () => {
    setIsLoading(true);
    // console.log( `${token} and ${sku}`);
    const config = {
      method: "post",
      baseURL: "http://localhost/my-website/wp-json/choc-api/v1",
      data: data,
    };
    axios
      .request("/get-stock", config)
      .then((res) => {
        setShowTable(true);
        setErrorAlert(false);
        // console.log(res.data);
        setStock(res.data);
      })
      .catch((err) => {
        setShowTable(false);
        setErrorAlert(true);
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setErrorMessage(err.response.data.message);
          // console.log(err.response.data.message);
        } else if (err.request) {
          // The request was made but no response was received
          setErrorMessage(
            "The server is currently unavailable. Please try again later."
          );
        } else {
          // Something happened in setting up the request that triggered an Error
          setErrorMessage(
            "An error occurred while processing your request. Please try again later."
          );
        }
        setStock([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="parent">
      <div className="child-1">
        <SideBar />
      </div>
      {isLoading && (
        <div className="isLoading">
          <PropagateLoader
            color={"#123abc"}
            loading={true}
            css={{ backgroundColor: "yellow", width: "30px", height: "30px" }}
          />
        </div>
      )}
      <div className="child-2">
        {errorAlert ? <Alert severity="error">{errorMessage}</Alert> : <></>}
        <div className="child-2-1">
          <Fragment>
            <Grid container className="content-zone">
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
                  onChange={(e) => setToken(e.target.value)}
                />

                <TextField
                  required
                  id="sku"
                  name="sku"
                  label="SKU"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={sku}
                  onChange={(e) => setSKU(e.target.value)}
                />
              </Grid>
              <Grid className="content-zone" item xs={12} style={buttonStyle}>
                <Button variant="contained" onClick={handleClick}>
                  {isLoading ? <h5>Loading ...</h5> : <h5>Get Stock</h5>}
                </Button>
              </Grid>
            </Grid>
          </Fragment>
        </div>
        <div className="child-2-2">
          <Fragment>
            <Grid container className="content-zone">
              {showTable && (
                <TableContainer component={Paper} className="table">
                  <Table sx={{ minWidth: 90 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <b>Stock status</b>
                        </TableCell>
                        <TableCell>
                          <b>Stock quantity</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stock.map((item) => (
                        <TableRow key={item}>
                          <TableCell>{item.stock_status}</TableCell>
                          <TableCell>{item.stock_quantity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Grid>
          </Fragment>
        </div>
      </div>
    </div>
  );
};
export default Stock;
