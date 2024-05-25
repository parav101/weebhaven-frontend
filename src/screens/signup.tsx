import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { login } from "../features/user";
import { Loader } from "../components/skelton";
import { Popover, PopoverHandler, PopoverContent } from "@material-tailwind/react";
import { useSelector } from "react-redux";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setNewMessage] = useState("");
  const userInfo = useSelector((state: any) => state.user.value);
  const [user, setNewUser] = useState<{ email: string; password: string; username: string }>({
    email: "",
    password: "",
    username: "",
  });

  useEffect(() => {
    if (userInfo.username) {
      navigate("/");
    }
  }, []);
  async function handleChange(event: any) {
    const name = event.target.name;
    const value = event.target.value;
    setNewUser((currentNewUser) => ({
      ...currentNewUser,
      [name]: value,
    }));
  }
  async function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    setIsLoading(true)
    try {
      let response = await axios.post("http://localhost:3001/register-user", {
        email: user.email,
        password: user.password,
        username: user.username,
      });
      const token: any = response.data.token;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // for all requests
      localStorage.setItem("token", token);
      const info: any = jwtDecode(token);
      dispatch(login({ username: info.username, email: user.email, id: info.id }));
      setIsLoading(false)
      navigate("/");
      window.location.reload();
    } catch (error: any) {
      setNewMessage(error.response.data.message);
      setIsLoading(false)
    }
  }
  const [openPopover, setOpenPopover] = useState(false);
 
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };
  function ShowErrorMessage() {
    if (message) {
      return (
        <div className="bg-gray-400  sm:contianer max-w-60 sm:mx-auto mb-2 rounded-lg flex justify-center  ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
          </svg>
          <p className="text-white text-sm font-mono p-1 font-bold"> {message} </p>
        </div>
      );
    } else return <p></p>;
  }
  return (
    <>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <div className="py-32 ">
          <div className=" sm:container sm:mx-auto text-center ">
            <h1 className="text-3xl font-extrabold">SIGN UP</h1> <br />
            <ShowErrorMessage></ShowErrorMessage>
            <div className="">
              <form className="flex-row" onSubmit={handleSubmit}>
                <div>
                  <input
                    autoComplete="given-name"
                    placeholder="Username"
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={user.username}
                    onChange={handleChange}
                    className="bg-gray-light mb-4 border border-gray-dark text-sm text-gray-dark rounded-lg
                focus:ring-blue-300 focus:border-bring-blue-300 ps-10 p-2.5"
                  />
                </div>

                <div>
                  <input
                    autoComplete="off"
                    placeholder="E-mail"
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={user.email}
                    onChange={handleChange}
                    className="bg-gray-light mb-4 border border-gray-dark text-sm text-gray-dark rounded-lg
                 focus:ring-blue-300 focus:border-bring-blue-300 ps-10 p-2.5"
                  />
                </div>

                <div>
                  <input
                    autoComplete="off"
                    placeholder="Password"
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={user.password}
                    onChange={handleChange}
                    className="bg-gray-light mb-4 border border-gray-dark text-sm text-gray-dark rounded-lg
                 focus:ring-blue-300 focus:border-bring-blue-300 ps-10 p-2.5"
                  />
                </div>

                <div className="pt-5 pb-3">
                  <button
                    className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4
                      focus:outline-none focus:ring-gray-300 font-bold rounded-lg text-sm px-2.5 py-2 
                      text-center me-2 mb-2"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </div>
            <div className="p-1">
              <Popover
              open={openPopover} handler={setOpenPopover}
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
                
              >
                <PopoverHandler {...triggers} onClick={() => {
                      navigate("/login");
                    }}>
                  <button
                    className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4
        focus:outline-none focus:ring-gray-300 font-bold rounded-lg text-sm px-2.5 py-2 
        text-center me-2 mb-2"
                    
                  >
                    Login
                  </button>
                </PopoverHandler>
                <PopoverContent>Have a account already?</PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUp;
