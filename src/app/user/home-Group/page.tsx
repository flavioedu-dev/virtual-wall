"use client"

import Nav from '@/components/Nav/Navbar'
import '../home-Wall/homeGroup.css'
import perfil from "public/perfil.png"
import { namewall, useUserContext, user } from '@/context/VirtualContext'
import { useLogin } from '@/hooks/useLogin'
import { Key, useEffect, useState } from 'react'
import C from '@/components/createWall/ShowWall/ShowWall'
import { useRouter } from 'next/navigation'
import { log } from 'console'
import ShowWall from '@/components/createWall/ShowWall/ShowWall'
import { Checktoken } from '@/functions/check-token/Checktoken'

const HomeGroup = () =>{

    const [imgperfil, setImgPerfil] = useState("")
    // const {handleNameChange, infor} = useUserContext()
    const [codGroup, setCodGroup] = useState("")
    const {data} = useLogin()
    const router = useRouter()
    const [infor, setInfor] = useState<user>()
    const [token, setToken] = useState<string>()

    useEffect(()=>{


        const tokenCoo = document.cookie
        var cookiesArray = tokenCoo.split(';');
        for (var i = 0; i < cookiesArray.length; i++) {
        var cookie = cookiesArray[i].trim();
        if (cookie.indexOf("token" + "=") === 0) {
            let userCoo = cookie.substring("token".length + 1, cookie.length)
            setToken(userCoo)
            const userTo = Checktoken(userCoo)
            userTo.then((resultado) => {
            const userFound = data.find((value)=>value.id == resultado.user.userId)
            setInfor(userFound)
      }).catch((erro: any) => {
        
      });
        }
    }

        if(infor?.isAdmin == true){
            setImgPerfil(infor.group?.imageGroup!)
        }else{
            setImgPerfil(infor?.imgUser || "")
            const user = data.find((test) =>  infor?.nameWall?.find((tes) => test.group?.codigo === tes.codGroup ));
        }
    }, [infor?.isAdmmin, infor?.group?.imageGroup, infor?.imgUser, infor?.nameWall, data])

    const handleWall = (codGroup:string) =>{
        const rota = {
            namewall: "",
            codGroup: codGroup
        }
        
        document.cookie = `rota=${JSON.stringify(rota)}; token=${token} path=/;`
        console.log(document.cookie)
        router.push('/user/home-Wall')
    }

    const handleWallSelect = () =>{
        router.push('/auth/codGroup')
    }

    return(
        <main className='all-inf-show-wall'>
            <Nav ImageGroup={imgperfil||''}/>
            
            <section className='inforGroup'>
            <div className='inforGroup-text'>
            <p>GRUPOS</p>
            </div>
            <div className='inforGroup-wall'>
                <>
                {data
                    .filter((value) =>
                    infor?.nameWall?.some((valueUser) => value.group?.codigo === valueUser.codGroup)
                )
                .map((filteredValue) => (
                    <ShowWall functCod={handleWall} key={filteredValue.group?.codigo} name={filteredValue.group?.nameGroup!} img={filteredValue.group?.imageGroup!} codGroup={filteredValue.group?.codigo}/>
                ))}

                    <ShowWall functCod={handleWallSelect}  name={"Adicionar grupo"} img={perfil.src}/>
                
                    
                </>
            </div>
            </section>
        </main>
    )
}

export default HomeGroup