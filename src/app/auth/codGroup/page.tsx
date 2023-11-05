"use client"
import { AuthButton } from '@/components/Button/AuthButton'
import './codGroup.css'
import { ChangeEvent, useEffect, useState } from 'react'
import Image from "next/image";

// Images
import logoImg from "public/Logo.png";

//imports
import Link from 'next/link';
import { useLogin } from '@/hooks/useLogin';
import { useUserContext, user } from '@/context/VirtualContext';
import { useRouter } from 'next/navigation';

const CodGroup =  () =>{

    const router = useRouter()

    const [cod, setCod] = useState("")
    const [groupInfo, setGroupInfo] = useState<user>()
    const [showError, setShowError] = useState(false);

    const {data} = useLogin()

    const {infor, handleNameChange} = useUserContext()

    const handleChange = () => {
        const user = data.find((test) => test.group.codigo === cod);
        if(user && user !== undefined){
            setGroupInfo(user)
        }else{
            setShowError(true)
        }
    }

    useEffect(()=>{
        if(groupInfo){
           handleNameChange(groupInfo)
           router.push('/auth/register')
        }
    })

    const handleChanges = {
        handleCod: (e: ChangeEvent<HTMLInputElement>) => {
          setCod(e.currentTarget.value);
        },
    }

    return(
        <main className='all-group'>
             <div className="logo_login">
                <Image
                src={logoImg}
                alt="Logo"
                className="img-cod"
                width={270}
                style={{ objectFit: "contain" }}
                />
            </div>
            <p className={showError ? "Erro" : "hidden"}>Grupo não cadastrado</p>
            <p className='text-cod'>Insira o código do seu mural. <br/> Para que você entre na sala correta</p>
            <form className='form-group'>
                    <input 
                    type="text" 
                    placeholder='Código' 
                    className='Cod'
                    onChange={handleChanges.handleCod}
                    value={cod} 
                    required
                />
                <AuthButton authentication={handleChange} type='button' id='button-cod'>Entrar</AuthButton>
                <p className="auth">
                    <Link href={"/auth/registerAdm"}>Cadastre-se</Link>
                </p>
            </form>
           
        </main>
    )

}

export default CodGroup