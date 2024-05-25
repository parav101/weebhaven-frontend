import { useState } from "react";
import axiosApiInstance from "../features/interceptor";


function AddProduct() {
  const [product, setNewProduct] = useState({
    productName: "",
    productDesc: "",
    // orderIndex: number;
    category: "Shirt",
    isFeatured: false,
    ProductEntryPrice: 0,
    ProductEntryImage: "",
    ProductEntryDiscountedPrice: 0,
    ProductEntrySize: "S",
    ProductEntryColour: "Black",
    ProductEntryInStock: true,
    ProductEntryQuantity: 0,
  });
  const [productEntries, setNewProductEntries] = useState([
    {
      ProductEntryPrice: 0,
      ProductEntryImage: "",
      ProductEntryDiscountedPrice: 0,
      ProductEntrySize: "S",
      ProductEntryColour: "Black",
      ProductEntryInStock: true,
      ProductEntryQuantity: 0,
    },
  ]);
  const [files, setFiles] = useState<File[] | undefined>([]);

  function handleChange(event: any) {
    const name = event.target.name;
    const value = event.target.value;
    setNewProduct((currentProduct) => ({
      ...currentProduct,
      [name]: value,
    }));
  }
  function handleCheck(event: any) {
    const name = event.target.name;
    setNewProduct((currentProduct) => ({
      ...currentProduct,
      [name]: event.target.checked,
    }));
  }

  function handleImage(e: React.FormEvent<HTMLInputElement> ,index:number) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    try {
        if(!files) throw Error("something wrong")
        if (target.files[0]) {
          let data=[...files!]
          data[index] = target.files[0]
          setFiles(data)
          let entry: any = [...productEntries];
          entry[index].ProductEntryImage = target.files[0].name;
          setNewProductEntries(entry)
        }
    } catch (error) {
      
    }
  }

  function handleEntries(index: number, event: any) {
    let data: any = [...productEntries];
    data[index][event.target.name] = event.target.value;
    setNewProductEntries(data);
  }

  function handleEntryCheck(index:number,event: any) {
    console.log(index)
    let data: any = [...productEntries];
    data[index][event.target.name] = event.target.checked;
    setNewProductEntries(data);
  }

  function addEntry() {
    let newEntry = {
      ProductEntryPrice: 0,
      ProductEntryImage: "",
      ProductEntryDiscountedPrice: 0,
      ProductEntrySize: "S",
      ProductEntryColour: "Black",
      ProductEntryInStock: true,
      ProductEntryQuantity: 0,
    };

    setNewProductEntries([...productEntries, newEntry]);
  }

  async function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    if (typeof files !== "undefined") {
      console.log(files);
      const formdata = new FormData();
      files.map((file)=>{
        formdata.append("file", file);
      })
      const res = await axiosApiInstance.post("http://localhost:3001/add-images", formdata);
      let data = [...productEntries]
      data.map((entry,index)=>{
        entry.ProductEntryImage = res.data.urls[index]
      })
      setNewProductEntries(data)
       await axiosApiInstance.post("http://localhost:3001/add-product", {
        productName: product.productName,
        productDesc: product.productDesc,
        category: product.category,
        isFeatured: product.isFeatured,
        productEntries:productEntries
      });
    }
    try {
    } catch (error) {
      console.log(error);
    }
    // console.log(product);
  }

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
                <input id="isFeatured" type="checkbox" checked={product.isFeatured} name="isFeatured" onChange={handleCheck} className="sr-only peer " />
                <div className="ms-3 relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-gray-600"></div>
              </label>
            </div>
      
            {productEntries.map((entry, index) => {
              return (
                <>
                  <h1 className="text-xl font-bold text-gray-800 capitalize ">
                    Product Entry <span className="text-[11px] font-light">#{index + 1} Entry</span>
                  </h1>
                  <div className="">
                    <label className="text-gray-800 " htmlFor={`price${index+1}`}>
                      Price
                    </label>
                    <input id={`price${index+1}`} name="ProductEntryPrice" type="number" value={entry.ProductEntryPrice} onChange={(e) => handleEntries(index, e)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-gray-500  focus:outline-none focus:ring-gray-300" />
                  </div>
                  <div>
                    <label className="text-gray-800 " htmlFor={`dicount${index+1}`}>
                      Discounted Price
                    </label>
                    <input id={`dicount${index+1}`} name="ProductEntryDiscountedPrice" type="number" value={entry.ProductEntryDiscountedPrice} onChange={(e) => handleEntries(index, e)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-gray-500  focus:outline-none focus:ring-gray-300" />
                  </div>
                  <div>
                    <label className="text-gray-800 " htmlFor={`size${index+1}`}>
                      Size
                    </label>
                    <select id={`size${index+1}`} name="ProductEntrySize" value={entry.ProductEntrySize} onChange={(e) => handleEntries(index, e)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-gray-500  focus:outline-none focus:ring-gray-300">
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>{" "}
                  <div>
                    <label className="text-gray-800 " htmlFor={`colour${index+1}`}>
                      Colour
                    </label>
                    <select id={`colour${index+1}`} name="ProductEntryColour" value={entry.ProductEntryColour} onChange={(e) => handleEntries(index, e)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-gray-500  focus:outline-none focus:ring-gray-300">
                      <option value="Black">Black</option>
                      <option value="Gray">Gray</option>
                      <option value="Red">Red</option>
                    </select>
                  </div>
                  <div className="">
                    <br />
                    <label className="text-gray-800" htmlFor={`ProductEntryQuantity${index+1}`}>
                      Quantity
                    </label>
                    <input id={`ProductEntryQuantity${index+1}`} type="number" name="ProductEntryQuantity" value={entry.ProductEntryQuantity} onChange={(e) => handleEntries(index, e)} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-gray-500  focus:outline-none focus:ring-gray-300" />
                  </div>
                  <div className="mb-10">
                    <label htmlFor={`image${index+1}`} className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 ">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 ">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 ">PNG or JPG </p>

                        {entry.ProductEntryImage == "" ? null : <p className="text-xs text-gray-500 ">{entry.ProductEntryImage} </p>}
                      </div>
                      <input id={`image${index+1}`} type="file" accept="image/*" name="ProductEntryImage" onChange={(e)=>handleImage(e,index)} className="hidden" />
                    </label>
                  </div>
                  <label htmlFor={`inStock${index+1}`} className="inline-flex items-center cursor-pointer ms-0 ">
                    In Stock
                    <input id={`inStock${index+1}`} type="checkbox" accept="image/png,image/jpeg" checked={entry.ProductEntryInStock} name="ProductEntryInStock" onChange={(e) => handleEntryCheck(index,e)} className="sr-only peer " />
                    <div className="ms-3 relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-gray-600"></div>
                  </label>
                </>
              );
            })}
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

export default AddProduct;
