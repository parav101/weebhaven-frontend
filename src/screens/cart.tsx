import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../features/cart";
import axiosApiInstance from "../features/interceptor";
import Lottie from "lottie-react";
import animationData from "../components/cartAnimation.json";
import { DialogDefault } from "../components/coupons";
// import axios from "axios";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state: any) => state.cart.value);
  const [total, settotal] = useState(0);
  let [userCoupon, setUserCoupon] = useState("");
  let [couponError, setCouponError] = useState("");
  let [discount, setDiscount] = useState(0);
  const [newCoupon, setNewCoupon] = useState<{
    code: string;
    desc: string;
    type: string;
    minAmount: number;
    discountValue: number;
  }>();

  const [allCoupons, setAllCoupons] = useState<{
    code: string;
    desc: string;
    type: string;
    minAmount: number;
    discountValue: number;
  }[]>([]);

  const [coupon, setcoupon] = useState<{
    code: string;
    desc: string;
  }>();

  async function getCoupon() {
    try {
      let response = await axiosApiInstance.get(`${import.meta.env.VITE_APP_API_URL}/view-coupon`);
      setcoupon(response.data.singleCoupon);
      setAllCoupons(response.data.allCoupons);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCoupon();
  }, []);
  async function handleCoupon(coupon: string) {
    setCouponError("");
    try {
      let response = await axiosApiInstance.get(`${import.meta.env.VITE_APP_API_URL}/view-coupon/${coupon}`);
      if (response.data.singleCoupon) {
        if (response.data.singleCoupon.minAmount > total) setCouponError(`Purchase should be above $${response.data.singleCoupon.minAmount}.00 to redeem this coupon`);
        else {
          setNewCoupon(response.data.singleCoupon);
      
        }
      } else setCouponError("Coupon not Availabile");
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
   if(newCoupon){
    if (newCoupon?.type == "total") {
      setDiscount(newCoupon.discountValue);
    } else {
      //add logic for perecent coupon
      setDiscount( total *newCoupon!.discountValue/100);
    }
   }
  }, [newCoupon]);
  function handleAdd(productEntry_Id: string) {
    // let currentValue: any = document.getElementById(product_id);
    // currentValue.value++;
    dispatch(updateQuantity({ productEntryId: productEntry_Id, newQuantity: 1 }));
  }

  function handleRemove(productEntry_Id: string) {
    let currentValue: any = document.getElementById(productEntry_Id);
    if (currentValue.value != 1) {
      dispatch(updateQuantity({ productEntryId: productEntry_Id, newQuantity: -1 }));
    }
  }

  function handleRemoveItem(productEntry_Id: string) {
    dispatch(removeItem({ productEntryId: productEntry_Id }));
  }

  function calculateTotal() {
    let currentTotal = 0;
    cartItems.forEach((item: { discountedPrice: number; quantity: number }) => {
      currentTotal = item.discountedPrice * item.quantity + currentTotal;
    });
    settotal(currentTotal);
  }

  async function handleCheckout() {
    if (newCoupon) navigate(`/checkout?coupon=${newCoupon.code}`, { state: { discount: discount } });
    else navigate(`/checkout`);
  }

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);
  useEffect(() => {}, [total]);

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Lottie animationData={animationData} />
          <h1 className="text-2xl font-bold">
            Empty Cart
          </h1>
          <p>Please add some products</p>
          <div>
            <button onClick={() => navigate('/shop')} className="rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-gray-600  text-white">
              <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-gray-600 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
              <span className="relative text-gray-600 transition duration-300 group-hover:text-white ease">Shop</span>
            </button>
          </div>
        </div>
      </div>
      ) : (
        <>
          <div className="flex-row md:flex md:overflow-x-auto    mx-auto  w-full bg-gray-100">
            <div className="p-2 md:p-6  md:max-w-full  mx-auto w-full  ">
              <h2 className="text-xl uppercase   sm:justify-start flex justify-center font-semibold text-black mt-10 md:mt-1 ps-4  pb-4">cart</h2>

              <div className="relative shadow-md sm:rounded-lg ">
                <table className="w-full mt-6 md:mt-2 text-sm text-left rtl:text-right text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase  text-opacity-100 bg-opacity-50 border-b-[1px] border-gray-200">
                    <tr>
                      <th scope="col" className="md:px-16 px-10 py-3">
                        Product
                      </th>
                      <th scope="col" className="px-12 py-3">
                        Qty
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item: any) => {
                      return (
                        <tr className="  ">
                          <td className="p-2 flex">
                            <img src={item.productImage} className="w-16 md:w-32 object-contain h-16 md:h-32 max-w-full max-h-full" alt={item.productName} />
                            <div className="relative">
                              <h3 className=" text-gray-700">{item.productName} </h3>
                              <p className="mt-1 text-gray-600 text-sm">
                                Size: <span className="text-xs font-semibold">{item.size}</span>
                              </p>
                              <p className="mt-1 text-gray-600 text-sm">
                                Color: <span className="text-xs uppercase font-semibold">{item.colour}</span>
                              </p>
                              <button className="relative md:top-6 font-medium text-xs text-red-600  hover:underline cursor-pointer" onClick={() => handleRemoveItem(item.productEntryId)}>
                                Remove
                              </button>
                            </div>
                          </td>
                          <td className=" py-4">
                            <div className="flex items-center">
                              <button onClick={() => handleRemove(item.productEntryId)} className="inline-flex items-center justify-center p-1 me-1 md:me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
                                <span className="sr-only">Quantity button</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                </svg>
                              </button>
                              <div>
                                <input type="number" id={item.productEntryId} value={item.quantity} className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block px-2.5 py-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="1" required />
                              </div>
                              <button onClick={() => handleAdd(item.productEntryId)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-1 md:ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
                                <span className="sr-only">Quantity button</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                  <path stroke="currentColor" stroke-licnecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-semibold text-sm text-gray-500">${item.discountedPrice.toFixed(2)}</td>
                          
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="pt-4 flex">
                <div className="relative  md:mx-0 mx-auto h-10 w-full min-w-[100px] max-w-[18rem] pt">
                  <button onClick={() => handleCoupon(userCoupon)} className="!absolute right-1 top-1 z-10 select-none rounded bg-gray-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none" type="button" data-ripple-light="true">
                    Apply
                  </button>
                  <input type="text" onChange={(event) => setUserCoupon(event.target.value)} className="focus:ring-0 border-t-transparent  peer h-full w-full rounded-[7px] border border-gray-400 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-400 placeholder-shown:border-t-gray-400 focus:border-2 focus:border-gray-500 focus:border-t-transparent focus:outline-0 " placeholder=" " required />
                  <label className="focus:ring-0 before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-gray-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-gray-400 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-gray-500">
                    Coupon Code
                  </label>
                </div>
              </div>
              {coupon ? (<div className="flex"><DialogDefault allCoupons={allCoupons}/></div>  ) : null}
             
              <p className="text-[14px] pt-1 ps-1 text-red-600">{couponError}</p>
            </div>
            <div className="  lg:h-screen md:max-w-[350px] me-5 w-full h-full lg:sticky sm:relative absolute   ">
              <div className="container bg-gray-200 md:rounded-lg shadow-md  relative md:top-24 mx-auto  w-[100%] h-[50%]">
                <div className="flex">
                <h2 className="text-[20px] uppercase  text-black sm:mt-4  md:pt-6 md:pb-6 md:ps-6 border-b border-black/10  md:mx-0 mx-auto">Order Summary</h2>
                </div>
                <div className="p-12">
                  <h3 className="flex flex-wrap gap-4 text-base text-[#333] uppercase font-medium">
                    Subtotal <span className="ml-auto">${total.toFixed(2)}</span>
                  </h3>
                  {newCoupon?.discountValue && couponError == "" ? (
                    <h3 className="flex flex-wrap gap-4 text-base text-red-500 uppercase font-medium">
                      Discount <span className="ml-auto">${discount.toFixed(2)}</span>
                    </h3>
                  ) : null}
                  <h3 className="flex uppercase flex-wrap gap-4 text-xl text-[#333] font-bold">
                    Total <span className="ml-auto">${newCoupon?.discountValue && couponError == "" ? (total - discount).toFixed(2): total.toFixed(2)}</span>
                  </h3>
                  <p className="text-[13px] pt-4">Taxes and shipping calculated at checkout</p>
                  <div className="relative top-12">
                    <button type="button" onClick={() => handleCheckout()} className="group inline-flex  w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                      Checkout
                      <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Cart;
