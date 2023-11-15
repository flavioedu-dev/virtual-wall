"use client";
import Navbar from "@/components/Nav/Navbar";
import Posts from "@/components/Posts/Posts";
import { posts, useUserContext, wall } from "@/context/VirtualContext";
import { useLogin } from "@/hooks/useLogin";
import React, { useEffect, useState } from "react";

import "./home.css"
import CreatePost from "@/components/createPost/CreatePost";
import ShowPosts from "@/components/showPost/showPost";

const HomePage = () => {

  const {handleNameChange, infor} = useUserContext()
  
  const [wallPost, setWallPost] = useState<posts[]>()
  const [idWall, setIdWall] = useState<string>("")
  const [idUserGroup, setIdUserGroup] = useState<string>("")
  const [codGroup, setCodGroup] = useState("")

  const {data} = useLogin()

  useEffect(()=>{
    const user = data.find((test) => test.group?.wall?.find((tes) => tes.nameWall == infor?.rota));

    const userWall = user?.group?.wall?.find((value)=> value.nameWall == infor?.rota)
    setCodGroup(user?.group?.codigo!)
    setIdUserGroup(user?.id!)
    setIdWall(userWall?.idwall!)
    setWallPost(userWall?.postagens)
  }, [data, infor?.rota, setWallPost])

  return (
    <>
      <Navbar ImageGroup={infor?.imgUser || infor?.group?.imageGroup || ''}></Navbar>
      <main className="all-home">
        <div className="bord-post">
        <section className="createPost">
          <CreatePost img={infor?.imgUser || infor?.group?.imageGroup || ''} name={infor?.name || ''} idUser={infor!} idwall={idWall} idUserGroup={idUserGroup} codGroup={codGroup}/>
        </section>
        <section>
        {wallPost?.map(item => (
            <>
            <ShowPosts img={infor?.group?.imageGroup! || infor?.imgUser!} name={infor?.name!} text={item.text!} doc={item.doc} video={item.video} imgPost={item.image}/>
            </>
        ))}
        </section>
        </div>
      </main>
    </>
  );
};

export default HomePage;
