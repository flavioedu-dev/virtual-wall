"use client"

import Nav from '@/components/Nav/Navbar'
import './homeGroup.css'
import profile from "public/boys.png"
import { useUserContext, user } from '@/context/VirtualContext'
import { useLogin } from '@/hooks/useLogin'
import { Key, useEffect, useState } from 'react'
import ShowWall from '@/components/createWall/ShowWall/ShowWall'

const HomeGroup= () => {

    const [imgperfil, setImgPerfil] = useState("")
    const[nameWall, setNameWall] = useState("")
    const [dataUser, setDataUser] = useState<user>()

    const {handleNameChange, infor} = useUserContext()

    const {data} = useLogin()

    useEffect(()=>{
        if(infor?.isAdmmin == true){
            setImgPerfil(infor.group?.imageGroup || '')
            setDataUser(infor)
        }else{
            setImgPerfil(infor?.imgUser || "")
            const user = data.find((test) => test.group?.codigo === infor?.codGroup);
            setDataUser(user)
        }
    })

    const handleWall = (nameWall:string) =>{
        setNameWall(nameWall)
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
                item.idwall && item.nameWall && item.imgwall ? (
                    <ShowWall funct={handleWall} key={item.idwall} name={item.nameWall} img={item.imgwall} />
                ) : null
            ))}
            </div>
            </section>
        </main>
    )
}

export default HomeGroup 