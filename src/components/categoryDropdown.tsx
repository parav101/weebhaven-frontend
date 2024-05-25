import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CategoryDropdown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  function handlToggle() {
    setOpen(!open);
  }
  return (
    <div>
      <button id="dropdownDefaultButton" onClick={handlToggle} className="uppercase  text-center inline-flex items-center" type="button">
        Categories{" "}
        <svg className="w-2.5 h-2.5 ms-1.5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 8">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>
      {open ? (
        <div id="dropdown" className="z-10 relative  bg-white rounded-lg shadow ">
          <ul className="p-2 mt-1 text-sm text-gray-700 absolute bg-gray-100 hover:bg-gray-300 grid grid-cols-1 divide-y divide-gray-100 transition-all ease-in-out duration-300" aria-labelledby="dropdownDefaultButton">
            <li className="block px-4 py-2 hover:bg-gray-100 " onClick={()=>navigate(`/shop/?category=Shirt`)}>Shirts</li>
            <li className="block px-4 py-2 hover:bg-gray-100 " onClick={()=>navigate(`/shop/?category=Hoodie`)}>Hoodies</li>
            <li className="block px-4 py-2 hover:bg-gray-100 " onClick={()=>navigate(`/shop/?category=Figurine`)}>Figurines</li>
            <li className="block px-4 py-2 hover:bg-gray-100 " onClick={()=>navigate(`/shop/?category=Other`)}>Others</li>
          </ul>
        </div>
      ) : null}
      {open ? <div className="fixed top-0 right-0 bottom-0 left-0 bg-inherit" onClick={() => setOpen(false)} /> : null}
    </div>
  );
}
