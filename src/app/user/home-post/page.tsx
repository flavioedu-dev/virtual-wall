"use client"

import { useEffect, useState } from "react"
import "./homePost.css"
import { posts, user, wall } from "@/context/VirtualContext"
import { useInforMembers } from "@/hooks/useInforMember"
import Navbar from "@/components/Nav/Navbar"
import { useInforGroups } from "@/hooks/useInforGroups"
import { getData } from '@/functions/check-Mural/CheckMural'
import { useInforPost } from "@/hooks/useInforPost"
import ShowPosts from "@/components/ShowPost/ShowPost"
import { useLogin } from "@/hooks/useLogin"
import React from "react"
import perfil from "public/perfil.png";
import SeePost from "@/components/SeePost/SeePost"

const HomePost = () => {

    const [infor, setInfor] = useState<user>()
    const [load, setLoad] = useState(true)
    const dataMember = useInforMembers()
    const dataGroup = useInforGroups()
    const dataPost = useInforPost({load: true})
    const dataUser = useLogin()
    const [listPost, setListPost] = useState<posts[]>([])
    const [listDuple, setListDuple] = useState<posts[]>([])
    const [seePost, setSeePost] = useState(false)
    const [postSelection, setPostSelection] = useState<posts>()
    const [controlee, setControlee] = useState(0)

    const fetchData = async () => {
      try {
        const valorRecuperado = localStorage.getItem("userData");
        if (valorRecuperado) {
          const userData = JSON.parse(valorRecuperado);
          setInfor(userData.data);
         
    
          if (!userData.data.isAdmin) {
            const member = dataMember.data.find((value) => value.userId === userData.data.id);
            if (!member) {
             return
            }
            
            const group = dataGroup.data.find((value) => value.id === member.groupId);
            if (group && group.id) {
              const murals = await getData(group.id);
              const uniquePostIds = new Set();

              murals.forEach((value: wall) => {
                dataPost.data.forEach((item) => {
                  if (value.id === item.muralId && item && !uniquePostIds.has(item.id)) {
                    uniquePostIds.add(item.id);
                    setListPost((prevList) => [...prevList, item]);
                  }
                });
              });
            }
            return
          } 
            if (userData.data) {
              const group = dataGroup.data.find((value) => value.userId === userData.data.id);
              if (group && group.id) {
               
                  const murals = await getData(group.id);
                  const uniquePostIds = new Set();

                  murals.forEach((value: wall) => {
                    dataPost.data.forEach((item) => {
                      if (value.id === item.muralId && item && !uniquePostIds.has(item.id)) {
                        uniquePostIds.add(item.id);
                        setListPost((prevList) => [...prevList, item]);
                      }
                    });
                  });
               
              }
            }
          
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    useEffect(() => {
      
      if(dataGroup.data && dataMember.data && dataPost.data){
        fetchData();
      }
      
    
    }, [ dataMember.data, dataPost.data]);

    const handleSelection = (id:string) => {
        if(id){
          const postElement = dataPost.data.find((value)=>value.id === id)
          if(postElement && postElement !== undefined){
            console.log("Passou aqui!")
            setSeePost(true)
            setPostSelection(postElement)
          }
        }
      }


    return(
        <main className="all-homePost">
            <Navbar ImageGroup={infor?.profile_image!}></Navbar>
            <section className="post-homePost">
            {(seePost)?(    
              <div className="seePost-showpostHome">
                  <SeePost post={postSelection!}/>
                  <p className="exit-postHome" onClick={()=>{
                    setSeePost(false)
                  }}>Exit</p>
              </div>
          ):null}
            <section className="post-general">

              <div className="forPesq-Post">
                <input type="text" className="pesq-Post" placeholder="Pesquisa" id="enter"/>
                      
              </div>

              <div className="post-homePost">
              {(infor?.isAdmin === true)?(
                <p></p>
            ):(
                <>
                  {[...new Set(listPost.map((value) => value.id))].reverse().map((postId) => {
                      const value = listPost.find((post) => post.id === postId);
                      const matchingUser = dataUser.data.find((item) => value!.memberId === item.id);
                      const useGroupElem = dataGroup.data.find((item) => item.userId === matchingUser?.id);

                      if (matchingUser) {
                        return (
                          <React.Fragment key={value!.id}>
                            <ShowPosts
                              img={useGroupElem?.imgGroup || matchingUser.profile_image! || perfil.src}
                              name={useGroupElem?.name || matchingUser.username!}
                              text={value!.content}
                              media={value!.media}
                              id={value!.id}
                              funct={handleSelection}
                              PostData={value!.created_at}
                              idUser={infor!.id!}
                              idUserPost={matchingUser.id!}
                            />
                          </React.Fragment>
                        );
                      } else {
                        return null;
                      }
                    })}
                </>
            )}
              </div>

           
            </section>
            </section>
        </main>
    )
}

export default HomePost


