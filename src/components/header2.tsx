import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import axiosApiInstance from "../features/interceptor";
import { Navbar, Collapse, Typography, IconButton } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Search } from "./serach";

function NavList() {
  const [code, setCode] = useState(0);
  const user = useSelector((state: any) => state.user.value);
  async function checkAdmin() {
    try {
      const res = await axiosApiInstance.get("http://localhost:3001/verify-admin");
      setCode(res.status);
    } catch (error: any) {
      setCode(error.response.status);
      console.log(error);
    }
  }
  useEffect(() => {
    if(user.username)
    checkAdmin();
  }, [user]);

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography as="li" variant="small" color="gray" className="p-1 font-medium">
        <NavLink to="/" className={({ isActive }) => (isActive ? " text-gray-900 border-b-2 border-black  " : " text-gray-500 hover:underline underline-offset-2 hover:text-gray-700")}>
          Home
        </NavLink>
      </Typography>
      <Typography as="li" variant="small" color="gray" className="p-1 font-medium">
        <NavLink to="/shop" className={({ isActive }) => (isActive ? " text-gray-900 border-b-2 border-black " : " text-gray-500 hover:underline underline-offset-2 hover:text-gray-700")}>
          Shop
        </NavLink>
      </Typography>
      <Typography as="li" variant="small" color="gray" className="p-1 font-medium">
        <NavLink to="/contact" className={({ isActive }) => (isActive ? " text-gray-900 border-b-2 border-black " : " text-gray-500 hover:underline underline-offset-2 hover:text-gray-700")}>
          Contact
        </NavLink>
      </Typography>
      <Typography as="li" variant="small" color="gray" className="p-1 font-medium">
        <NavLink to="/account-info" className={({ isActive }) => (isActive ? " text-gray-900 border-b-2 border-black " : " text-gray-500 hover:underline underline-offset-2 hover:text-gray-700")}>
          Account
        </NavLink>
      </Typography>
      {code == 200 ? (
        <>
          <Typography as="li" variant="small" color="gray" className="p-1 font-medium">
            <NavLink to="/manage-products" className={({ isActive }) => (isActive ? " text-gray-900 border-b-2 border-black " : " text-gray-500 hover:underline underline-offset-2 hover:text-gray-700")}>
              Manage Products
            </NavLink>
          </Typography>
          <Typography as="li" variant="small" color="gray" className="p-1 font-medium">
            <NavLink to="/manage-orders" className={({ isActive }) => (isActive ? " text-gray-900 border-b-2 border-black " : " text-gray-500 hover:underline underline-offset-2 hover:text-gray-700")}>
              Manage Orders
            </NavLink>
          </Typography>
        </>
      ) : null}
    </ul>
  );
}

export function NavbarSimple() {
  const navigate = useNavigate();
  const cartItems = useSelector((state: any) => state.cart.value);

  const [openNav, setOpenNav] = useState(false);

  const handleWindowResize = () => window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="fixed top-0 z-50 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-gray-900">
        <Typography onClick={() => navigate("/")} variant="h6" className="mr-4 cursor-pointer py-1.5">
          Weeb Haven
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="inline-flex">
          <Search />
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

        <IconButton variant="text" className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden" ripple={false} onClick={() => setOpenNav(!openNav)}>
          {openNav ? <XMarkIcon className="h-6 w-6" strokeWidth={2} /> : <Bars3Icon className="h-6 w-6" strokeWidth={2} />}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
