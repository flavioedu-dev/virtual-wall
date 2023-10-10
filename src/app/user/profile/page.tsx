"use client"

// Styles
import "./profile.css"

// Hooks
import React from "react"

// Components
import Image from "next/image"
import Nav from "@/components/Nav/Navbar";

// Images
import mudarPerfil from "../../../../public/change-profile.png";
import perfil from "../../../../public/boysNew.png"



const  Profile = () => {
    return (
        <main>
            <Nav></Nav>
            <div className="All">
            <div className="main">
                <section className="person">
                    <div>
                        <Image src={perfil} alt="imagem de perfil" className="img-profile"></Image>
                        <Image src={mudarPerfil} alt="perfil" className="change-profile"></Image>
                    </div>

                    <div>
                        <h1 className="user-name">RuanLauro</h1>
                    </div>
                </section>
                <section className="person-data">
                    <p>Nome:
                        <span className="data-item">Ruan Lauro Cardoso da Silva Monteiro</span>
                    </p>
                    <p>Email:
                        <span className="data-item">capic.2022118tads0170@aluno.ifpi.edu.br</span>
                    </p>
                    <p>Número:
                        <span className="data-item">(89)988268259</span>
                    </p>
                    <p>Postagens:
                        <span className="data-item"> 2</span>
                    </p>
                </section>
            </div>
            </div>
        </main>
    )
  }
  export default Profile
