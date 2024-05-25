import { useNavigate, NavLink } from "react-router-dom";
import {useDispatch} from "react-redux"
import { logout } from '../features/user';
import axios from "axios";

function NavbarAccount(){
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const logoutUser = () => {
        localStorage.removeItem("token");
        axios.defaults.headers.common["Authorization"] = ``
        navigate('/login')
        window.location.reload();
        dispatch(logout())
    }
    return(
        <>
      <nav className=" text-sm  bg-opacity-50 w-100  px-8 md:px-auto my-6   ">
        <div className=" md:h-16 h-16 mx-auto md:px-4 container flex items-center justify-start md:justify-between  md:flex-nowrap">
        <div className="sm:order-1 ">
        </div>
        <div className=" font-medium text-center text-gray-500  border-gray-400  order-3 w-full sm:w-auto sm:order-2">
          <ul className="flex font-bold justify-between flex-wrap ">
          <li className="md:px-4 md:py-2 mx-12 ">
              <NavLink to="/account-info" className={({ isActive }) => (isActive ? " text-gray-800  border-gray-700 rounded-box inline-block p-2 border-b-4 " : " text-gray-500 rounded-box inline-block p-2    hover:text-gray-600 hover:border-gray-700 ")}>
                INFO
              </NavLink>
            </li> 
            <li className="md:px-4 md:py-2 mx-12   ">
              <NavLink to="/account-address" className={({ isActive }) => (isActive ? " text-gray-800  border-gray-700 rounded-box inline-block p-2 border-b-4" : " text-gray-500 rounded-box inline-block p-2    hover:text-gray-600 hover:border-gray-700 ")}>
                ADDRESSES
              </NavLink>
            </li>
            <li className="md:px-4 md:py-2 mx-12   ">
              <NavLink to="/all-orders" className={({ isActive }) => (isActive ? " text-gray-800  border-gray-700 rounded-box inline-block p-2 border-b-4" : " text-gray-500 rounded-box inline-block p-2    hover:text-gray-600 hover:border-gray-700 ")}>
                ORDERS
              </NavLink>
            </li>  
          </ul>
        </div>
        <div className="order-2 md:order-3">
          <button
            className="px-4 py-2 bg-gray-400 hover:bg-gray-600 text-gray-50 rounded-xl flex items-center gap-2"
            onClick={() => logoutUser()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
            <span className="font-mono text-base">Logout</span>
          </button>
          </div>
        </div>
      </nav>
    </>
    )
}

export default NavbarAccount;