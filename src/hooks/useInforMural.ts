import { wall } from "@/context/VirtualContext";
import { useEffect, useState } from "react"

type useInforPostProps ={
  load: boolean;
}

export const useInforMural = ({load}:useInforPostProps) =>{

  const [data, setData] = useState<wall[]>([]);

  const getData = async () => {
    try {
      const response = await fetch('http://localhost:8000/murals', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
   (async () => await getData())(); 
  },[load]); 
  
  return { data };
  }