import { useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { Search } from "./serach";
import { useState,useEffect } from "react";
import axiosApiInstance from "../features/interceptor";

function Header() {
  const navigate = useNavigate();

  const cartItems = useSelector((state: any) => state.cart.value);
  const [code, setCode] = useState(0);
  async function checkAdmin() {
    try {
      const res = await axiosApiInstance.get(`${import.meta.env.VITE_APP_API_URL}/verify-admin`);
      setCode(res.status);
    } catch (error: any) {
      setCode(error.response.status);
      console.log(error);
    }
  }
  useEffect(() => {
    checkAdmin();
    console.log(">??")
  }, [location]); 
  
  function HeaderButton() {
    let token: any = localStorage.getItem("token");
    // const user = useSelector((state: any) => state.user.value);
    if (token) {
      return (
        <div className="flex">
          <button
            className="pl-3"
            onClick={() => {
              navigate("/account-info");
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-10 hover:text-gray-600">
              <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
            </svg>
          </button>

          <div className="group flex items-center ltr">
            <button
              className="pl-3"
              onClick={() => {
                navigate("/cart");
              }}
            >
              <svg className="w-8 h-10 hover:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z" clip-rule="evenodd" />
              </svg>
            </button>
            {cartItems.length !== 0 ? (
              <span className="relative  h-[13px] w-[13px] inline-flex top-[-10px] right-[10px] ">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 justify-center bg-red-500 hover:underline underline-offset-2 text-[10px]  text-white">{cartItems.length}</span>
              </span>
            ) : null}
          </div>
        </div>
      );
    } else
      return (
        <div className="inline-flex ">
          <button
            className="mx-1 px-2 py-2 bg-gray-400 hover:bg-gray-600 text-gray-50 rounded-xl flex items-center gap-2"
            onClick={() => {
              navigate("/login");
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="font-mono text-base">Login</span>
          </button>
          <div className="group flex items-center ltr">
            <button
              className=""
              onClick={() => {
                navigate("/cart");
              }}
            >
              <svg className="w-8 h-10 hover:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z" clip-rule="evenodd" />
              </svg>
            </button>
            {cartItems.length !== 0 ? (
              <span className="relative  h-[13px] w-[13px] inline-flex top-[-10px] right-[10px] ">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 justify-center bg-red-500 hover:underline underline-offset-2 text-[10px]  text-white">{cartItems.length}</span>
              </span>
            ) : null}
          </div>
        </div>
      );
  }
  return (
    <>
      <nav className="bg-gray-100 w-full fixed z-10    w-100  px-8 sm:px-auto ">
        <div className="md:h-24  mx-auto md:px-4  flex items-center md:justify-between flex-wrap md:flex-nowrap">
          {/* <!-- Logo --> */}
          <div
            className="order-1 cursor-pointer"
            onClick={() => {
              navigate("/contact");
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="fill" viewBox="20 15 60 70" className="h-16 w-16 md:h-24 md:w-24 ">
              <path d="M77.5 49.94c-1.24 2.67-4.06 7-9 6a4.26 4.26 0 0 0-4.67 2.37 7 7 0 0 1-10 2.95 11.89 11.89 0 0 0 2.17-3 .7.7 0 0 0-1.24-.64 11 11 0 0 1-2.49 3.22 10.65 10.65 0 0 1-3.38 2 10.9 10.9 0 0 1-12.67-3.71l.29-.27A11.59 11.59 0 0 0 38.53 56a.69.69 0 0 0-.34-1 .69.69 0 0 0-.9.32 9.93 9.93 0 0 1-1.83 2.5 6.28 6.28 0 0 1-.67.59 7.88 7.88 0 0 1-10.49-.6 6.19 6.19 0 0 1 0-8.73 4.74 4.74 0 0 1 3.48-1.4 4.79 4.79 0 0 1 3.3 1.4 3.71 3.71 0 0 1 0 5.23 2.77 2.77 0 0 1-2 .83 2.77 2.77 0 0 1-2-.83.7.7 0 1 0-1 1 4.15 4.15 0 0 0 3 1.24 4.24 4.24 0 0 0 3-1.24 5.1 5.1 0 0 0 0-7.21 6.14 6.14 0 0 0-3.65-1.76v-.64A8 8 0 0 1 40.76 39 9.54 9.54 0 0 0 39 43.84a.7.7 0 0 0 .7.75.71.71 0 0 0 .69-.66 8.13 8.13 0 0 1 4.72-6.74 8 8 0 0 1 3.4-.75 6.38 6.38 0 0 1 6.27 5.22 6.34 6.34 0 0 1 .1 1.16 5 5 0 0 1-5 5A3.84 3.84 0 0 1 46.06 44 2.92 2.92 0 0 1 49 41a.73.73 0 0 0 .73-.62.7.7 0 0 0-.69-.78 4.33 4.33 0 0 0-4.37 4.4 5.22 5.22 0 0 0 5.22 5.22 6.36 6.36 0 0 0 6.36-6.35v-.6a4.94 4.94 0 0 1 3.28 1.46A5 5 0 0 1 61 47.46v.93l.9-.21a7.18 7.18 0 0 1 6.1 1.39 8.65 8.65 0 0 0 9.5.37Z" />
            </svg>
          </div>
          <div className="text-gray-500 relative left-36 md:left-[-50px]   lg:left-[-300px]  w-auto  order-2">
            <ul className="flex text-sm">
              <li className="md:px-2 px-1 md:py-2 ">
                <NavLink to="/" className={({ isActive }) => (isActive ? " text-gray-900 border-b-2 border-black  " : " text-gray-500 hover:underline underline-offset-2 hover:text-gray-700")}>
                  Home
                </NavLink>
              </li>
              {/* <li className="md:px-2 md:py-2 text-gray-800 {}" onClick={()=>{navigate('/')}}>Home</li> */}
              <li className="md:px-2  px-1 md:py-2 ">
                <NavLink to="/shop" className={({ isActive }) => (isActive ? " text-gray-900 border-b-2 border-black " : " text-gray-500 hover:underline underline-offset-2 hover:text-gray-700")}>
                  Shop
                </NavLink>
              </li>
              <li className="md:px-2  px-1 md:py-2 ">
                <NavLink to="/contact" className={({ isActive }) => (isActive ? " text-gray-900 border-b-2 border-black " : " text-gray-500 hover:underline underline-offset-2 hover:text-gray-700")}>
                  Contact
                </NavLink>
              </li>
              {code == 200 ? (
                <>
                <li className="md:px-2  px-1 md:py-2 ">
                  <NavLink to="/manage-products" className={({ isActive }) => (isActive ? " text-gray-900 border-b-2 border-black " : " text-gray-500 hover:underline underline-offset-2 hover:text-gray-700")}>
                    Manage Products
                  </NavLink>
                </li>
                <li className="md:px-2  px-1 md:py-2 ">
                  <NavLink to="/manage-orders" className={({ isActive }) => (isActive ? " text-gray-900 border-b-2 border-black " : " text-gray-500 hover:underline underline-offset-2 hover:text-gray-700")}>
                    Manage Orders
                  </NavLink>
                </li>
                </>
              ) : null}
            </ul>
          </div>
          <div className="order-3 flex justify-between  min-w-full md:min-w-0">
            <Search />
            <HeaderButton />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
