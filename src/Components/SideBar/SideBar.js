import { NavLink } from 'react-router-dom';
import './SideBar.css';
import {AiOutlineUser} from 'react-icons/ai';
import {MdProductionQuantityLimits} from 'react-icons/md';
import {FiEdit} from 'react-icons/fi';

function SideBar() {
  return (
    <div className="sideBar">
      <div className='top'>
        <NavLink to='/' className='logo'>WC Stock Updater</NavLink>
      </div>
      <div className='links'>
        <ul>
          <li>
            <NavLink 
              to='/authenticate'
              className={({ isActive }) => (isActive ? "link-active" : "link")}>
              <AiOutlineUser className='icon'/> Authenticate
            </NavLink>
          </li>          
          <li>
            <NavLink 
            to='/get-stock'
            className={({ isActive }) => (isActive ? "link-active" : "link")}>
              <MdProductionQuantityLimits className='icon'/> Product Stock 
            </NavLink>
          </li>          
          <li>
            <NavLink 
            to='/update-stock'
            className={({ isActive }) => (isActive ? "link-active" : "link")}>
              <FiEdit className='icon'/> Update Stock
            </NavLink>
          </li>          
        </ul>
      </div>
      <div className='buttom'>
        <a className='ismail-chouhad' href="https://www.linkedin.com/in/ismail-chouhad/" target="_SEJ" rel="noreferrer">
          Powered by <strong>Ismail CHOUHAD</strong></a>
      </div>
    </div>
  )
}
export default SideBar;