import { useState } from "react";
import axiosApiInstance from "../features/interceptor";
import { useSelector } from "react-redux";
export function Add_AddressSideBar(props: any) {

  const [address, setNewAddress] = useState<{ name: string; company?: string; phone: string; address: string; city: string; country: string; state: string; pincode: number; isDefault: boolean }>({
    name: "", company: "", phone: "", address: "", city: "", country: "India", state: "", pincode: 0, isDefault: false
  })
  const user = useSelector((state: any) => state.user.value);
  function handleChange(event: any) {
    const name = event.target.name;
    const value = event.target.value;
    setNewAddress((currentAddress) => ({
      ...currentAddress,
      [name]: value,
    }));
    
  }

  function handleCheck(event:any){
    setNewAddress((currentAddress) => ({
      ...currentAddress,
      isDefault: event.target.checked,
    }));
  }

  async function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    props.setOpen(false)
    try {
       await axiosApiInstance.post(`${import.meta.env.VITE_APP_API_URL}/add-address`, {
        userId:user.id,name: address.name, company: address.company, phone: address.phone, address: address.address, city: address.city, country: address.country, state: address.state, pincode: address.pincode, isDefault: address.isDefault
      });
      window.location.reload();
    } catch (error:any) {   
      console.log(error.response.data.message)
    }
  }

  return (
    <>
      {props.open ? (
        <div className={`absolute  inset-0   bg-black/50  z-20  `}>
          <div className="fixed top-0 right-0 bottom-0 left-0 bg-inherit z-10 cursor-pointer" onClick={() => props.setOpen(false)} />
        </div>
      ) : null}
      <div className={`top-0 right-0 bottom-0  fixed w-full md:max-w-screen-sm max-w-[370px] bg-hero_pattern bg-gray-300 z-40 rounded-md  ease-in-out duration-500 ${props.open ? "translate-x-0 " : "translate-x-full"}`}>
        {props.open ? (
          <>
            <div className="flex-col absolute right-0 inset-y-0 p-8   w-full md:max-w-screen-sm max-w-[370px] bg-hero_pattern bg-gray-300 z-40 rounded-md ">
              <h1 className="text-2xl font-bold">Add address</h1>
              <p className="text-sm pt-4">Please fill in the infomation below:</p>
              <form className="font-sans  text-sm  mx-auto my-2  pt-4 pb-8" onSubmit={handleSubmit}>
                <div className="relative mb-3">
                  <input type="text" name="name" value={address.name} onChange={handleChange} id="full_name" className=" text-gray-dark border-2 peer block w-full  appearance-none rounded-md  border-gray-400 py-[14px] pl-6 text-sm focus:border-gray-800 focus:outline-none focus:ring-0" placeholder=" " required />
                  <label htmlFor="full_name" className="absolute  top-4 left-6 text-gray-middle  duration-200 transform -translate-y-4 text-[10px] transparent peer-placeholder-shown:text-sm  peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:px-[4px] peer-focus:text-[10px] peer-focus:text-gray-500 text-gray-400 ">
                    Full Name
                  </label>
                </div>
                <div className="relative mb-3">
                  <input type="text" name="company" value={address.company} onChange={handleChange} id="Company" className=" text-gray-dark border-2 peer block w-full  appearance-none rounded-md  border-gray-400 py-[14px] pl-6 text-sm focus:border-gray-800 focus:outline-none focus:ring-0" placeholder=" "  />
                  <label htmlFor="company" className="absolute  top-4 left-6 text-gray-middle  duration-200 transform -translate-y-4 text-[10px] transparent peer-placeholder-shown:text-sm  peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:px-[4px] peer-focus:text-[10px] peer-focus:text-gray-500 text-gray-400 ">
                    Company
                  </label>
                </div>
                <div className="relative mb-3">
                  <input id="tel" type="phone" value={address.phone} onChange={handleChange} name="phone" className=" text-gray-dark border-2 peer block w-full  appearance-none rounded-md  border-gray-400 py-[14px] pl-6 text-sm focus:border-gray-800 focus:outline-none focus:ring-0" placeholder=" " required />
                  <label htmlFor="tel" className="absolute  top-4 left-6 text-gray-middle  duration-200 transform -translate-y-4 text-[10px] transparent peer-placeholder-shown:text-sm  peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:px-[4px] peer-focus:text-[10px] peer-focus:text-gray-500 text-gray-400 ">
                    Phone number
                  </label>
                </div>
                <div className="relative mb-3">
                  <input type="text" name="address" value={address.address} onChange={handleChange} id="address" className=" text-gray-dark border-2 peer block w-full  appearance-none rounded-md  border-gray-400 py-[14px] pl-6 text-sm focus:border-gray-800 focus:outline-none focus:ring-0" placeholder=" " required />
                  <label htmlFor="address" className="absolute  top-4 left-6 text-gray-middle  duration-200 transform -translate-y-4 text-[10px] transparent peer-placeholder-shown:text-sm  peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:px-[4px] peer-focus:text-[10px] peer-focus:text-gray-500 text-gray-400 ">
                    Address
                  </label>
                </div>
                <div className="relative mb-3 flex">
                  <input type="text" name="city" value={address.city} onChange={handleChange} id="city" className="relative max-w-40 md:max-w-full  text-gray-dark border-2 peer block   appearance-none rounded-md  border-gray-400 py-[14px] pl-6 text-sm focus:border-gray-800 focus:outline-none focus:ring-0" placeholder=" " required />
                  <label htmlFor="city" className="absolute  top-4 left-6 text-gray-middle  duration-200 transform -translate-y-4 text-[10px] transparent peer-placeholder-shown:text-sm  peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:px-[4px] peer-focus:text-[10px] peer-focus:text-gray-500 text-gray-400 ">
                    City
                  </label>
                  <input type="text" name="state" value={address.state} onChange={handleChange} id="state" className="relative max-w-40 md:max-w-full text-gray-dark border-2 peer block  appearance-none rounded-md  border-gray-400 py-[14px] pl-6 text-sm focus:border-gray-800 focus:outline-none focus:ring-0" placeholder=" " required />
                  <label htmlFor="state" className="absolute  top-4 left-60 text-gray-middle  duration-200 transform -translate-y-4 text-[10px] transparent peer-placeholder-shown:text-sm  peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:px-[4px] peer-focus:text-[10px] peer-focus:text-gray-500 text-gray-400 ">
                    State
                  </label>
                </div>
                <div className="relative mb-3">
                  <input type="text" name="pincode" value={address.pincode} onChange={handleChange} id="pincode" className=" text-gray-dark border-2 peer block w-full  appearance-none rounded-md  border-gray-400 py-[14px] pl-6 text-sm focus:border-gray-800 focus:outline-none focus:ring-0" placeholder=" " required />
                  <label htmlFor="pincode" className="absolute  top-4 left-6 text-gray-middle  duration-200 transform -translate-y-4 text-[10px] transparent peer-placeholder-shown:text-sm  peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:px-[4px] peer-focus:text-[10px] peer-focus:text-gray-500 text-gray-400 ">
                    Pincode
                  </label>
                </div>
                <div className="relative mb-3">
                  <select name="country" id="country" value={address.country} onChange={handleChange} className="text-gray-dark border-2 peer block w-full  appearance-none rounded-md  border-gray-400 py-[14px] pl-6 text-sm focus:border-gray-800 focus:outline-none focus:ring-0">
                    <option value="India">India</option>
                  </select>
                  <label htmlFor="country" className="absolute  top-4 left-6 text-gray-middle  duration-200 transform -translate-y-4 text-[10px] transparent peer-placeholder-shown:text-sm  peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:px-[4px] peer-focus:text-[10px] peer-focus:text-gray-500 text-gray-400 ">
                    Country
                  </label>
                </div>
                <div className="relative flex items-center mb-3">
                  <input id="default-checkbox" type="checkbox" name="isDefault" defaultChecked={address.isDefault} onChange={handleCheck} className="ms-1 w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500" />
                  <label htmlFor="default-checkbox" className=" ms-2 text-sm font-medium text-gray-900 ">
                    Save this address as default
                  </label>
                </div>
                <div className="flex justify-center mt-16">
                  <button type="submit"  className="py-3.5 w-full me-2 mb-2 text-base font-bold border-gray-700  text-gray-900  hover:outline-offset-4 outline outline-black/30 bg-gray-50/70  rounded-full    hover:bg-gray-600 hover:text-white transition-all duration-300 focus:z-10 focus:ring-4 focus:ring-gray-700  ">
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
