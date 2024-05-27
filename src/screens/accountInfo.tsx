import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAccount from "../components/navbarAccount";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/user";
import axios from "axios";
import { Button } from "@material-tailwind/react";

function AccountInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.user.value);
  useEffect(() => {
    if (!user.username) navigate("/login");
  }, []);
  const logoutUser = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = ``;
    navigate("/login");
    window.location.reload();
    dispatch(logout());
  };
  return (
    <>
      <NavbarAccount />
      <div className="flex justify-center p-4  ">
        <div className="bg-gray-100/90 overflow-hidden shadow rounded-lg border md:max-w-xl w-full p-10   ">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">User Profile</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">all information shown</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Username</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.username}</dd>
              </div>
              <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email}</dd>
              </div>
            </dl>
          </div>
          <Button onClick={() => logoutUser()} variant="text" className="flex items-center gap-2">
            Logout{" "}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
            </svg>
          </Button>
        </div>
      </div>
    </>
  );
}

export default AccountInfo;
