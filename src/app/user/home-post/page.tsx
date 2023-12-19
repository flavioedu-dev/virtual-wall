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

const HomePost = () => {

    const [infor, setInfor] = useState<user>()
    const dataMember = useInforMembers()
    const dataGroup = useInforGroups()
    const dataPost = useInforPost({load: true})
    const dataUser = useLogin()
    const [listPost, setListPost] = useState<posts[]>([])
    const [listDuple, setListDuple] = useState<posts[]>([])
    const [seePost, setSeePost] = useState(false)
    const [postSelection, setPostSelection] = useState<posts>()
    const [controle, setControle] = useState(0)

    const fetchData = async () => {
      try {
        const valorRecuperado = localStorage.getItem("userData");
        if (valorRecuperado) {
          const userData = JSON.parse(valorRecuperado);
          setInfor(userData.data);
    
          if (!userData.data.isAdmin) {
            const member = dataMember.data.find((value) => value.userId === userData.data.id);
            if (member) {
              const group = dataGroup.data.find((value) => value.id === member.groupId);
              if (group && group.id) {
                const murals = await getData(group.id);
    
                murals.forEach((value: wall) => {
                  dataPost.data.forEach((item) => {
                    const optionIdsSet = new Set(listPost.map((item) => item.id));
                    const enct = listPost.find((pesq)=>pesq.id === item.id)
                    if (value.id === item.muralId && item && !optionIdsSet.has(item.id) && !enct && enct === undefined) {
                      optionIdsSet.add(item.id);
                      setListPost((prevList) => [...prevList, item]);
                    }
                  });
                });
              }
            }
          } else {
            if (userData.data) {
              const group = dataGroup.data.find((value) => value.userId === userData.data.id);
              if (group && group.id) {
                const murals = await getData(group.id);
                const optionIdsSet = new Set(listPost.map((item) => item.id));
    
                murals.forEach((value: wall) => {
                  dataPost.data.forEach((item) => {
                    if (value.id === item.muralId && item && !optionIdsSet.has(item.id)) {
                      optionIdsSet.add(item.id);
                      setListPost((prevList) => [...prevList, item]);
                    }
                  });
                });
              }
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    useEffect(() => {
      
      if(dataGroup.data && dataMember.data && dataPost){
        fetchData();
      }
      
    
    }, [dataGroup.data, dataMember.data, dataPost.data]);

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
            <section className="post-general">

              <div className="forPesq-Post">
                <input type="text" className="pesq-Post" placeholder="Pesquisa" id="enter"/>
                      
              </div>

              <div className="post-homePost">
              {(infor?.isAdmin === true)?(
                <p></p>
            ):(
                <>
                  {/* {listPost.map((value)=>{
                    console.log(value)
                  })} */}
                  {console.log(listPost)}
                </>
            )}
              </div>

           
            </section>
            </section>
        </main>
    )
}

export default HomePost


