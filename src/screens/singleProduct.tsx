import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart";

function ProductDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, ] = useSearchParams();
  const searchNameQuery = searchParams.get("name") || "";
  const [sizes, setSizes] = useState([]);
  const [colours, setColours] = useState<{}[]>([]);
  const [activeSize, setActiveSize] = useState("");
  const [activeColor, setActiveColor] = useState("");
  const [activeEntry, setActiveEntry] = useState<{
    id: string;
    productImage: string;
    productPrice: number;
    discountedPrice: number;
    Size: any;
    Colour: any;
  }>();
  const [product, setNewProduct] = useState<{
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
      id: string;
      productImage: string;
      productPrice: number;
      discountedPrice: number;
      Size: any;
      Colour: any;
    }[];
  }>(
    {} as {
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
        id: string;
        productImage: string;
        productPrice: number;
        discountedPrice: number;
        Size: any;
        Colour: any;
      }[];
    }
  );

  async function getNewProduct() {
    try {
      let response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/view-product/${searchNameQuery}`);
      setNewProduct(response.data.product);
      setActiveEntry(response.data.product.ProductEntries[0])
      setSizes(response.data.sizesAvl);
    } catch (error) {
      console.log(error);
    }
  }

  function handleSize( size: string, ) {
    setActiveSize(size);
    setActiveColor("")
    try {
      let colours = [
        { name: "Black", hex: "bg-black" },
        { name: "Gray", hex: "bg-gray-400" },
        { name: "Red", hex: "bg-red-600" },
      ];
      colours = [...colours.filter((colour) => product.ProductEntries.some((entry) => entry.Colour.colour_value == colour.name && entry.Size.size_value == size))];
      let newEntry = [...product.ProductEntries.filter((entry) => entry.Size.size_value == size)];
      setActiveEntry(newEntry[0])
      setColours(colours);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleColour( colour: string, ) {
    setActiveColor(colour);
    try {
      let newEntry = [...product.ProductEntries.filter((entry) =>( entry.Size.size_value == activeSize && entry.Colour.colour_value == colour))];
      setActiveEntry(newEntry[0])
      console.log(activeEntry)
    } catch (error) {}
  }

  function handleClick(id: string, image: string, name: string, price: number, quantity: number, discountedPrice: number) {
    console.log(activeColor);
    let currentProduct = { productId: id, productImage: image, productName: name, productPrice: price, quantity: quantity, discountedPrice: discountedPrice, productEntryId: activeEntry!.id, size: activeSize, colour: activeColor };
    dispatch(addItem(currentProduct));
  }

  function handleBuy(id: string, image: string, name: string, price: number, quantity: number, discountedPrice: number) {
    let currentProduct = { productId: id, productImage: image, productName: name, productPrice: price, quantity: quantity, discountedPrice: discountedPrice, productEntryId: activeEntry!.id, size: activeSize, colour: activeColor };
    dispatch(addItem(currentProduct));
    navigate("/checkout");
  }

  useEffect(() => {
    getNewProduct();
  }, []);

  return (
    <>
      {product.ProductEntries ? (
        <div className=" bg-gray-100/80">
          <div className="p-6 lg:max-w-7xl max-w-2xl max-lg:mx-auto relative  animate-slideIn">
            <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="w-full lg:sticky top-0 text-center">
                <div className="lg:h-[600px]">
                  <img src={activeEntry?.productImage} alt={product.id} className="lg:w-11/12 w-full h-full rounded-xl object-cover object-top hover:scale-105 transition-all" />
                </div>
              </div>
              <div>
                <div className="flex flex-wrap items-start ">
                  <div>
                    <h2 className="text-4xl  font-bold  text-gray-800 float-left">{product.productName} </h2>
                    <p className=" text-gray-600 mt-2 text-sm relative">{product.category}</p>
                  </div>
                </div>
                <hr className="my-4 border-0" />
                <div className="flex flex-wrap items-start">
                  <div>
                    <p className="text-gray-800  text-2xl font-bold">${activeEntry?.discountedPrice.toFixed(2)}</p>
                    <p className="text-gray-500   text-lg ">
                      <p className="line-through ">${activeEntry?.productPrice.toFixed(2)}</p> <span className="text-[11px] relative bottom-3">Tax included. Shipping calculated at checkout.</span>
                    </p>
                  </div>
                </div>
                <hr className="my-4 border-0" />
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Choose a size</h3>
                  <div className="flex flex-wrap gap-4 mt-4 relative  animate-slideIn">
                    {sizes.map((size: string) => {
                      return (
                        <button type="button" key={size} id={size} onClick={() => handleSize( size, )} className={activeSize === size ? "w-12 h-10 border-2 hover:opacity-70    font-bold text-sm rounded-xl flex items-center justify-center shrink-0 shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]" : "w-12 h-10 border-2 hover:opacity-70    font-bold text-sm rounded-xl flex items-center justify-center shrink-0"}>
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <hr className="my-4 border-0" />
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Choose a colour</h3>
                  <div className="flex flex-wrap gap-4 mt-4 relative  animate-slideIn">
                    {colours.map((colour: any) => {
                      return <div className="relative  animate-slideIn"><button type="button" key={colour.name} id={colour.name} onClick={() => handleColour( colour.name, )} className={activeColor === colour.name ? `w-12 h-10 ${colour.hex} border-2   hover:opacity-70   rounded-xl shrink-0 shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]` : `w-12 h-10 ${colour.hex} border-2  border-white hover:opacity-70 rounded-xl shrink-0`}></button></div>;
                    })}
                  </div>
                </div>
                <hr className="my-8 border-0" />
                {activeColor ? (
                  <div className="flex flex-wrap gap-4 relative  animate-slideIn">
                    <button type="button" onClick={() => handleBuy(product.id, activeEntry!.productImage, product.productName, activeEntry!.productPrice, 1, activeEntry!.discountedPrice)} className="min-w-[200px] px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white text-sm font-bold rounded">
                      Buy now
                    </button>
                    <button type="button" onClick={() => handleClick(product.id, activeEntry!.productImage, product.productName, activeEntry!.productPrice, 1, activeEntry!.discountedPrice)} className="min-w-[200px] px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-bold rounded">
                      Add to cart
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
            {/* <div className="mt-24 max-w-4xl ">
            <ul className="flex border-b  bg-gray-100/80">
              <li className="text-gray-800 font-bold text-sm bg-gray-100 py-3 px-8 border-b-2 border-gray-800 cursor-pointer transition-all">Description</li>
              <li className="text-gray-400 font-bold text-sm hover:bg-gray-100 py-3 px-8 cursor-pointer transition-all">Reviews</li>
            </ul>
            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-800">Product Description</h3>
              <p className="text-sm text-gray-500 mt-4">Elevate your casual style with our premium men's t-shirt. Crafted for comfort and designed with a modern fit, this versatile shirt is an essential addition to your wardrobe. The soft and breathable fabric ensures all-day comfort, making it perfect for everyday wear. Its classNameic crew neck and short sleeves offer a timeless look.</p>
            </div>
            <ul className="space-y-3 list-disc mt-6 pl-4 text-sm text-gray-400"></ul>
          </div> */}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ProductDetails;
