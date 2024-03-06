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
import { useInforMembers } from "@/hooks/useInforMember";
import { useInforMural } from "@/hooks/useInforMural";

interface groupId{
    nameGroup: string;
    idMuralGroup: number;
    category: string;
}

const  Posts = () => {

    // const {handleNameChange, infor} = useUserContext()

    const [wallPost, setWallPost] = useState<posts[]>([])
    const [uplupa, setUpLupa] = useState(true)
    const [infor, setInfor] = useState<user>()
    const [group, setGroup] = useState<group>()
    const [groupPubli, setGroupPubli] = useState<groupId[]>([])
    const [controlllll, setControlllll] = useState(0)
    const dataPost = useInforPost({load: true})
    const dataGroup = useInforGroups({load:true})
    const dataMember = useInforMembers({load:true})
    const dataMural = useInforMural({load:true})
    const [seePost, setSeePost] = useState(false)
    const [postSelection, setPostSelection] = useState<posts>()

    const updateWallPost = (dataPost: posts[], infor: user | undefined) => {
        if (dataPost.length !== 0 && infor !== undefined && infor) {
          const optionIdsSet = new Set(wallPost.map(item => item.memberId));
      
          dataPost.forEach(value => {
            if (value.memberId === infor.id) {
              if (!optionIdsSet.has(value.memberId)) {
                setWallPost(prevList => [...prevList, value]);
                const muralPost = dataMural.data.find((valueMural)=> valueMural.id == value.muralId)
                const groupPost = dataGroup.data.find((valueGroup)=> valueGroup.id == muralPost?.groupId)
                const NameGroup = {
                    nameGroup: groupPost?.name!,
                    idMuralGroup: muralPost?.id!,
                    category: muralPost?.category! 
                };
                console.log(NameGroup)
                setGroupPubli(prevList => [...prevList, NameGroup]);
                
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
                
                if(groupMatch && groupMatch !== undefined){
                    setGroup(groupMatch)
                    setControlllll(1)
                }
            }else{
                setControlllll(1)
            }
            
            }
        }

        if(dataMember.data.length !== 0 && dataGroup.data.length !== 0 && dataMember.data.length !== 0){
            updateWallPost(dataPost.data, infor);
        }


        // if(groupPubli){
        //     console.log(groupPubli)
        // }

        

    }, [dataPost.data, infor, dataMember.data, dataGroup.data, dataMural.data])

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
        <main className="mainPostR">
            <section className="Post-sectionR">
                <Navbar ImageGroup={infor?.profile_image || ''}></Navbar>
                {(seePost)?(    
                    <div className="seePost-showpostPost">
                        <SeePost post={postSelection!}/>
                        <p className="exit-post" onClick={()=>{
                            setSeePost(false)
                        }}>Exit</p>
                    </div>
                ):null}
                <div className="forPesq-Post">
                        <input type="text" className="pesq-Post" placeholder="Pesquisa" id="enter" onClick={changeLupa} onBlur={changeLupaBlur}/>
                       
                </div>
                <section className="posts-container-post">
                <>
                    {wallPost.slice().reverse().map((item) => (
                        <React.Fragment key={`${item.id}-${infor?.id}`}>
                            {infor?.isAdmin === true ? (
                                <ShowPosts key={`${item.id}-${infor.id}`} img={group?.imgGroup || perfil.src} name={group?.name!} text={item.content!} media={item.media} id={item.id} funct={handleSelection} idUser={infor.id!} idUserPost={infor.id!}/>
                            ) : (
                                <React.Fragment>
                                    {groupPubli.map((element) => (
                                        <React.Fragment key={element.idMuralGroup}>
                                            {element.idMuralGroup == item.muralId?(
                                                <ShowPosts key={`${item.id}-${infor?.id}`} img={infor?.profile_image || perfil.src} name={infor?.username!} text={item.content!} media={item.media} id={item.id} funct={handleSelection} idUser={infor!.id!} idUserPost={infor!.id!} secondName={element.nameGroup} PostData={item.created_at} />
                                            ):null}
                                        </React.Fragment>
                                    ))}
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    ))}
                </>
                </section>
            </section>
        </main>
    )
  }
  export default Posts