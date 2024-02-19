import { wall } from "@/context/VirtualContext";
import { useEffect, useState } from "react"

export const useInforMural = () =>{

    const [data, setData] = useState<wall[]>([])

    useEffect(()=>{
      async function getData(){
        const response = await fetch("https://projeto-web-full-stack-pm-devs-production-727d.up.railway.app/murals", {
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