import { useState, useEffect } from "react";
import axiosApiInstance from "../features/interceptor";
import { SelectCustomAnimation } from "../components/select";
import Moment from "moment";
import { DialogSizes } from "../components/orderInfo";

function ManageOrders() {
    Moment.locale("en");
  const [id,setId] = useState("")
  const [orders, setNewOrders] = useState<
    {
      id: string;
      userId: string;
      totalItems: number;
      status: string;
      total: number;
      deleviryDate: Date;
      isPaid: boolean;
      createdAt: Date;
      updatedAt: Date;
      User: {username:string};
    }[]
  >();
  async function getOrders() {
    try {
      let response = await axiosApiInstance.get(`http://localhost:3001/view-allorders`);
      setNewOrders(response.data.allOrders);
    } catch (error) {}
  }
 

  function moreInfo(id: string): void {
    setId(id)
  }


  useEffect(() => {
    getOrders();
  }, []);


  return (
    <>
      <div className="container p-2 mx-auto sm:p-4 overflow-x-auto">
        <h2 className="mb-4 text-2xl font-semibold leading-tight">Orders</h2>
        <div className="">
          <table className="min-w-full text-xs">
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
              <col className="w-24" />
            </colgroup>
            <thead className="">
              <tr className="text-left">
                <th className="p-3">Uuid #</th>
                <th className="p-3">User</th>
                <th className="p-3">Order date</th>
                <th className="p-3">Expected delivery date</th>
                <th className="p-3 text-right">Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
      
            {orders?.map(order=>{
              
                return(
                    <tr className="bg-white border-b-[1px] ">
                    <td className="p-3">
                      <p className="flex gap-3" onClick={()=>moreInfo(order.id)}>{(order.id).toString().substring(0, 8)}
                      <DialogSizes id={id}/>
                      </p>
                    </td>
                    <td className="p-3">
                      <p>{order.User.username}</p>
                    </td>
                    <td className="p-3">
                      <p>{Moment(order.createdAt).format("d MMMM YYYY")}</p>
                      <p className="dark:text-gray-600">{Moment(order.createdAt).format("dddd")}</p>
                    </td>
                    <td className="p-3">
                      <p>{Moment(order.deleviryDate).add(10, 'd').format("d MMMM YYYY")}</p>
                      <p className="dark:text-gray-600">{Moment(order.createdAt).format("dddd")}</p>
                    </td>
                    <td className="p-3 text-right">
                      <p>${order.total.toFixed(2)}</p>
                    </td>
                    <td className="p-3 text-right">
                      <span className="px-3 py-1 font-semibold rounded-md ">
                        <span>
                          <SelectCustomAnimation status={order.status} orderId={order.id} getOrder={getOrders} />
                        </span>
                      </span>
                    </td>
                  </tr>
                )
            })}
            </tbody>
          </table>
          
        </div>
      </div>
    </>
  );
}

export default ManageOrders;
