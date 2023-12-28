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
import { group, namewall, posts, useUserContext, user } from "@/context/VirtualContext";
import ShowPosts from "@/components/ShowPost/ShowPost";
import lupa from "public/lupa.png";
import { useInforPost } from "@/hooks/useInforPost";
import { useInforGroups } from "@/hooks/useInforGroups";
import SeePost from "@/components/SeePost/SeePost";



const  Posts = () => {

    // const {handleNameChange, infor} = useUserContext()

    const [wallPost, setWallPost] = useState<posts[]>([])
    const [uplupa, setUpLupa] = useState(true)
    const [infor, setInfor] = useState<user>()
    const [group, setGroup] = useState<group>()
    const [controlllll, setControlllll] = useState(0)
    const dataPost = useInforPost({load: true})
    const dataGroup = useInforGroups()
    const [seePost, setSeePost] = useState(false)
    const [postSelection, setPostSelection] = useState<posts>()

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
            
            if(userData.data.isAdmin == true){
                const groupMatch = dataGroup.data.find((item)=>item.userId == userData.data.id)
                console.log(groupMatch)
                if(groupMatch && groupMatch !== undefined){
                    setGroup(groupMatch)
                    setControlllll(1)
                }
            }else{
                setControlllll(1)
            }
            
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

    const handleSelection = (id:string) =>{
        
        if(id){
            const postElement = dataPost.data.find((value)=>value.id === id)
            if(postElement && postElement !== undefined){
              console.log("Passou aqui!")
              setSeePost(true)
              setPostSelection(postElement)
            }
          }
    }

    return (
        <main className="mainPost">
            <section className="Post-section">
            <Navbar ImageGroup={infor?.profile_image || ''}></Navbar>
            {(seePost)?(    
              <div className="seePost-showpost">
                  <SeePost post={postSelection!}/>
                  <p className="exit-post" onClick={()=>{
                    setSeePost(false)
                  }}>Exit</p>
              </div>
          ):null}
            <div className="forPesq-Post">
                    <input type="text" className="pesq-Post" placeholder="Pesquisa" id="enter" onClick={changeLupa} onBlur={changeLupaBlur}/>
                    {/* {(uplupa)?(
                        <Image
                        src={lupa}
                        alt="Logo-pesq-p"
                        className="img-pesq-post"
                        id="lupa"
                        width={20}
                    />
                    ):(
                        <p></p>
                    )} */}
                </div>
            <section className="posts-container-post">
            <>
            {wallPost.slice().reverse().map((item) => (

                <>
                     {(infor?.isAdmin == true)?(
                    <ShowPosts key={item.id} img={group?.imgGroup|| perfil.src} name={group?.name!} text={item.content!} media={item.media} id={item.id} funct={handleSelection} idUser={infor.id!} idUserPost={infor.id!} />
                 ):(
                    <ShowPosts key={item.id} img={infor?.profile_image|| perfil.src} name={infor?.username!} text={item.content!} media={item.media} id={item.id} funct={handleSelection} idUser={infor!.id!} idUserPost={infor!.id!} />
                 )}
                </>
            )
            )}
        </>
            </section>
            </section>
        </main>
    )
  }
  export default Posts