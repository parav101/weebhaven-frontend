import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import animationData from "../components/empty.json";
import LabeledValuesSlider from "../components/slider";
import Lottie from "lottie-react";
function Shop() {
  const navigate = useNavigate();
  const [value, setValue] = useState(40); //using it for price value filter
  const [searchParams] = useSearchParams();
  const searchNameQuery = searchParams.get("name") || "";
  const searchCategoryQuery = searchParams.get("category") || "";
  let sizeRange = ["S", "M", "L", "XL"];
  let availability = ["in stock", "out of stock"];
  let category = ["Shirt", "Hoodie", "Figurine", "Poster"];
  let [sizeFilter, setSizeFilter] = useState<string[]>([]);
  let [availabilityFilter, setAvailabilityFilter] = useState<string[]>([]);
  let [categoryFilter, setCategoryFilter] = useState<string[]>([]);
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

  let [backupProducts, setBackupProducts] = useState<
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
  const [dropdowns, setDropdowns] = useState([
    { key: "size", isOpen: false },
    { key: "price", isOpen: false },
    { key: "availability", isOpen: false },
    { key: "category", isOpen: false },
  ]);

  async function getProducts() {
    try {
      let response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/view-products`);
      setNewProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  }

  function handleDropdown(key: string) {
    setDropdowns((currentDropdown) => {
      return currentDropdown.map((dropdown) => {
        if (dropdown.key === key) {
          if (dropdown.isOpen === false) {
            return { ...dropdown, isOpen: true };
          }
          return { ...dropdown, isOpen: false };
        } else return { ...dropdown };
      });
    });
  }

  let filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (searchNameQuery !== "") return product.productName.toLowerCase().includes(searchNameQuery.toLowerCase());
      else return product.category.toLowerCase().includes(searchCategoryQuery.toLowerCase());
    });
  }, [products, searchNameQuery, searchCategoryQuery]);

  useEffect(() => {
    getProducts();
  }, []);

  // function handleClick(id: string, image: string, name: string, price: number, quantity: number, category: string) {
  //   let currentProduct = { productId: id, productImage: image, productName: name, productPrice: price, quantity: quantity, category: category };
  //   dispatch(addItem(currentProduct));
  // }

  const handleSizeChange = (value: string, flag: boolean) => {
    if (flag) sizeFilter = [...sizeFilter, value];
    else {
      const index = sizeFilter.indexOf(value);
      if (index > -1) sizeFilter.splice(index, 1);
    }
    setSizeFilter([...sizeFilter]);
  };
  const handleAvailabilityChange = (value: string, flag: boolean) => {
    if (flag) availabilityFilter = [...availabilityFilter, value];
    else {
      const index = availabilityFilter.indexOf(value);
      if (index > -1) availabilityFilter.splice(index, 1);
    }
    setAvailabilityFilter([...availabilityFilter]);
  };

  const handleCategoryChange = (value: string, flag: boolean) => {
    if (flag) categoryFilter = [...categoryFilter, value];
    else {
      const index = categoryFilter.indexOf(value);
      if (index > -1) categoryFilter.splice(index, 1);
    }
    setCategoryFilter([...categoryFilter]);
  };

  useMemo(() => {
    backupProducts = [...filteredProducts];
    if (sizeFilter.length) {
      backupProducts = [...backupProducts.filter((item) => sizeFilter.some((size) => item.ProductEntries.some((entry: any) => entry.Size.size_value == size)))];
    }
    if (value !== 0) {
      backupProducts = [...backupProducts.filter((item) => item.ProductEntries.some((entry: any) => entry.discountedPrice <= value))];
    }
    if (availabilityFilter.length) {
      backupProducts = [...backupProducts.filter((item) => availabilityFilter.some((availability) => (availability == "in stock" ? item.ProductEntries.some((entry: any) => entry.qty > 0) : item.ProductEntries.some((entry: any) => entry.qty == 0) || !item.ProductEntries.length)))];
    }
    if (categoryFilter.length) {
      backupProducts = [...backupProducts.filter((item) => categoryFilter.some((category) => item.category == category))];
    }
    setBackupProducts([...backupProducts]);
  }, [sizeFilter, availabilityFilter, value, products, categoryFilter,products, searchNameQuery, searchCategoryQuery]);

  return (
    <>
      <div className=" bg-gray-100/80 md:overflow-x-auto  ">
        <div className="md:block flex text-center p-8">
          <h1 className="mb-4 text-3xl font-semibold text-gray-900 md:text-4xl ">{backupProducts.length === 0 ? (<span></span>):(<span>Availabile Products</span>)}</h1>
        </div>
        
        <div className="flex-row md:flex   mx-auto  w-full">
          <div className="  md:h-screen md:max-w-[300px]  me-5 md:w-full lg:sticky   ">
            <ul className=" p-4  ps-8 text-gray-500">
              <div className="flex gap-2 border-gray-400   border-b-[1px] pt-4 pb-4 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6  my-auto hover:text-gray-700">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" />
                </svg>
                <li className="mr-auto">Filter By</li>
              </div>
              <div className="border-gray-400   border-b-[1px] pt-4 pb-4 w-full">
                <div className="flex transition-all" onClick={() => handleDropdown("size")}>
                  <li className="  hover:underline cursor-default hover:text-gray-700 underline-offset-2">Size</li>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 ml-auto my-auto hover:text-gray-700">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
                {dropdowns[0].isOpen ? (
                  <ul className="pt-4 relative animate-slideIn  group-focus-within:block list-none">
                    {sizeRange.map((size, index) => {
                      return (
                        <li className="py-2 flex items-center hover:underline cursor-default hover:text-gray-700 underline-offset-2">
                          <input id={`size${index + 1}`} type="checkbox" name="size" onChange={(value) => handleSizeChange(size, value.target.checked)} className="w-4 h-4 text-gray-500  rounded focus:ring-transparent " />
                          <label htmlFor={`size${index + 1}`} className="ms-4 text-[15px]   ">
                            {size}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
              <div className="border-gray-400   border-b-[1px] pt-4 pb-4 w-full">
                <div className="flex " onClick={() => handleDropdown("price")}>
                  <li className="  hover:underline cursor-default hover:text-gray-700 underline-offset-2">Max price</li>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 ml-auto my-auto hover:text-gray-700">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
                {dropdowns[1].isOpen ? (
                  <div className="relative  animate-slideIn ">
                    <LabeledValuesSlider setValue={setValue} value={value} />
                  </div>
                ) : null}
              </div>
              <div className="border-gray-400   border-b-[1px] pt-4 pb-4 w-full">
                <div className="flex transition-all" onClick={() => handleDropdown("availability")}>
                  <li className="  hover:underline cursor-default hover:text-gray-700 underline-offset-2">Availability</li>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 ml-auto my-auto hover:text-gray-700">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
                {dropdowns[2].isOpen ? (
                  <ul className="pt-4 relative animate-slideIn  group-focus-within:block list-none">
                    {availability.map((availability, index) => {
                      return (
                        <li className="py-2 flex items-center hover:underline cursor-default hover:text-gray-700 underline-offset-2">
                          <input id={`availability${index + 1}`} type="checkbox" name="availability" onChange={(value) => handleAvailabilityChange(availability, value.target.checked)} className="w-4 h-4 text-gray-500  rounded focus:ring-transparent " />
                          <label htmlFor={`availability${index + 1}`} className="ms-4 text-[15px]   ">
                            {availability}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
              <div className="border-gray-400   border-b-[1px] pt-4 pb-4 w-full">
                <div className="flex transition-all" onClick={() => handleDropdown("category")}>
                  <li className="  hover:underline cursor-default hover:text-gray-700 underline-offset-2">Category</li>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 ml-auto my-auto hover:text-gray-700">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
                {dropdowns[3].isOpen ? (
                  <ul className="pt-4 relative animate-slideIn  group-focus-within:block list-none">
                    {category.map((category, index) => {
                      return (
                        <li className="py-2 flex items-center hover:underline cursor-default hover:text-gray-700 underline-offset-2">
                          <input id={`category${index + 1}`} type="checkbox" name="category" onChange={(value) => handleCategoryChange(category, value.target.checked)} className="w-4 h-4 text-gray-500  rounded focus:ring-transparent " />
                          <label htmlFor={`category${index + 1}`} className="ms-4 text-[15px]   ">
                            {category}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
            </ul>
          </div>
          {backupProducts.length === 0 ? (
              <div className="max-w-[350px] mx-auto flex justify-center">
                <div className="text-center space-y-4">
                  <Lottie animationData={animationData} />
                  <h1 className="text-2xl font-bold">No Products Found</h1>
                  <p>You can try diffrent product...</p>
                 
                </div>
              </div>
            ) : null}
          <section id="Projects" className="ms-4 gap-x-2 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center relative  animate-slideIn mt-1 mb-2">
            {backupProducts.map((product) => {
              return (
                <div className="relative mx-[30px] flex w-full h-[400px] max-w-[260px] flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md transition-all duration-200 ease-in-out hover:shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]">
                  <div className="relative flex h-[250px] overflow-hidden rounded-xl ">
                    <img className="object-cover  h-full w-full" src={import.meta.env.VITE_APP_API_URL+"/images/"+product.ProductEntries[0].productImage} alt={product.ProductEntries[0].productImage} onClick={() => navigate(`/product/?name=${product.productName}`)} />
                    <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">{product.ProductEntries.length === 0 ? "Out of Stock" : "In Stock"}</span>
                  </div>
                  <div className="mt-4 px-5 pb-5">
                    <h5 onClick={() => navigate(`/product/?name=${product.productName}`)} className="text-[16px] font-bold tracking-tight text-slate-900 hover:text-gray-700 cursor-default hover:underline underline-offset-2">
                      {product.productName}
                    </h5>
                    <div className="mt-2 mb-5 flex items-center ">
                      <span className="text-[15px] text-slate-900 line-through pe-4">${product.ProductEntries[0].productPrice.toFixed(2)}</span>
                      <span className="text-[17px] font-bold text-slate-900">${product.ProductEntries[0].discountedPrice.toFixed(2)}</span>
                    </div>
                    <button onClick={() => navigate(`/product/?name=${product.productName}`)} className="flex items-center justify-center rounded-md w-full bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white bg-gray-800 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300">
                      {/* <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg> */}
                      Check it out
                    </button>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      </div>
    </>
  );
}

export default Shop;
