import { useContext, useEffect, useState } from "react";
import { UserData, useLogin } from "./useLogin"
import { VirtualContext} from "@/context/VirtualContext";
import { useRouter } from "next/navigation";
import Infor from "@/components/Home/Home_infor/Infor";

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
    const router = useRouter()

    // const {data} = useLogin()
    const [teste, setTeste] = useState<UserData | null>()

    const {handleInforChange} = useContext(VirtualContext)

    useEffect(()=>{
        // console.log("Atualizado")
        // console.log(data)
        const {data} = useLogin()
        setTeste(data)
    },[])

    const authenticationE = (value:use) =>{
        console.log("Normal")
        console.log(teste)
    };

    return {authenticationE}

} 