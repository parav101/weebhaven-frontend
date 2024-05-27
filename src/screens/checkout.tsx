import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import axiosApiInstance from "../features/interceptor";
import { emptyCart } from "../features/cart";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const user = useSelector((state: any) => state.user.value);
  const cart = useSelector((state: any) => state.cart.value);
  const [addresses, setAddresses] = useState<{ id: string; name: string; company?: string; phone: string; address: string; city: string; country: string; state: string; pincode: number; isDefault: boolean }[]>();
  const [active, setActive] = useState();
  const [total, settotal] = useState(0);
  let [addressId, setAddressId] = useState("");
  const [searchParams, ] = useSearchParams();
  const coupon = searchParams.get("coupon") || "";
  async function getAddresses() {
    try {
      let response = await axiosApiInstance.get(`${import.meta.env.VITE_APP_API_URL}/view-addresses/${user.id}`, {});
      // console.log(response.data)
      setAddresses(response.data.addresses);
    } catch (error) {}
  }
  function activeButton(value:any,id:string){
    setActive(value)
    setAddressId(id)
 }

  // async function handleSubmit(event: { preventDefault: () => void }) {
  //   event.preventDefault();
  // }
  function calculateTotal() {
    let currentTotal = 0;
    cart.forEach((item: { discountedPrice: number; quantity: number }) => {
      currentTotal = item.discountedPrice * item.quantity + currentTotal;
    });
    settotal(currentTotal);
  }
  async function handleCheckout() {
    try {
      let response = await axiosApiInstance.post(`${import.meta.env.VITE_APP_API_URL}/add-order`, {
        userId: user.id,
        totalItems: cart.length,
        status: "Dispatched",
        total: total,
        cartItems: cart,
        coupon: coupon,
        addressId:addressId
      });
      navigate("/currentOrder", { state: { id: response.data.newOrder.id } });
      dispatch(emptyCart());
    } catch (error: any) {
      console.log(error);
      if(error.response.status == 401) navigate('/login')
    }
  }
  useEffect(() => {
    getAddresses();
    calculateTotal();
  }, [cart]);
  return (
    <>
      <div className="font-[sans-serif] bg-hero_pattern bg-white">
        <div className="max-lg:max-w-xl mx-auto w-full">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 max-lg:order-1 p-6 max-w-4xl mx-auto w-full">
              <div className="text-center max-lg:hidden">
                <h2 className="text-xl uppercase font-semibold text-black  border-b-[3px]  border-black    pb-4">Checkout</h2>
              </div>
              <form className="lg:mt-12">
                <div>
                  <h2 className="text-base uppercase font-semibold text-black">Shipping info</h2>
                  <h2 className="text-sm  text-black">Please select address for delivery</h2>
                  <div className="flex justify-start max-w-[1000px]">
                    <div className=" gap-10 flex flex-row  flex-wrap mt-8  ">
                      {addresses?.length === 0 ? (
                        <div className="bg-gray-50/70  border-[1px] w-[400px] h-[150px]  border-gray-700 px-4 py-8 md:px-8 rounded-md">
                          <p className="font-bold text-sm mb-3">No address</p>
                          <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                            <p onClick={()=>navigate('/account-address')}>
                              Please add new Address <br /> <br /> <br />
                            </p>
                          </div>
                        </div>
                      ) : null}
                      {addresses?.map((address,index) => {
                        return (
                          <div onClick={()=>activeButton(index,address.id)} key={index} className={`bg-gray-50/70 md:mx-0 mx-auto border-[1px] w-[300px] md:w-[400px] h-[150px]  border-gray-700 px-4 py-8 md:px-8 rounded-md ${active == index ? ("shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]"):(null)} `}>
                            {address.isDefault ? <p className="font-bold text-sm mb-3">Default address</p> : <p className="font-bold text-sm mb-3">Alternate address</p>}

                            <div className="text-sm text-gray-800">
                              <p>
                                {address.name} <br /> {address.address} <br /> {address.phone} <br />
                              </p>
                            </div>
                          </div>
                        );
                      })}
             
                    </div>
                  </div>
                </div>
                <div className="mt-12">
                  <h2 className="text-base uppercase font-semibold text-black ">Payment method</h2>
                  <div className="grid gap-4 sm:grid-cols-2 mt-8">
                    <div className="flex items-center">
                      <input type="radio" className="w-5 h-5 cursor-pointer" id="card" checked />
                      <label htmlFor="card" className="ml-4 flex gap-2 cursor-pointer">
                        <img src="https://readymadeui.com/images/visa.webp" className="w-12" alt="card1" />
                        <img src="https://readymadeui.com/images/american-express.webp" className="w-12" alt="card2" />
                        <img src="https://readymadeui.com/images/master.webp" className="w-12" alt="card3" />
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" className="w-5 h-5 cursor-pointer" id="paypal" />
                      <label htmlFor="paypal" className="ml-4 flex gap-2 cursor-pointer">
                        <img src="https://readymadeui.com/images/paypal.webp" className="w-20" alt="paypalCard" />
                      </label>
                    </div>
                  </div>
                  <div className="grid gap-6 mt-8">
                    <input type="text" placeholder="Cardholder's Name" className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                    <div className="flex bg-white border-b-2 focus-within:border-[#333] overflow-hidden">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 ml-3" viewBox="0 0 291.764 291.764">
                        <path fill="#2394bc" d="m119.259 100.23-14.643 91.122h23.405l14.634-91.122h-23.396zm70.598 37.118c-8.179-4.039-13.193-6.765-13.193-10.896.1-3.756 4.24-7.604 13.485-7.604 7.604-.191 13.193 1.596 17.433 3.374l2.124.948 3.182-19.065c-4.623-1.787-11.953-3.756-21.007-3.756-23.113 0-39.388 12.017-39.489 29.204-.191 12.683 11.652 19.721 20.515 23.943 9.054 4.331 12.136 7.139 12.136 10.987-.1 5.908-7.321 8.634-14.059 8.634-9.336 0-14.351-1.404-21.964-4.696l-3.082-1.404-3.273 19.813c5.498 2.444 15.609 4.595 26.104 4.705 24.563 0 40.546-11.835 40.747-30.152.08-10.048-6.165-17.744-19.659-24.035zm83.034-36.836h-18.108c-5.58 0-9.82 1.605-12.236 7.331l-34.766 83.509h24.563l6.765-18.08h27.481l3.51 18.153h21.664l-18.873-90.913zm-26.97 54.514c.474.046 9.428-29.514 9.428-29.514l7.13 29.514h-16.558zM85.059 100.23l-22.931 61.909-2.498-12.209c-4.24-14.087-17.533-29.395-32.368-36.999l20.998 78.33h24.764l36.799-91.021H85.059v-.01z" data-original="#2394bc" />
                        <path fill="#efc75e" d="M51.916 111.982c-1.787-6.948-7.486-11.634-15.226-11.734H.374L0 101.934c28.329 6.984 52.107 28.474 59.821 48.688l-7.905-38.64z" data-original="#efc75e" />
                      </svg>
                      <input type="number" placeholder="Card Number" className="px-2 py-3.5 bg-white text-[#333] w-full text-sm outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <input type="number" placeholder="EXP." className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                      <input type="number" placeholder="CVV" className="px-2 py-3.5 bg-white text-[#333] w-full text-sm border-b-2 focus:border-[#333] outline-none" />
                    </div>
                    <div className="flex items-center">
                      <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                      <label htmlFor="remember-me" className="ml-3 block text-sm">
                        I accept the{" "}
                        <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1">
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="md:flex flex-wrap gap-6 mt-8 hidden ">
                  <button type="button" onClick={() => navigate(-1)} className="min-w-[100px] md:mx-0 mx-auto px-6 py-3.5 text-sm bg-gray-200 text-[#333] rounded-md hover:bg-gray-200">
                    Back
                  </button>
                  {addressId ? ( <button onClick={handleCheckout} type="button" className="min-w-[150px] md:mx-0 mx-auto px-6 py-3.5 text-sm bg-[#333] text-white rounded-md hover:bg-[#111]">
                    Confirm payment ${state ? (total - state.discount).toFixed(2) : total.toFixed(2)}
                  </button>) : ( <button  type="button" className="min-w-[150px] px-6 py-3.5 text-sm bg-[#333] text-white rounded-md hover:bg-[#111]">
                    Select Address
                  </button>)}
                 
                </div>
              </form>
            </div>
            <div className="bg-gray-100  lg:h-screen lg:sticky lg:top-0">
              <div className="relative h-full">
                <div className="p-8 lg:overflow-auto lg:h-[calc(100vh-60px)] ">
                  <h2 className="text-xl uppercase font-semibold text-black">Bag Summary</h2>
                  <div className="space-y-28  mt-10 lg:mb-56">
                    {cart.map((item: any) => {
                      return (
                        <div className="grid  sm:grid-cols-3  items-start">
                          <div className="max-w-[150px] max-h-[100px] px-1 py-1 flex rounded-md ">
                            <img src={import.meta.env.VITE_APP_API_URL+"/images/"+item.productImage} className="w-full h-full  object-contain rounded-xl " />
                            <span className="relative  inline-flex bottom-[10px] left-[-10px] ">
                              <span className=" text-blue font-mono font-semibold relative inline-flex  h-6 w-6 cursor-pointer items-center justify-center rounded-full border bg-gray-500/60 uppercase tracking-wide shadow-lg text-white">{item.quantity}</span>
                            </span>
                          </div>
                          <div className=" col-start-2 ms-4  col-span-4 ">
                            <h3 className=" text-gray-700">{item.productName} </h3>
                            <p className="mt-1 text-gray-600 text-sm">
                              Size: <span className="text-xs font-semibold">{item.size}</span>
                            </p>
                            <p className="mt-1 text-gray-600 text-sm">
                              Color: <span className="text-xs uppercase font-semibold">{item.colour}</span>
                            </p>
                            <div className="flex">
                              <p className="mt-1 text-gray-600 text-sm line-through">${item.productPrice}.00 USD</p>
                              <p className="mt-1 text-red-500 text-sm ps-1 "> ${item.discountedPrice} USD </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="sm:relative md:absolute bg-white left-0 bottom-[-10px] bg-gray- w-full p-4">
                  <h2 className="text-[20px] uppercase  text-black sm:mt-4  md:pb-6">Order Summary</h2>
                  <div className="mt-2">
                    <h3 className="flex flex-wrap gap-4 text-base text-[#333] font-semibold">
                      Subtotal <span className="ml-auto">${total.toFixed(2)}</span>
                    </h3>
                    <h3 className="flex flex-wrap gap-4 text-base text-[#333] font-bold">
                      Taxes <span className="ml-auto">-</span>
                    </h3>
                    <h4 className="flex flex-wrap gap-4 text-base text-[#333] font-bold ">
                      Shipping <span className="ml-auto">-</span>
                    </h4>
                    <h3 className="flex flex-wrap gap-4 text-base text-red-500 font-bold mb-2">
                      Discount <span className="ml-auto">{state ? `$${state.discount.toFixed(2)}` : "-"}</span>
                    </h3>
                    <h2 className="flex flex-wrap gap-4 text-[20px] uppercase  text-black border-t-[2px]  border-black    pt-2">
                      Total <span className="ml-auto">${state ? (total - state.discount).toFixed(2) : total.toFixed(2)} USD</span>
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-8 md:hidden   ">
                  <button type="button" onClick={() => navigate(-1)} className="min-w-[100px] md:mx-0 mx-auto px-6 py-3.5 text-sm bg-gray-200 text-[#333] rounded-md hover:bg-gray-200">
                    Back
                  </button>
                  {addressId ? ( <button onClick={handleCheckout} type="button" className="min-w-[150px] md:mx-0 mx-auto px-6 py-3.5 text-sm bg-[#333] text-white rounded-md hover:bg-[#111]">
                    Confirm payment ${state ? (total - state.discount).toFixed(2) : total.toFixed(2)}
                  </button>) : ( <button  type="button" className="min-w-[150px] px-6 py-3.5 text-sm bg-[#333] text-white rounded-md hover:bg-[#111]">
                    Select Address
                  </button>)}
                 
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
