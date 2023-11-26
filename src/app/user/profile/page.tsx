"use client"

// Styles
import "./profile.css"

// Hooks
import React, { useEffect, useState } from "react"

// Components
import Image from "next/image"
import Nav from "@/components/Nav/Navbar";

// Images
import mudarPerfil from "../../../../public/change-profile.png";
import perfil from 'public/perfil.png'
import Navbar from "@/components/Nav/Navbar";
import { posts, useUserContext, user } from "@/context/VirtualContext";
import { useLogin } from "@/hooks/useLogin";
import { Checktoken } from "@/functions/check-token/Checktoken";

const  Profile = () => {

    // const {handleNameChange, infor} = useUserContext()
    const [cont, setCont] = useState(0)
    const [postAnalise, setPostAnalise ] = useState<posts[]>([])
    const [infor, setInfor] = useState<user>()
    const {data} = useLogin()

    useEffect(()=>{
        const tokenCoo = document.cookie
        var cookiesArray = tokenCoo.split(';');
        for (var i = 0; i < cookiesArray.length; i++) {
        var cookie = cookiesArray[i].trim();
        if (cookie.indexOf("token" + "=") === 0) {
            let userCoo = cookie.substring("token".length + 1, cookie.length)
            const userTo = Checktoken(userCoo)
            userTo.then((resultado) => {
            const userFound = data.find((value)=>value.id == resultado.user.userId)
            setInfor(userFound)
      }).catch((erro: any) => {
        
      });
        }
    }
    },[data])

    return (
        <main className="all-perf">
            <Navbar ImageGroup={infor?.imgUser || infor?.group?.imageGroup || ''}></Navbar>
            <div className="mainPerf">
                <section className="person">
                    <div>
                        <Image src={infor?.imgUser! || infor?.group?.imageGroup! || perfil} alt="imagem de perfil" className="img-profile" width={400} height={400}></Image>
                        <Image src={mudarPerfil} alt="perfil" className="change-profile" width={400} height={400}></Image>
                    </div>

                    <div>
                        {(infor?.isAdmmin == true)?(
                            <h1 className="user-name">{infor?.group?.nameGroup}</h1>
                        ):(
                            <h1 className="user-name">{infor?.name}</h1>
                        )}
                    </div>
                </section>
                <section className="person-data">
                    <p>Nome:
                        <span className="data-item">{infor?.name|| infor?.group?.nameGroup}</span>
                    </p>
                    <p>Email:
                        <span className="data-item">{infor?.email}</span>
                    </p>
                    
                </section>
            </div>
        </main>
    )
  }
  export default Profile
