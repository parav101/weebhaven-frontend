import { useEffect, useState } from "react";
import axiosApiInstance from "../features/interceptor";
import NotAuthorizesPage from "../components/notAuthPage";

export default(props: any)=>{
    const[code,setCode]=useState(0)
    async function checkAdmin(){
       try {
        const res = await axiosApiInstance.get("http://localhost:3001/verify-admin");
        setCode(res.status)
       } catch (error:any) {
        setCode(error.response.status)
        console.log(error)
       }
    }
    useEffect(() => {
        checkAdmin();
      }, []);
      if(code == 200){
        return(props.Component)
      }else return (<NotAuthorizesPage></NotAuthorizesPage>)
}