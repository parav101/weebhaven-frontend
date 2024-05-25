// import { useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate()
  return (
    <>
      <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a href="/" className="hover:underline cursor-pointer">
              Weeb Haven™
            </a>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li className=" me-4 md:me-6 hover:underline cursor-pointer" onClick={()=>{navigate('/about')}}>
            About
            </li>
            <li className=" me-4 md:me-6">
            Privacy Policy
            </li>
            <li className=" me-4 md:me-6 hover:underline cursor-pointer" onClick={()=>{navigate('/contact')}}>
                Contact
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default Footer;
