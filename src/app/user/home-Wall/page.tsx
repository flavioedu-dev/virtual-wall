"use client"

import Nav from '@/components/Nav/Navbar'
import './homeGroup.css'
import profile from "public/boys.png"
import { useUserContext, user } from '@/context/VirtualContext'
import { Key, useEffect, useState } from 'react'
import ShowWall from '@/components/createWall/ShowWall/ShowWall'
import { useRouter } from 'next/navigation'
import { useLogin } from '@/hooks/useLogin'

const HomeWall= () => {

    const [imgperfil, setImgPerfil] = useState("")
    const [dataUser, setDataUser] = useState<user>()
    const {handleNameChange, infor} = useUserContext()
    const [codGroup, setCodGroup] = useState("")

    const {data} = useLogin()
    const router = useRouter()

    useEffect(()=>{
        if(infor?.isAdmmin == true){
            setImgPerfil(infor.group?.imageGroup!)
            setDataUser(infor)
        }else{
            setImgPerfil(infor?.imgUser || "")
            if(data){
                const user = data.find((test) =>  infor?.rota?.codGroup == test.group?.codigo);
                setDataUser(user)
            }
        }
        
    },[infor, handleNameChange, data])

    const handleWall = (nameWall:string) =>{
        const updatedUser = {
            ...infor!,
            rota: {
                namewall: nameWall,
                codGroup: infor?.rota?.codGroup
            }
        };
        handleNameChange(updatedUser);
        router.push('/user/home')
    }

    return(
        <main className='all-inf-show-wall'>
            <Nav ImageGroup={imgperfil||''}/>
            
            <section className='inforGroup'>
            <div className='inforGroup-text'>
            <p>MURAIS</p>
            </div>
            <div className='inforGroup-wall'>
            {dataUser?.group?.wall?.map((item) => (
                <ShowWall funct={handleWall} key={item.idwall} name={item.nameWall!} img={item.imgwall!} />
            ))}
            </div>
            </section>
        </main>
    )
}

export default HomeWall