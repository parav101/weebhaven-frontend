import {  NavLink } from "react-router-dom";


function NavbarAccount(){

   
    return(
        <>
      <nav className=" text-sm  bg-opacity-50 w-100  px-8 md:px-auto my-6   ">
        <div className=" md:h-16 h-16 mx-auto md:px-4 container flex items-center justify-center md:justify-between  md:flex-nowrap">
       
        <div className=" font-medium text-center text-gray-500  border-gray-400 mx-auto  w-full sm:w-auto ">
          <ul className="flex font-bold justify-between flex-wrap ">
          <li className="md:px-4 px-0 py-0 mx-0 md:py-2 md:mx-12 ">
              <NavLink to="/account-info" className={({ isActive }) => (isActive ? " text-gray-800  border-gray-700 rounded-box inline-block p-2 border-b-4 " : " text-gray-500 rounded-box inline-block p-2    hover:text-gray-600 hover:border-gray-700 ")}>
                INFO
              </NavLink>
            </li> 
            <li className="md:px-4 px-0 py-0 mx-0 md:py-2 md:mx-12   ">
              <NavLink to="/account-address" className={({ isActive }) => (isActive ? " text-gray-800  border-gray-700 rounded-box inline-block p-2 border-b-4" : " text-gray-500 rounded-box inline-block p-2    hover:text-gray-600 hover:border-gray-700 ")}>
                ADDRESSES
              </NavLink>
            </li>
            <li className="md:px-4 px-0 py-0 mx-0 md:py-2 md:mx-12   ">
              <NavLink to="/all-orders" className={({ isActive }) => (isActive ? " text-gray-800  border-gray-700 rounded-box inline-block p-2 border-b-4" : " text-gray-500 rounded-box inline-block p-2    hover:text-gray-600 hover:border-gray-700 ")}>
                ORDERS
              </NavLink>
            </li>  
          </ul>
        </div>
        </div>
      </nav>
    </>
    )
}

export default NavbarAccount;