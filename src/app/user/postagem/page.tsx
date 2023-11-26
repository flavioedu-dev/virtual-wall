"use client"

// Styles
import "./post.css"

// Hooks
import React, { useEffect, useState } from "react"

// Components
import Image from "next/image"
import Nav from "@/components/Nav/Navbar";

// Images
import perfil from "../../../../public/boysNew.png"
import edit from "../../../../public/cardapio.png"
import Navbar from "@/components/Nav/Navbar";
import { namewall, posts, useUserContext, user } from "@/context/VirtualContext";
import { useLogin } from "@/hooks/useLogin";
import ShowPosts from "@/components/showPost/showPost";
import lupa from "public/lupa.png";
import { Checktoken } from "@/functions/check-token/Checktoken";


const  Posts = () => {

    // const {handleNameChange, infor} = useUserContext()

    const [wallPost, setWallPost] = useState<posts[]>()
    const [uplupa, setUpLupa] = useState(true)
    const {data} = useLogin()
    const [infor, setInfor] = useState<user>()
    const [rotaNew, setRotaNew] = useState<namewall>()

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

    const cookies = document.cookie;
    var cookiesArray = cookies.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
        const cookie = cookiesArray[i].trim();
        if (cookie.startsWith(`${"rota"}=`)) {
          const rotaCookie = cookie.substring("rota".length + 1, cookie.length);
          const rotaObj = JSON.parse(rotaCookie);
          setRotaNew(rotaObj);
        }
    }

        const user = data.find((test) => test.group?.wall?.find((tes) => tes.nameWall == rotaNew?.namewall));
        const userWall = user?.group?.wall?.find((value)=> value.nameWall == rotaNew?.namewall)
        setWallPost(userWall?.postagens)
    }, [data, rotaNew?.namewall, setWallPost])

    const changeLupa = () =>{
        setUpLupa(false)
    }

    const changeLupaBlur = () =>{
        setTimeout(() => {
            setUpLupa(true)
        }, 1000);
    }

    return (
        <main className="mainPost">
            <section className="Post-section">
            <Navbar ImageGroup={infor?.imgUser || infor?.group?.imageGroup || ''}></Navbar>
            <div className="forPesq-Post">
                    <input type="text" className="pesq-Post" placeholder="Pesquisa" id="enter" onClick={changeLupa} onBlur={changeLupaBlur}/>
                    {(uplupa)?(
                        <Image
                        src={lupa}
                        alt="Logo-pesq-p"
                        className="img-pesq-post"
                        id="lupa"
                        width={20}
                    />
                    ):(
                        <p></p>
                    )}
                </div>
            <section className="posts-container-post">
            <>
            {wallPost?.map((item) => {
                if (item.idUserP == infor?.id) {
                    return <ShowPosts key={infor.id} img={infor.imgUser || infor.group?.imageGroup || perfil.src} name={infor.name} text={item.text!} doc={item.doc} video={item.video} imgPost={item.image} />;
                }
          })}
        </>
            </section>
            </section>
        </main>
    )
  }
  export default Posts