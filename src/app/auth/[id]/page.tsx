'use client'

import { group, useUserContext, user, wall } from "@/context/VirtualContext";
import { ChangeEvent, JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import Image from "next/image";
import { AuthButton } from "@/components/Button/AuthButton";
import Link from "next/link";

import './authGroup.css'
import { useLogin } from "@/hooks/useLogin";
import { useRouter, useParams} from "next/navigation";
import { getData } from "@/functions/check-Mural/CheckMural";
import { useInforGroups } from "@/hooks/useInforGroups";

const AuthGroup = () =>{

    const [type, setType] = useState("");
    const [group, setGroup] = useState<group>();
    const [option, setOption] = useState<wall[]>()
    const [infor, setInfor] = useState<user>()
    const [checkValue, setCheckValue] = useState(false)
    const groups = useInforGroups({load:true})
    const router = useRouter()
    const params = useParams()
   

    const addnameWall = async (idUser:string, cod:string) => {
        console.log(idUser)
        console.log(cod)
        try {
          const response = await fetch('https://projeto-web-full-stack-pm-devs.onrender.com/members/'+idUser, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: idUser,
              code: cod
            }),
          });
      
          if (response.ok) {
            const newWall = await response.json();
            if(newWall === "Member created successfully."){
              router.push('/user/home-Group')
            }
          }else{
            if (response.status === 400) {
              setCheckValue(true)
            }
          }
        } catch (error) {
          setCheckValue(true)
        }
      };

    const handleChanges = {
        handleSelect: (e: ChangeEvent<HTMLSelectElement>) => {
          setType(e.target.value);
        },
      };

      useEffect(()=>{

        var valorRecuperado = localStorage.getItem("userData");
        if (valorRecuperado) {
          const userData = JSON.parse(valorRecuperado);
          setInfor(userData.data)
        }

        if (params) {
         
          if (Array.isArray(params.id)) {
            params.id.forEach((id) => {
              const murals = getData(id);
              
            });
          } else {
            const groupImg = groups.data.find((value)=> value.id === params.id)
            setGroup(groupImg)
            const murals = getData(params.id);
            
            murals.then(resultado => {
              setOption(resultado)
            })
          }
        }

        
      },[groups.data, params])


      const handleChange = () => {

        if(type && option && infor){
              const mu = option.find((value)=>value.category === type)
              const cod = `${group?.id!}!${mu?.id}`
                addnameWall(infor?.id!, cod)
            }
      }

    return (
        <main className="all-authGroup">
            
            <Image
                src={group?.imgGroup!}
                alt="Logo"
                className="img-authGroup"
                width={600}
                height={600}
                priority
                />

            <p className='text-authGroup'>Bem-Vindo<br/> ao grupo <strong>{group?.name}</strong></p>

            {(checkValue)?(
              <p className="text-Err">Você já está cadastrado em  <br />um mural desse grupo!</p>
            ):(
              <p></p>
            )}

            <form className="form-authGroup">
                <select
                    name="Iam"
                    id="select-Iam"
                    onChange={handleChanges.handleSelect}
                    value={type}
                    required
                >
                    <option className="opt-disabled">Selecione seu mural</option>
                    {option?.map((option, index)=>{
                    return <option key={index}>{option.category!}</option>
                    })}
                </select>
                <AuthButton authentication={handleChange} type='button' id='button-authGroup'>Entrar</AuthButton>
                <p className="authGroup">
                    <Link href={"/auth/codGroup"}>Voltar</Link>
                </p>
            </form>

        </main>
    )

}

export default AuthGroup