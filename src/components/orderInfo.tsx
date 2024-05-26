import React from "react";
import { useState, useEffect } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Typography, Card } from "@material-tailwind/react";
import axiosApiInstance from "../features/interceptor";
import Moment from "moment";
export function DialogSizes(props: any) {
  Moment.locale("en");
  const [order, setNewOrder] = useState<{
    id: string;
    userId: string;
    totalItems: number;
    status: string;
    total: number;
    deleviryDate: null;
    isPaid: boolean;
    createdAt: string;
    updatedAt: string;
    OrderItems: {
      id : string;
      orderId :  string ;
      productId :  string ;
      productName :  string ;
      productImage : string ;
      productPrice : number;
      category :  string ;
      size :  string ;
      colour :  string;
      quantity : number;
      createdAt :  Date;
    }[];
    Address: {
      id: string;
      userId: string;
      name: string;
      company: string;
      phone: number;
      address: string;
      city: string;
      country: string;
      state: string;
      pincode: number;
      type: string;
      createdAt: Date;
      updatedAt: Date;
      UserId: string;
    };
  }>();
  async function getOrder() {
    try {
      if (props.id !== "") {
        let response = await axiosApiInstance.get(`${import.meta.env.VITE_APP_API_URL}/view-order/${props.id}`);
        setNewOrder(response.data.order);
      }
    } catch (error) {}
  }
  useEffect(() => {
    getOrder();
    console.log(props.id);
  }, [props.id]);

  function RenderIems(){
   if(order){
    if( order.OrderItems.length !== 0){
      console.log(order?.OrderItems.length)
      return( order.OrderItems.map((item, index) => {
        const isLast = index === order.OrderItems.length - 1;
        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
  
        return (
          <tr key={item.id}>
            <td className={classes}>
              <Typography variant="small" color="blue-gray" className="font-normal">
                {item.productName}
              </Typography>
            </td>
            <td className={`${classes} bg-blue-gray-50/50`}>
              <Typography variant="small" color="blue-gray" className="font-normal">
                {item.productImage}
              </Typography>
            </td>
            <td className={classes}>
              <Typography variant="small" color="blue-gray" className="font-normal">
                {item.productPrice}
              </Typography>
            </td>
            <td className={`${classes} bg-blue-gray-50/50`}>
              <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                {item.category}
              </Typography>
            </td>
            <td className={classes}>
              <Typography variant="small" color="blue-gray" className="font-normal">
                {item.size}
              </Typography>
            </td>
            <td className={`${classes} bg-blue-gray-50/50`}>
              <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
              {item.colour}
              </Typography>
            </td>
            <td className={classes}>
              <Typography variant="small" color="blue-gray" className="font-normal">
              {item.quantity}
              </Typography>
            </td>
            <td className={`${classes} bg-blue-gray-50/50`}>
              <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
              {item.colour}
              </Typography>
            </td>
          </tr>
        );
      }))
    }
   }
  }

  const TABLE_HEAD = ["Name", "imagelink", "price", "category", "Price", "size", "quantity", "colour"];

  const [size, setSize] = React.useState(null);

  const handleOpen = (value: any) => setSize(value);

  return (
    <>
      <button onClick={() => handleOpen("xxl")}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 hover:text-gray-400">
          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
        </svg>
      </button>
      <Dialog
        open={size === "xxl"}
        size={size || "md"}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="flex justify-center">Order Details</DialogHeader>

        <DialogBody>
          <div>
            <div className="flex justify-evenly">
              {order?.id? (<div className=" gap-[100px] flex flex-row flex-wrap md:flex-nowrap mx-40">
                <div className="bg-gray-50/70  border-[1px] w-[400px] h-[200px]  border-gray-300 px-4 py-8 md:px-8 rounded-md">
                  <div className="text-sm text-gray-800">
                    <Typography variant="lead" color="gray" className="font-normal leading-none flex justify-center ">
                      Order Info
                    </Typography>
                    <p className="mt-2">
                      OrderId:{order!.id} <br /> totalItems:{order!.totalItems} <br />Price: {order!.total}<br />Status:{order!.status}<br />OrderDate:{Moment(order.createdAt).format("DD MMMM YYYY")}<br />
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50/70  border-[1px] w-[400px] h-[200px]  border-gray-300 px-4 py-8 md:px-8 rounded-md">
                  <div className="text-sm text-gray-800">
                    <Typography variant="lead" color="gray" className="font-normal leading-none flex justify-center ">
                      Address Info
                    </Typography>
                    <p className="mt-2">
                    name:{order!.Address.name} <br /> phone:{order!.Address.phone} <br />address: {order!.Address.address}<br />city:{order!.Address.city}<br />pincode:{order!.Address.pincode}<br />
                    </p>
                  </div>
                </div>
              </div>):(null)}
            </div>
          </div>
          <div>
            <Typography variant="h4" color="black" className="flex justify-center mt-4 ">
              Order Items
            </Typography>
            <div>
              <Card className="h-full w-full overflow-auto">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                   <RenderIems></RenderIems>
                  </tbody>
                </table>
              </Card>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="mt-10">
          <Button variant="text" color="red" onClick={() => handleOpen(null)} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={() => handleOpen(null)}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
