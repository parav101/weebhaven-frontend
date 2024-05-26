import { useState, useEffect } from "react";
import axiosApiInstance from "../features/interceptor";
import axios from "axios";
import { useLocation } from "react-router-dom";

function UpdateProdcut() {
  const {state} = useLocation();
  const [oldProductName, setoldProductName] = useState("")
  const [oldLength, setOldLength] = useState(0)
  const [product, setNewProduct] = useState<{
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
      qty: number;
      inStock: boolean;
      Size: string;
        Colour: string;
    }[];
  }>(
    {ProductEntries: [{
      id: "string",
      productImage: "string",
      productPrice: 0,
      discountedPrice: 0,
      qty: 0,
      inStock: false,
      Size: "string",
        Colour: "string",
    }]} as {
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
        qty: number;
        inStock: boolean;
        Size: string;
        Colour: string;
      }[];
    }
  );
  async function getProducts() {
    try {
      let response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/view-product/${state.name}`);
      setoldProductName(response.data.product.productName)
      setOldLength(response.data.product.ProductEntries.length)
      let data = [...response.data.product.ProductEntries,];
      data.map((entry:any)=>{
        entry.Colour = entry.Colour.colour_value
        entry.Size = entry.Size.size_value
      })
      console.log(data)
      setNewProduct(response.data.product);

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);

  function handleChange(event: any): void {
    if (event.target.type !== "checkbox") {
      setNewProduct((currentProduct) => ({
        ...currentProduct,
        [event.target.name]: event.target.value,
      }));
    } else {
      setNewProduct((currentProduct) => ({
        ...currentProduct,
        [event.target.name]: event.target.checked,
      }));
    }
  }
  
  function handleEntries (index: number, event: any): void {
    
    let data: any = [...product.ProductEntries,];
    if (event.target.type !== "checkbox") {
      if(event.target.name == "Size"){
        data[index]["Size"] ={}
        data[index]['Size']['size_value'] = event.target.value;
      }else if(event.target.name == "Colour"){
        data[index]["Colour"] ={}
        data[index]["Colour"]["colour_value"] =event.target.value
      }
      data[index][event.target.name] = event.target.value;
    } else {
      data[index][event.target.name] = event.target.checked;
    }
    setNewProduct((currentProduct) => ({
      ...currentProduct,
      ProductEntries: data,
    }));
  }

  async function handleImage(e: React.FormEvent<HTMLInputElement>, index: number) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    try {
      // console.log(target.files)
      // if(!files) throw Error("something wrong")
      if (target.files[0]) {
        const formdata = new FormData();
        formdata.append("file", target.files[0]);
        const res = await axiosApiInstance.post(`${import.meta.env.VITE_APP_API_URL}/add-image`, formdata);
        let entry: any = [...product.ProductEntries];
        entry[index].productImage = res.data.url;
        setNewProduct((currentProduct) => ({
          ...currentProduct,
          ProductEntries: entry,
        }));
      }
    } catch (error) {}
  }

  // const [newProductEntries, setProductEntries] = useState<
  //   {
  //     productPrice: number;
  //     productImage: string;
  //     discountedPrice: number;
  //     Size: string;
  //     Colour: string;
  //     inStock: boolean;
  //     qty: number;
  //   }[]
  // >([]);

  function addEntry() {
    let newEntry = {
      productPrice: 0,
      productImage: "",
      discountedPrice: 0,
      Size: "S",
      Colour: "Black",
      inStock: true,
      qty: 0,
    };
    let data: any = [...product.ProductEntries,];
    data =[...data, newEntry];
    setNewProduct((currentProduct) => ({
      ...currentProduct,
      ProductEntries: data,
    }));
    
  }

  async function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    const newProductEntries = product.ProductEntries.splice(oldLength ,(product.ProductEntries.length - oldLength ))
       await axiosApiInstance.post(`${import.meta.env.VITE_APP_API_URL}/update-product`, {
        oldProductName:oldProductName,
        productName: product.productName,
        productDesc: product.productDesc,
        category: product.category,
        isFeatured: product.isFeatured,
        productEntries: product.ProductEntries,
        newProductEntries:newProductEntries
      });
    }
    
    // console.log(product);
  

  return (
    <>
   
        <section className="max-w-4xl p-6 mx-auto bg-gray-100 rounded-md shadow-md  mt-20">
          <h1 className="text-xl font-bold text-gray-800 capitalize ">Product Details</h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-gray-800 " htmlFor="productName">
                  Name
                </label>
                <input id="productName" name="productName" value={product.productName} onChange={handleChange} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-gray-500  focus:outline-none focus:ring-gray-300" />
              </div>
              <div>
                <label className="text-gray-800 " htmlFor="passwordConfirmation">
                  Product Description
                </label>
                <textarea id="textarea" name="productDesc" value={product.productDesc} onChange={handleChange} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-gray-500  focus:outline-none focus:ring-gray-300"></textarea>
              </div>
              <div>
                <label className="text-gray-800 " htmlFor="category">
                  Category
                </label>
                <select name="category" id="category" value={product.category} onChange={handleChange} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-gray-500  focus:outline-none focus:ring-gray-300">
                  <option value="Shirt">Shirt</option>
                  <option value="Hoodie">Hoodie</option>
                  <option value="Figurine">Figurine</option>
                </select>
              </div>
              <div className="mt-10 mb-10">
                <label htmlFor="isFeatured" className="inline-flex items-center cursor-pointer ms-0">
                  Featured Product
                  <input id="isFeatured" type="checkbox" checked={product.isFeatured} name="isFeatured" onChange={handleChange} className="sr-only peer " />
                  <div className="ms-3 relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-gray-600"></div>
                </label>
              </div>
              {/* {product.ProductEntries.length !== 0 ? (null): (null)} */}
              {product?.ProductEntries.map((entry, index) => {
                return (
                  <>
                    <h1 className="text-xl font-bold text-gray-800 capitalize ">
                      Product Entry <span className="text-[11px] font-light">#{index + 1} Entry</span>
                    </h1>
                    <div className="">
                      <label className="text-gray-800 " htmlFor={`price${index + 1}`}>
                        Price
                      </label>
                      <input id={`price${index + 1}`} name="productPrice" type="number" value={entry.productPrice} onChange={(e) => handleEntries(index, e)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-gray-500  focus:outline-none focus:ring-gray-300" />
                    </div>
                    <div>
                      <label className="text-gray-800 " htmlFor={`dicount${index + 1}`}>
                        Discounted Price
                      </label>
                      <input id={`dicount${index + 1}`} name="discountedPrice" type="number" value={entry.discountedPrice} onChange={(e) => handleEntries(index, e)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-gray-500  focus:outline-none focus:ring-gray-300" />
                    </div>
                    <div>
                      <label className="text-gray-800 " htmlFor={`size${index + 1}`}>
                        Size
                      </label>
                      <select id={`size${index + 1}`} name="Size" value={entry.Size} onChange={(e) => handleEntries(index, e)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-gray-500  focus:outline-none focus:ring-gray-300">
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                      </select>
                    </div>{" "}
                    <div>
                      <label className="text-gray-800 " htmlFor={`colour${index + 1}`}>
                        Colour
                      </label>
                      <select id={`colour${index + 1}`} name="Colour" value={entry.Colour} onChange={(e) => handleEntries(index, e)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-gray-500  focus:outline-none focus:ring-gray-300">
                        <option value="Black">Black</option>
                        <option value="Gray">Gray</option>
                        <option value="Red">Red</option>
                      </select>
                    </div>
                    <div className="">
                      <br />
                      <label className="text-gray-800" htmlFor={`ProductEntryQuantity${index + 1}`}>
                        Quantity
                      </label>
                      <input id={`ProductEntryQuantity${index + 1}`} type="number" name="qty" value={entry.qty} onChange={(e) => handleEntries(index, e)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-gray-500  focus:outline-none focus:ring-gray-300" />
                    </div>
                    <div className="mb-10">
                      <label htmlFor={`image${index + 1}`} className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 ">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 ">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 ">PNG or JPG </p>

                          {entry.productImage == "" ? null : <p className="text-xs text-gray-500 ">{entry.productImage} </p>}
                        </div>
                        <input id={`image${index + 1}`} type="file" accept="image/*" name="productImage" onChange={(e) => handleImage(e, index)} className="hidden" />
                      </label>
                    </div>
                    <label htmlFor={`inStock${index + 1}`} className="inline-flex items-center cursor-pointer ms-0 ">
                      In Stock
                      <input id={`inStock${index + 1}`} type="checkbox"  checked={entry.inStock} name="inStock" onChange={(e) => handleEntries(index, e)} className="sr-only peer " />
                      <div className="ms-3 relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-gray-600"></div>
                    </label>
                  </>
                );
              })}
              {/* {newProductEntries?.map((entry, index) => {
                return (
                  <>
                    <h1 className="text-xl font-bold text-gray-800 capitalize ">
                      Product Entry <span className="text-[11px] font-light">#{index + 1 + product.ProductEntries.length} Entry</span>
                    </h1>
                    <div className="">
                      <label className="text-gray-800 " htmlFor={`price${index + 1}`}>
                        Price
                      </label>
                      <input id={`price${index + 1}`} name="productPrice" type="number" value={entry.productPrice} onChange={(e) => handleEntries(index, e)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-gray-500  focus:outline-none focus:ring-gray-300" />
                    </div>
                    <div>
                      <label className="text-gray-800 " htmlFor={`dicount${index + 1}`}>
                        Discounted Price
                      </label>
                      <input id={`dicount${index + 1}`} name="discountedPrice" type="number" value={entry.discountedPrice} onChange={(e) => handleEntries(index, e)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-gray-500  focus:outline-none focus:ring-gray-300" />
                    </div>
                    <div>
                      <label className="text-gray-800 " htmlFor={`size${index + 1}`}>
                        Size
                      </label>
                      <select id={`size${index + 1}`} name="Size" value={entry.Size} onChange={(e) => handleEntries(index, e)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-gray-500  focus:outline-none focus:ring-gray-300">
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                      </select>
                    </div>{" "}
                    <div>
                      <label className="text-gray-800 " htmlFor={`colour${index + 1}`}>
                        Colour
                      </label>
                      <select id={`colour${index + 1}`} name="Colour" value={entry.Colour} onChange={(e) => handleEntries(index, e)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-gray-500  focus:outline-none focus:ring-gray-300">
                        <option value="Black">Black</option>
                        <option value="Gray">Gray</option>
                        <option value="Red">Red</option>
                      </select>
                    </div>
                    <div className="">
                      <br />
                      <label className="text-gray-800" htmlFor={`ProductEntryQuantity${index + 1}`}>
                        Quantity
                      </label>
                      <input id={`ProductEntryQuantity${index + 1}`} type="number" name="qty" value={entry.qty} onChange={(e) => handleEntries(index, e)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-gray-500  focus:outline-none focus:ring-gray-300" />
                    </div>
                    <div className="mb-10">
                      <label htmlFor={`image${index + 1}`} className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 ">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 ">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 ">PNG or JPG </p>

                          {entry.productImage == "" ? null : <p className="text-xs text-gray-500 ">{entry.productImage} </p>}
                        </div>
                        <input id={`image${index + 1}`} type="file" accept="image/*" name="productImage" onChange={(e) => handleImage(e, index)} className="hidden" />
                      </label>
                    </div>
                    <label htmlFor={`inStock${index + 1}`} className="inline-flex items-center cursor-pointer ms-0 ">
                      In Stock
                      <input id={`inStock${index + 1}`} type="checkbox"  checked={entry.inStock} name="inStock" onChange={(e) => handleEntries(index, e)} className="sr-only peer " />
                      <div className="ms-3 relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-gray-600"></div>
                    </label>
                  </>
                );
              })} */}
            </div>

            <div className="flex justify-between mt-6">
              <button type="button" onClick={addEntry} className="relative px-6 py-2 overflow-hidden font-medium text-gray-600 bg-gray-200 border border-gray-100 rounded-lg shadow-inner group">
                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease leading-5 inline-flex">Add Product Entry</span>
              </button>
              <button type="submit" className="relative px-6 py-2 overflow-hidden font-medium text-gray-600 bg-gray-200 border border-gray-100 rounded-lg shadow-inner group">
                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease leading-5 inline-flex">Save</span>
              </button>
            </div>
          </form>
        </section>
 
    </>
  );
}

export default UpdateProdcut;
