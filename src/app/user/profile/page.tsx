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
import { group, posts, useUserContext, user } from "@/context/VirtualContext";
import { useLogin } from "@/hooks/useLogin";
import { Checktoken } from "@/functions/check-token/Checktoken";
import { useInforGroups } from "@/hooks/useInforGroups";
import Link from "next/link";

const  Profile = () => {

    const [infor, setInfor] = useState<user>()
    const {data} = useLogin()
    const [controllll, setControllll] = useState(0)
    const [useGroup, setUseGroup] = useState<group>()
    const groups = useInforGroups()

    useEffect(()=>{

        if(controllll === 0){
            var valorRecuperado = localStorage.getItem("userData");
            if (valorRecuperado) {
            const userData = JSON.parse(valorRecuperado);
            setInfor(userData.data);
            
            if(userData.data?.isAdmin == true){
                if(groups.data.length !== 0){
                    const valueGroup = groups.data.find((value)=> value.userId == infor?.id)
                    setUseGroup(valueGroup)
                    setControllll(1)
                }
            }else{
                setControllll(1)
            }
            }
        }

    
    },[controllll, groups])

    return (
        

        <main className="all-perf">
            
            <Navbar ImageGroup={infor?.profile_image ||''}></Navbar>

            <section className="section-perfil">
                
            {(infor?.isAdmin == true)?(

                    <div className="mainPerf">
                        <section className="person">
                            <div>
                                <Image src={useGroup?.imgGroup || perfil} alt="imagem de perfil" className="img-profile" width={400} height={400}></Image>
                                 
                                 <Link href={"/user/edit-Profile"}> 
                                 <Image src={mudarPerfil} alt="perfil" className="change-profile" width={400} height={400}></Image>
                                 </Link>
                            </div>

                            <div>
                                <h1 className="user-name">{useGroup?.name}</h1>
                            </div>
                        </section>
                        <section className="person-data">
                            <p>Nome do criador:
                                <span className="data-item">{infor?.name}</span>
                            </p>
                            <p>Email:
                                <span className="data-item">{infor?.email}</span>
                            </p>
                            <p>ID do usuário:
                                <span className="data-item">{infor?.id}</span>
                            </p>

                            <p>Código do grupo:
                                <span className="data-item">{useGroup?.groupCode!}</span>
                            </p>

                            <p></p>

                        </section>
                    </div>

                ) : (

                    <div className="mainPerf">
                        <section className="person">
                            <div>
                                <Image src={infor?.profile_image || perfil} alt="imagem de perfil" className="img-profile" width={400} height={400}></Image>
                                <Link href={"/user/edit-Profile"}> 
                                <Image src={mudarPerfil} alt="perfil" className="change-profile" width={400} height={400}></Image>
                                </Link>
                            </div>

                            <div>
                                <h1 className="user-name">{infor?.username}</h1>
                            </div>
                        </section>
                        <section className="person-data">
                            <p>Nome:
                                <span className="data-item">{infor?.name}</span>
                            </p>
                            <p>Email:
                                <span className="data-item">{infor?.email}</span>
                            </p>
                            <p>ID:
                                <span className="data-item">{infor?.id}</span>
                            </p>

                            <p></p>

                        </section>
                    </div>

                )}
            </section>

        </main>
    )
  }
  export default Profile
