'use client'

import { group, useUserContext, user, wall } from "@/context/VirtualContext";
import { ChangeEvent, JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import Image from "next/image";
import { AuthButton } from "@/components/Button/AuthButton";
import Link from "next/link";

import './authGroup.css'
import { useLogin } from "@/hooks/useLogin";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

const AuthGroup = () =>{

    const [type, setType] = useState("");
    const {infor, handleNameChange} = useUserContext()
    const [group, setGroup] = useState<group>();
    const [option, setOption] = useState<wall[]>()

    const router = useRouter()

    const {data} = useLogin()

    const addnameWall = async (idUser:string, namewall:string, codGroup:string) => {
        try {
          const response = await fetch('http://localhost:4000/namewall', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              idUser,
              namewall,
              codGroup,
            }),
          });
      
          if (response.ok) {
            const newWall = await response.json();
            console.log(newWall)
          } else {
            
            console.error('Erro ao adicionar namewall:', response.status);
          }
        } catch (error) {
          console.error('Erro de rede:', error);
        }
      };

    const handleChanges = {
        handleSelect: (e: ChangeEvent<HTMLSelectElement>) => {
          setType(e.target.value);
        },
      };

      useEffect(()=>{
        if(infor){
            infor?.nameWall?.map((item)=>{

                const user = data.find((test) => test.group?.codigo === item.codGroup);
                setGroup(user?.group)
                setOption(user?.group?.wall)
            
              })
        }
      })


      const handleChange = () => {

        if(infor){
            infor.nameWall?.map((item)=>{
                const namewall = {
                    namewall: type,
                    codGroup: item.codGroup,
                }
                
                item = namewall
                addnameWall(infor.id!, type, item.codGroup)
            })
            
            handleNameChange(infor)
            router.push('/user/home-Group')
            
        }

      }

    return (
        <main className="all-authGroup">
            
            <Image
                src={group?.imageGroup!}
                alt="Logo"
                className="img-authGroup"
                width={600}
                height={600}
                />

            <p className='text-authGroup'>Bem-Vindo<br/> ao grupo {infor?.group?.nameGroup}</p>

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
                    return <option key={index}>{option.nameWall}</option>
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