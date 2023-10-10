"use client"

// Styles
import "./post.css"

// Hooks
import React from "react"

// Components
import Image from "next/image"
import Nav from "@/components/Nav/Navbar";

// Images
import perfil from "../../../../public/boysNew.png"
import edit from "../../../../public/cardapio.png"



const  Posts = () => {
    return (
        <main>
            <Nav></Nav>
            <section className="posts-container">
                <div className="post">
                    <div className="post-div">
                        <div>
                            <Image src={perfil} alt="imagem de perfil" className="imgP"></Image>
                            <span>RuanLauro</span>
                        </div>
                        <span className="date-post">3h</span>
                        <Image src={edit} alt="editar postagem" className="edit"></Image>
                    </div>
                    <div>
                        <p className="text-post">Amanhã não haverá aula na turma de 3º de ADS!</p>
                    </div>
                </div>
                <div className="post">
                    <div className="post-div">
                        <div>
                            <Image src={perfil} alt="imagem de perfil" className="imgP"></Image>
                            <span>RuanLauro</span>
                        </div>
                        <span className="date-post">10h</span>
                        <Image src={edit} alt="editar postagem" className="edit"></Image>
                    </div>
                    <div>
                        <p className="text-post">Amanhã vai ter um jogo na quadra as 18h, quem quiser participar é só comparecer
                        na quadra, mas com os vestimentos corretas e no horário previsto ao jogo! Qualquer coisa é só entrar em contato
                        com algum dos organizadores.</p>
                    </div>
                </div>
            </section>
        </main>
    )
  }
  export default Posts