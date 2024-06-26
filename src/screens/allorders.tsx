// import { useState,useEffect } from 'react'
import { useState, useEffect } from "react";
import NavbarAccount from "../components/navbarAccount";
import { useSelector } from "react-redux";
import Moment from "moment";
import axiosApiInstance from "../features/interceptor";

function AllOrders() {
  Moment.locale("en");
  const user = useSelector((state: any) => state.user.value);
  const [orders, setNewOrders] = useState<{
    id: string;
    userId: string;
    totalItems: number;
    status: string;
    total: number;
    deleviryDate: null;
    isPaid: boolean;
    createdAt: string;
    updatedAt: string;
    OrderItems: {}[];
  }[]>();
  async function getOrders() {
    try {
      let response = await axiosApiInstance.get(`${import.meta.env.VITE_APP_API_URL}/view-orders/${user.id}`,{
    });
      // console.log(response.data)
      setNewOrders(response.data.allOrders);
     
    } catch (error) {
    }
  }
 
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
      <NavbarAccount />
      <section className="py-2 relative ">
        {orders ? (
          orders.map((order)=>{
            return(
              <div className="w-full max-w-7xl px-2 md:px-5 lg-6 mx-auto ">
            <p className=" font-normal opacity-75 leading-8 text-gray-500 mb-2 text-center">Thanks for making a purchase you can check our order summary from below</p>
            <div className="main-box border border-gray-500/30 rounded-xl  max-w-xl max-lg:mx-auto lg:max-w-full bg-gray-100/80">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-500/30">
                <div className="data">
                  <p className="font-semibold text-base leading-7 text-black">
                    Order Id: <span className="text-gray-600 font-medium">#{order.id}</span>
                  </p>
                  <p className="font-semibold text-base leading-7 text-black mt-4">
                    Order Payment : <span className="text-gray-600 font-medium"> {Moment(order.createdAt).format("DD MMMM YYYY")}</span>
                  </p>
                </div>
                <button className="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white font-mono bg-gray-400 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-700 hover:shadow-indigo-400">Track Your Order</button>
              </div>
              <div className="w-full px-3 min-[400px]:px-6">

                {order.OrderItems.map((items: any) => {
                  return (
                    <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-500/30 gap-6  mb-4 w-full">
                      <div className="img-box max-lg:w-full">
                        <img src={import.meta.env.VITE_APP_API_URL+"/images/"+items.productImage} alt="Premium Watch image" className="aspect-1 object-cover w-full sm:max-w-[140px] h-full sm:max-h-[140px]" />
                      </div>
                      <div className="flex flex-row items-center w-full ">
                        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                          <div className="flex items-center">
                            <div className="">
                              <h2 className="font-semibold text-xl leading-8 text-black mb-3">{items.productName}</h2>
                              <p className="font-normal text-lg leading-8 text-gray-500 mb-3 ">{items.category}</p>
                              <div className="flex items-center ">
                                <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-500/30">
                                  Size: <span className="text-gray-500">{items.size}</span>
                                </p>
                                <p className="font-medium text-base leading-7 text-black ">
                                  Qty: <span className="text-gray-500">{items.quantity}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-5">
                            <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                              <div className="flex gap-3 lg:block">
                                <p className="font-medium text-sm leading-7 text-black">price</p>
                                <p className="lg:mt-4 font-medium text-sm leading-7 text-gray-600">${items.productPrice.toFixed(2)}</p>
                              </div>
                            </div>
                            <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                              <div className="flex gap-3 lg:block">
                                <p className="font-medium text-sm leading-7 text-black">Status</p>
                                <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-gray-50 text-gray-600">{order.status}</p>
                              </div>
                            </div>
                            <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                              <div className="flex gap-3 lg:block">
                                <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">Expected Delivery Time</p>
                                <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-gray-500">{Moment(order.createdAt).format("DD MMMM YYYY")}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="w-full border-t px-6 flex flex-col lg:flex-row items-center justify-end ">
                  <p className="font-normal mono text-lg text-black py-6">
                    Total Price: <span className="text-black  drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">${order.total.toFixed(2)}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
            )
          })
        ) : null}
      </section>
     
    </>
  );
}

export default AllOrders;
