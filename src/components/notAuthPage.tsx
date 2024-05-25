import { useNavigate  } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../components/Animation - 1715774221375.json";
function NotAuthorizesPage() {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Lottie animationData={animationData} />
          <h1 className="text-2xl font-bold">
            Error 404 not authorized
          </h1>
          <p>Please check with system admin for more info</p>
          <div>
            <button onClick={() => navigate(-1)} className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-gray-600  text-white">
              <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-gray-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
              <span className="relative text-gray-600 transition duration-300 group-hover:text-white ease">Go back</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotAuthorizesPage;
