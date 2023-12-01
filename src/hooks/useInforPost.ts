import { posts, wall } from "@/context/VirtualContext";
import { useEffect, useState } from "react"

export const useInforPost = () =>{

    const [data, setData] = useState<posts[]>([])

    useEffect(()=>{
      async function getData(){
        const response = await fetch("https://projeto-web-full-stack-pm-devs-production.up.railway.app/posts", {
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