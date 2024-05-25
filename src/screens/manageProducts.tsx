import { useState, useEffect } from "react";
import axios from "axios";
import axiosApiInstance from "../features/interceptor";
import {  useNavigate } from "react-router-dom";

function ManageProducts() {
  const navigate = useNavigate();
  const [trigger,setTrriger] = useState(false)
  const [id,setId] = useState("")
  const [products, setNewProducts] = useState<
    {
      id: string;
      productName: string;
      productDesc: string;
      orderIndex: number;
      category: string;
      isFeatured: boolean;
      createdAt: string;
      updatedAt: string;
      ProductEntries: {
        id: string;
        productImage: string;
        productPrice: number;
        discountedPrice: number;
        Size: any;
        Colour: any;
      }[];
    }[]
  >([]);
  async function getProducts() {
    try {
      let response = await axios.get("http://localhost:3001/view-products");
      setNewProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleFeatured(flag: boolean, productName: string) {
    try {
      await axiosApiInstance.post("http://localhost:3001/update-productInfo", {
        oldProductName: productName,
        isFeatured: flag,
      });
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }

  function handleEdit(name: string) {
    navigate("/update-product", { state: { name: name } });
  }

  async function handleDelete(id:string) {
    try {
      await axiosApiInstance.get(`http://localhost:3001/delete-product/${id}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <div className="relative overflow-x-auto mt-4">
        <div className="flex justify-start p-4 w-full">
          <button onClick={()=>navigate('/add-product')} className="relative px-2 py-1 overflow-hidden font-medium text-gray-600 bg-gray-200 border border-gray-100 rounded-lg shadow-inner group">
            <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
            <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
            <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
            <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease text-sm inline-flex">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -2 24 24" fill="currentColor" className="w-4 h-4">
                <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
              </svg>
              Add Product
            </span>
          </button>
        </div>
        <table className="w-full text-sm text-left  text-gray-500 ">
          <thead className="text-xs text-gray-900 uppercase ">
            <tr>
              <th scope="col" className="ps-2 py-4  "></th>
              <th scope="col" className=" py-4 flex p-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fill-rule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm8.25 5.25a.75.75 0 0 1 .75-.75h8.25a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                </svg>
                Sr. No.
              </th>
              <th scope="col" className="px-4 py-3">
                Product name
              </th>
              <th scope="col" className="px-4 py-3">
                Category
              </th>
              <th scope="col" className="px-4 py-3">
                Delete
              </th>
              <th scope="col" className="px-4 py-3">
                Featured
              </th>
              <th scope="col" className="px-4 py-3">
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-900 bg-white">
            {products.map((product, index) => {
              return (
                <tr className="">
                  <td className="ps-2 py-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                      <path fill-rule="evenodd" d="M3 9a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9Zm0 6.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                    </svg>
                  </td>
                  <td className="ps-1  py-4">
                    <p className="ms-3">{index + 1}</p>
                  </td>
                  <td className="px-4 py-4 ps-5">{product.productName}</td>
                  <td className="px-4 py-4 ps-5">{product.category}</td>
                  <td className="px-4 py-4">
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{setTrriger(!trigger);setId(product.id)}} viewBox="0 0 24 24" fill="currentColor" className="ms-3 w-6 h-6 hover:text-gray-600">
                      <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clip-rule="evenodd" />
                    </svg>
                    {trigger ?(  <div id="popup-modal" tabIndex={-1} className=" overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                      <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow ">
                          <button type="button" onClick={()=>setTrriger(!trigger)} className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  " data-modal-hide="popup-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                          </button>
                          <div className="p-4 md:p-5 text-center">
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 ">Are you sure you want to delete this product?</h3>
                            <button data-modal-hide="popup-modal" onClick={()=>{handleDelete(id);setTrriger(!trigger)}} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                              Yes, I'm sure
                            </button>
                            <button data-modal-hide="popup-modal" onClick={()=>setTrriger(!trigger)} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">
                              No, cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>):(null)}
                  
                  </td>
                  <td className="px-4 py-4">
                    <label className="inline-flex items-center cursor-pointer ms-3">
                      <input type="checkbox" checked={product.isFeatured} onChange={(event) => handleFeatured(event.target.checked, product.productName)} className="sr-only peer" />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-gray-600"></div>
                    </label>
                  </td>
                  <td className="px-4 py-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" onClick={() => handleEdit(product.productName)} className="ms-1 w-5 h-5 hover:text-gray-600">
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                    </svg>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ManageProducts;
