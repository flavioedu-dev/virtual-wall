"use client"

import Nav from '@/components/Nav/Navbar'
import './homeGroup.css'
import profile from "public/boys.png"
import { namewall, useUserContext, user } from '@/context/VirtualContext'
import { Key, useEffect, useState } from 'react'
import ShowWall from '@/components/createWall/ShowWall/ShowWall'
import { useRouter } from 'next/navigation'
import { useLogin } from '@/hooks/useLogin'
import { Checktoken } from '@/functions/check-token/Checktoken'

const HomeWall= () => {

    const [imgperfil, setImgPerfil] = useState("")
    const [dataUser, setDataUser] = useState<user>()
    // const {handleNameChange,} = useUserContext()
    const [rotaNew, setRotaNew] = useState<namewall>()
    const [infor, setInfor] = useState<user>()
    const {data} = useLogin()
    const router = useRouter()
    const [token, setToken] = useState("")

    useEffect(()=>{

        console.log(infor)

        const tokenCoo = document.cookie
        var cookiesArray = tokenCoo.split(';');
        for (var i = 0; i < cookiesArray.length; i++) {
        var cookie = cookiesArray[i].trim();
        if (cookie.indexOf("token" + "=") === 0) {
            let userCoo = cookie.substring("token".length + 1, cookie.length)
            setToken(userCoo)
            const userTo = Checktoken(userCoo)
            console.log(userTo)
            userTo.then((resultado) => {
            const userFound = data.find((value)=>value.id == resultado.user.userId)
            setInfor(userFound)
            
      }).catch((erro: any) => {
        
      });
        }
    }

    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${"rota"}=`)) {
            const rotaCookie = cookie.substring("rota".length + 1);
            const rotaObj = JSON.parse(rotaCookie);
            setRotaNew(rotaObj);
        }
    }

        if(infor?.isAdmmin == true){
            setImgPerfil(infor.group?.imageGroup!)
            setDataUser(infor)
        }else{
            setImgPerfil(infor?.imgUser || "")
            if(data){
                const user = data.find((test) =>  rotaNew?.codGroup == test.group?.codigo);
                setDataUser(user)
            }
        }
        
    },[data, infor, rotaNew?.codGroup])

    const handleWall = (nameWall:string) =>{
        const rota =  {
            namewall: nameWall,
            codGroup: rotaNew?.codGroup
        }
        document.cookie = `rota=${JSON.stringify(rota)}; token=${token}; path=/`;
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