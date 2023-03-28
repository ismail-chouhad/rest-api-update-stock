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
import SideBar from "../Components/SideBar/SideBar";
import { ScaleLoader } from "react-spinners";
import { MdContentCopy } from "react-icons/md";
import CopyToClipboard from "react-copy-to-clipboard";

const Authenticate = () => {
  const buttonStyle = { marginTop: "10px" };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const data = {
    email: `${email}`,
    password: `${password}`,
  };

  const handleClick = () => {
    setIsLoading(true);
    // console.log( `${email} and ${password}`);
    const config = {
      method: "post",
      baseURL: "http://localhost/my-website/wp-json/choc-api/v1",
      data: data,
    };
    axios
      .request("/authenticate", config)
      .then((res) => {
        setShowTable(true);
        setErrorAlert(false);
        // console.log(res.data.token);
        setToken(res.data.token);
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
        setToken([]);
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
          <ScaleLoader
            color={"#123abc"}
            loading={true}
            css={{ backgroundColor: "yellow", width: "30px", height: "30px" }}
          />
        </div>
      )}
      <div className="child-2">
        {errorAlert && <Alert severity="error">{errorMessage}</Alert>}
        <div className="child-2-1">
          <Fragment>
            <Grid container className="content-zone">
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
                  onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                  required
                  id="password"
                  name="password"
                  label="Password"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid className="content-zone" item xs={12} style={buttonStyle}>
                <Button variant="contained" onClick={handleClick}>
                  {isLoading ? <h5>Loading ...</h5> : <h5>Generate</h5>}
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
                          <b>
                            Token <small>(10 hours to expired)</small>
                          </b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <CopyToClipboard text={token}>
                            <small>{token}</small>
                          </CopyToClipboard>
                          <CopyToClipboard text={token}>
                            <MdContentCopy
                              size={20}
                              className="copy-to-clipboard"
                            />
                          </CopyToClipboard>
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
  );
};
export default Authenticate;
