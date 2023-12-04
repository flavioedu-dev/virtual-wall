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
import Navbar from "@/components/Nav/Navbar";
import { namewall, posts, useUserContext, user } from "@/context/VirtualContext";
import ShowPosts from "@/components/ShowPost/ShowPost";
import lupa from "public/lupa.png";
import { useInforPost } from "@/hooks/useInforPost";



const  Posts = () => {

    // const {handleNameChange, infor} = useUserContext()

    const [wallPost, setWallPost] = useState<posts[]>([])
    const [uplupa, setUpLupa] = useState(true)
    const [infor, setInfor] = useState<user>()
    const [controlllll, setControlllll] = useState(0)
    const dataPost = useInforPost()

    const updateWallPost = (dataPost: posts[], infor: user | undefined) => {
        if (dataPost.length !== 0 && infor !== undefined && infor) {
          const optionIdsSet = new Set(wallPost.map(item => item.memberId));
      
          dataPost.forEach(value => {
            if (value.memberId === infor.id) {
              if (!optionIdsSet.has(value.memberId)) {
                setWallPost(prevList => [...prevList, value]);
              }
            }
          });
        }
      };

    useEffect(()=>{

        if(controlllll === 0){
            var valorRecuperado = localStorage.getItem("userData");
            if (valorRecuperado) {
            const userData = JSON.parse(valorRecuperado);
            setInfor(userData.data);
            setControlllll(1)
            }
        }

        updateWallPost(dataPost.data, infor);


        

    }, [dataPost.data, infor])

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
            <Navbar ImageGroup={infor?.profile_image || ''}></Navbar>
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
            {wallPost.map((item) => (
                 <ShowPosts key={item.id} img={infor?.profile_image|| perfil.src} name={infor?.name!} text={item.content!} media={item.media} id={item.id} />
            )
            )}
        </>
            </section>
            </section>
        </main>
    )
  }
  export default Posts