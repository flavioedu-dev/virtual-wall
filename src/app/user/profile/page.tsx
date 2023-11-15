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

const  Profile = () => {

    const {handleNameChange, infor} = useUserContext()
    const [cont, setCont] = useState(0)
    const [postAnalise, setPostAnalise ] = useState<posts[]>([])

    const {data} = useLogin()

    useEffect(()=>{
        
    },[])

    return (
        <main>
            <Navbar ImageGroup={infor?.imgUser || infor?.group?.imageGroup || ''}></Navbar>
            <div className="All">
            <div className="main">
                <section className="person">
                    <div>
                        <Image src={infor?.imgUser! || infor?.group?.imageGroup! || perfil} alt="imagem de perfil" className="img-profile"></Image>
                        <Image src={mudarPerfil} alt="perfil" className="change-profile"></Image>
                    </div>

                    <div>
                        <h1 className="user-name">{infor?.name}</h1>
                    </div>
                </section>
                <section className="person-data">
                    <p>Nome:
                        <span className="data-item">{infor?.name}</span>
                    </p>
                    <p>Email:
                        <span className="data-item">{infor?.email}</span>
                    </p>
                    <p>Postagens:
                        <span className="data-item"> {cont}</span>
                    </p>
                </section>
            </div>
            </div>
        </main>
    )
  }
  export default Profile
