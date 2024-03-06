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
import { group, useUserContext, user } from '@/context/VirtualContext';
import { useRouter } from 'next/navigation';
import { Checktoken } from '@/functions/check-token/Checktoken';
import { useInforGroups } from '@/hooks/useInforGroups';
import { useInforMembers } from '@/hooks/useInforMember';

const CodGroup =  () =>{

    const router = useRouter()
    const [cod, setCod] = useState("")
    const [groupInfo, setGroupInfo] = useState<group>()
    const [showError, setShowError] = useState(false);
    const [checkVali, setCheckVali] = useState(false)
    const [infor, setInfor] = useState<user>()
    const [control, setControl] = useState(0)
    const [controlOne, setControlOne] = useState(0)
    const [controlTwo, setControlTwo] = useState(0)
    const member = useInforMembers({load:true})
    
    // const {infor, handleNameChange} = useUserContext()
    const data = useInforGroups({load:true})

    const handleChange = () => {
        const num = parseInt(cod, 10)
        console.log(num)
        const user = data.data.find((test) => test.groupCode === num);
        if(user && user !== undefined){
            setGroupInfo(user)
        }else{
            setShowError(true)
        }
    }

    useEffect(()=>{
        if(control === 0){
            var valorRecuperado = localStorage.getItem("userData");
        if (valorRecuperado) {
          const userData = JSON.parse(valorRecuperado);
          setInfor(userData.data)
          setControl(1)
        }
        }

        if(controlOne === 0){
            if(infor){
                const memb = member.data.find((value)=> value.userId == infor.id)
                if(memb && memb !== undefined){
                    setCheckVali(true)
                    setControlOne(1)
                }
            }
        }

        if(controlTwo === 0){
            if(groupInfo){
                router.push(`/auth/${groupInfo.id}`)
                setControlTwo(1)
            }
        }
    },[control, controlOne, controlTwo, groupInfo, infor, member.data, router])

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
                {(checkVali)?(
                    
                    <p className="auth">
                    <Link href={"/user/home-Group"}>Voltar</Link>
                    </p>

                ):(
                    <p className="auth">
                    <Link href={"/auth/registerAdm"}>Cadastre-se</Link>
                    </p>
                    
                )}
            </form>
           
        </main>
    )

}

export default CodGroup