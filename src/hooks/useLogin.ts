import { useEffect, useState } from "react"

export interface UserData {
    userAdm: {
      name: string;
      email: string;
      password: string;
      isAdmin: boolean;
      id: number;
      nameGroup:string,
      group:object,
    }[];
  }

export const useLogin = ():{data: UserData | null}=>{

    const [data, setData] = useState<UserData|null>(null)

    useEffect(()=>{
      async function getData(){
        const res = await fetch("http://localhost:3000/userAdm")
        const data = await res.json()
        console.log(data)
        setData(data)
   }
      getData()
    },[])

    return{data}
}