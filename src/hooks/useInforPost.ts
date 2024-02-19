import { posts, wall } from "@/context/VirtualContext";
import { useEffect, useState } from "react";

type useInforPostProps ={
  load: boolean
}

export const useInforPost = ({load}: useInforPostProps) => {
  const [data, setData] = useState<posts[]>([]);

  const getData = async () => {
    try {
      const response = await fetch('https://projeto-web-full-stack-pm-devs-production-727d.up.railway.app/posts', {
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
};
