import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Authenticate from "./Pages/Authenticate";
import Stock from "./Pages/Stock";
import UpdateStock from "./Pages/UpdateStock";
import SideBar from "./Components/SideBar/SideBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<SideBar/>}/>
            <Route path="/authenticate" element={<Authenticate/>} />
            <Route path="/get-stock" element={<Stock/>} />
            <Route path="/update-stock" element={<UpdateStock/>} />    
            <Route path="*" element={<div><h1>404 not found</h1><h3><Link to="/">go back to home</Link></h3></div>}/>        
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
