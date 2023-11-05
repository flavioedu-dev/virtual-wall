import { user } from "@/context/VirtualContext";
import { useEffect, useState } from "react"

export const useLogin = () =>{

    const [data, setData] = useState<user[]>([])

    useEffect(()=>{
      async function getData(){
        const response = await fetch("http://localhost:4000", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
        const Data = await response.json()
        const DataV = Data.userAdm
        setData(DataV)
   }  
      getData()
    },[])

  return{data}
  }

