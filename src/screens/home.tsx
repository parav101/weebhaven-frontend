// import { useState,useEffect } from 'react'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ImageSlider } from "../components/imageSlider";
import { addItem } from "../features/cart";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [featuredProducts, setNewfeaturedProducts] = useState<
    {
      id: string;
      productEntryId: string;
      productName: string;
      productDesc: string;
      orderIndex: number;
      category: string;
      isFeatured: boolean;
      createdAt: string;
      updatedAt: string;
      ProductEntries: {
        id:string;
        productImage: string;
        productPrice: number;
        discountedPrice: number;
        Size:any
        Colour:any
      }[];
    }[]
  >([]);

  async function getProducts() {
    try {
      let response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/view-featured-products`);
      setNewfeaturedProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  function handleClick(id: string, image: string, name: string, price: number, quantity: number, discountedPrice: number, productEntryId: string, size: string, colour: string) {
    let currentProduct = { productId: id, productImage: image, productName: name, productPrice: price, quantity: quantity, discountedPrice: discountedPrice, productEntryId: productEntryId, size: size, colour: colour };
    dispatch(addItem(currentProduct));
  }

  const Images = ["/anime1.jpg", "/anime2.jpg", "/anime4.jpg"];
  return (
    <>
      <div className="relative w-full top-1 border-t-gray-50 border-white border-separate border-t-4 border-2">
        <div className="relative h-56 overflow-hidden rounded-lg md:h-128  ">
          <ImageSlider imageUrls={Images}></ImageSlider>
        </div>
      </div>

      <div className="  text-center mt-4 my-4 md:my-10">
        <h1 className="mb-2 mt-0 text-3xl font-semibold leading-tight text-primary uppercase font-serif text-transparent bg-gradient-to-tr from-gray-800 to-gray-300 bg-clip-text ">Featured Products</h1>
        <div className="p-1 flex  flex-wrap items-center justify-center">
          {/* product card */}
          <div className="relative m-6 max-w-xs gap-12 md:flex-row flex flex-col items-center justify-center">
            {featuredProducts.map((product) => {
              return (
                <div className="container">
                  <div className="max-w-[300px] w-full m-6  bg-gray-300 border-r-2 border-b-2 border-black shadow-lg rounded-xl p-6 hover:bg-gray-200/70 transition-all duration-300 ease-in-out">
                    <div className="flex flex-col ">
                      <div className="relative h-62 w-full mb-3 hover:scale-105 before:transition-transform duration-300 ease-in-out">
                        <div className="absolute flex flex-col top-0 right-0 p-3">
                          <button className="transition ease-in duration-300 bg-gray-900  hover:text-purple-300 shadow hover:shadow-md text-gray-500 rounded-full w-8 h-8 text-center p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                        </div>
                        <img src={import.meta.env.VITE_APP_API_URL+"/images/"+product.ProductEntries[0].productImage} alt={product.productName} className=" object-cover w-[250px] h-[250px] rounded-2xl " />
                      </div>
                      <div className="flex-auto justify-evenly" onClick={() => navigate(`/product/?name=${product.productName}`)}>
                        <div className=" justify-center inline-flex ">
                          <h2 className="text-lg mr-auto cursor-pointer text-gray-700 hover:text-gray-500 truncate ">{product.productName}</h2>
                          <span className="inline-flex items-center bg-transparent text-gray-800 text-xs border-2 border-black px-2 ml-3 rounded-lg uppercase ">{product.category}</span>
                        </div>
                        <div className="text-lg text-black  mt-1">${product.ProductEntries[0].productPrice.toFixed(2)}</div>
                        <div className="text-xl text-black font-semibold mt-1"><span className="text-lg font-thin line-through pe-2">${product.ProductEntries[0].productPrice.toFixed(2)}</span>${product.ProductEntries[0].discountedPrice.toFixed(2)}</div>
                        
                        <div className="lg:flex justify-center gap-8 py-4  text-sm text-gray-600">
                          <p className="  text-gray-600 text-sm">
                            Size: <span className="text-xs font-semibold">{product.ProductEntries[0].Size.size_value}</span>
                          </p>
                          <p className=" text-gray-600 text-sm">
                            Color: <span className="text-xs uppercase font-semibold">{product.ProductEntries[0].Colour.colour_value}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 text-sm font-medium justify-start">
                      <button onClick={() => handleClick(product.id, product.ProductEntries[0].productImage, product.productName, product.ProductEntries[0].productPrice, 1, product.ProductEntries[0].discountedPrice, product.ProductEntries[0].id, product.ProductEntries[0].Size.size_value, product.ProductEntries[0].Colour.colour_value)} className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-gray-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-gray-600 ">
                        <span>Add Cart</span>
                      </button>
                      <button className="transition ease-in duration-300 bg-gray-700 hover:bg-gray-800 border hover:border-gray-500 border-gray-700 hover:text-white  hover:shadow-lg text-gray-400 rounded-full w-9 h-9 text-center p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <h1 className="mb-2 mt-0 text-3xl font-semibold leading-tight my-4 md:my-10 text-primary uppercase font-serif text-transparent bg-gradient-to-tr from-gray-800 to-gray-300 bg-clip-text ">Categories</h1>
        {/* categories */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className=" max-w-2xl py-4  md:max-w-none md:py-8">
            <div className="mt-2 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              <div className="group relative">
                <div className="relative h-72 w-full overflow-hidden rounded-lg bg-white  sm:aspect-w-2  lg:aspect-w-1 group-hover:opacity-75 ">
                  <img src="/shirts.jpg" alt="" className="h-full w-full object-cover object-center" />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <p onClick={() => navigate(`/shop/?category=Shirt`)}>
                    <span className="absolute inset-0"></span>
                    Weeb Haven Shirts
                  </p>
                </h3>
                <p className="text-base font-semibold text-gray-900">Shirts</p>
              </div>
              <div className="group relative">
                <div className="relative h-72 w-full overflow-hidden rounded-lg bg-white  sm:aspect-w-2  lg:aspect-w-1 group-hover:opacity-75 ">
                  <img src="/hoodies.jpg" alt="Collection of four insulated travel bottles on wooden shelf." className="h-full w-full object-cover object-center" />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <p onClick={() => navigate(`/shop/?category=Hoodie`)}>
                    <span className="absolute inset-0"></span>
                    Weeb Haven Hoodies
                  </p>
                </h3>
                <p className="text-base font-semibold text-gray-900">Hoodies</p>
              </div>
              <div className="group relative">
                <div className="relative h-72 w-full overflow-hidden rounded-lg bg-white  sm:aspect-w-2  lg:aspect-w-1 group-hover:opacity-75 ">
                  <img src="/figures.png" alt="Collection of four insulated travel bottles on wooden shelf." className="h-full w-full object-cover object-center" />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <p onClick={() => navigate(`/shop/?category=Figurines`)}>
                    <span className="absolute inset-0"></span>
                    Weeb Haven Figurines
                  </p>
                </h3>
                <p className="text-base font-semibold text-gray-900">Figurines</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
