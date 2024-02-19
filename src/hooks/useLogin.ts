import { user } from "@/context/VirtualContext";
import { useEffect, useState } from "react"

export const useLogin = () =>{

    const [data, setData] = useState<user[]>([])

    useEffect(()=>{
      async function getData(){
        const response = await fetch("https://projeto-web-full-stack-pm-devs-production-727d.up.railway.app/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
        const Data = await response.json()
        setData(Data)
   }  
      getData()
    },[])

  return{data}
  }

