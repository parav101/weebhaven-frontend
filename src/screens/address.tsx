import { useState, useEffect } from "react";
import axiosApiInstance from "../features/interceptor";
import { Edit_AddressSideBar } from "../components/editAddress.side";
import NavbarAccount from "../components/navbarAccount";
import { Add_AddressSideBar } from "../components/addAddress.side";
import { useSelector } from "react-redux";


function Address() {
  const user = useSelector((state: any) => state.user.value);
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [currentAddress, setNewAddress] = useState<{ name: string; company?: string; phone: string; address: string; city: string; country: string; state: string; pincode: number; isDefault: boolean }>({
    name: "",
    company: "",
    phone: "",
    address: "",
    city: "",
    country: "India",
    state: "",
    pincode: 0,
    isDefault: false,
  });
  const [addresses, setAddresses] = useState<{ id: string; name: string; company?: string; phone: string; address: string; city: string; country: string; state: string; pincode: number; isDefault: boolean }[]>();
  function handlToggle(address: any) {
    setNewAddress(address);
    setOpen(!open);
  }
  function handlToggleAdd() {
    setOpenAdd(!openAdd);
  }
  async function getAddresses() {
    try {
      let response = await axiosApiInstance.get(`http://localhost:3001/view-addresses/${user.id}`, {});
      setAddresses(response.data.addresses);
    } catch (error) {}
  }

  async function handleRemove(id: string) {
    try {
      await axiosApiInstance.get(`http://localhost:3001/remove-address/${id}`, {});
      window.location.reload();
    } catch (error) {}
  }

  useEffect(() => {
    getAddresses();
  }, []);
  return (
    <>
      <NavbarAccount />

      <div className="md:flex flex-wrap md:flex-nowrap justify-evenly">
        <div className=" gap-10 flex flex-row flex-wrap  md:mx-40 mx-10">
          {addresses?.length === 0 ? (
            <div className="bg-gray-50/70  border-[1px] w-[350px] h-[200px]  border-gray-700  md:py-8 md:px-8 rounded-md">
              <p className="font-bold text-sm mb-3">No address</p>
              <div className="text-sm text-gray-800">
                <p>
                  Please add new Address <br /> <br /> <br />
                </p>
              </div>
            </div>
          ) : null}
          {addresses?.map((address) => {
            return (
              <div className="bg-gray-50/70  border-[1px] w-[350px] h-[200px]  border-gray-700 px-4 py-8 md:px-8 rounded-md">
                {address.isDefault ? <p className="font-bold text-sm mb-3">Default address</p> : <p className="font-bold text-sm mb-3">Alternate address</p>}

                <div className="text-sm text-gray-800">
                  <p>
                    {address.name} <br /> {address.address} <br /> {address.phone} <br />
                  </p>
                </div>
                <div className="flex text-[14px] mt-5 font-mono underline underline-offset-2 gap-4">
                  <button onClick={() => handlToggle(address)}>Edit</button>
                  <button onClick={() => handleRemove(address.id)} >Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center mt-32">
        <button type="button" onClick={handlToggleAdd} className="py-3.5 px-7 me-2 mb-2 text-base font-bold border-gray-700  text-gray-900  hover:outline-offset-4 outline outline-black/30 bg-gray-50/70  rounded-full    hover:bg-gray-600 hover:text-white transition-all duration-300 focus:z-10 focus:ring-4 focus:ring-gray-700  ">
          Add Address
        </button>
      </div>

      <div className="flex ">
        <Edit_AddressSideBar open={open} setOpen={setOpen} currentAddress={currentAddress} setNewAddress={setNewAddress} />
        <Add_AddressSideBar open={openAdd} setOpen={setOpenAdd} />
      </div>
    </>
  );
}

export default Address;
