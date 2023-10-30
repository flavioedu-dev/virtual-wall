import { useEffect, useState } from "react"

export interface wall {
  nameWall: string;
  imgwall: string;
  postagens: any[];
}

export interface group {
  [x: string]: any;
  nameGroup?: string,
  imageGroup?: string,
  wall?:wall[],
  codigo?: string
}

export interface user{
  name: string,
  email: string,
  password: string,
  confirmPassword?: string,
  isAdmmin: boolean,
  group: group,
  id?: number
}

export const useLogin = () =>{

    const [data, setData] = useState<user[]>([])

    useEffect(()=>{
      async function getData(){
        const res = await fetch("http://localhost:3000/userAdm")
        const Data = await res.json()
        setData(Data)
   }  
      getData()
    },[])

    return{data}
}