import { useContext, useEffect, useState } from "react";
import { useLogin } from "./useLogin"
import { VirtualContext} from "@/context/VirtualContext";
import { useRouter } from "next/navigation";

interface FormUse{
    name: string;
    email: string;
    password: string;
    isAdmmin?: boolean,
    nameGroup:string,
    group:object,
    id: number
}

interface use{
    email: string;
    password: string;
}

export const useEnter = ()=>{
    
    const {data} = useLogin()

    const authenticationE = (value: use) => {
      
    if (data !== undefined && data !== null) {
        const user = data.find((test) => test.email === value.email && test.password === value.password);
        
        if (user) {
          console.log("Passou");
          return user;
        }
      }
  
      console.log("Não passou");
      return null;
  };

    return {authenticationE}

} 
