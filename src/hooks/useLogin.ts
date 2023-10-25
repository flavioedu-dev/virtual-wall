import { useEffect, useState } from "react"

  interface UserData {
  name: string,
  email: string,
  password: string,
  isAdmin: boolean,
  nameGroup: string,
  group: any[],
  id: number
  }

export const useLogin = () =>{

    const [data, setData] = useState<UserData[]>([])

    useEffect(()=>{
      async function getData(){
        const res = await fetch("http://localhost:3000/userAdm")
        const Data = await res.json()
        setData(Data)
        console.log("Data:")
   }    console.log(data)
      getData()
    },[])

    return{data}
}