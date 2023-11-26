"use client";
import Navbar from "@/components/Nav/Navbar";
import Posts from "@/components/Posts/Posts";
import { namewall, posts, useUserContext, user, wall } from "@/context/VirtualContext";
import { useLogin } from "@/hooks/useLogin";
import React, { useEffect, useState } from "react";
import perfil from "public/perfil.png";
import "./home.css"
import CreatePost from "@/components/createPost/CreatePost";
import ShowPosts from "@/components/showPost/showPost";
import { Checktoken } from "@/functions/check-token/Checktoken";

const HomePage = () => {

  // const {handleNameChange, infor} = useUserContext()
  
  const [wallPost, setWallPost] = useState<posts[]>()
  const [idWall, setIdWall] = useState<string>("")
  const [idUserGroup, setIdUserGroup] = useState<string>("")
  const [codGroup, setCodGroup] = useState("")
  const [infor, setInfor] = useState<user>()
  const {data} = useLogin()
  const [rotaNew, setRotaNew] = useState<namewall>()
  const [nameWall, setNameWall] = useState("")
  const [valuData, setValueData] = useState<user[]>()

  useEffect(()=>{

    setValueData(data)

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
          setNameWall(rotaObj.namewall)
        }
    }

    const user = data.find((test) => test.group?.wall?.find((tes) => tes.nameWall == rotaNew?.namewall));
    const userWall = user?.group?.wall?.find((value)=> value.nameWall == rotaNew?.namewall)
    setCodGroup(user?.group?.codigo!)
    setIdUserGroup(user?.id!)
    setIdWall(userWall?.idwall!)
    setWallPost(userWall?.postagens)
  }, [data, rotaNew?.namewall, setWallPost])

  return (
    <>
      <Navbar ImageGroup={infor?.imgUser || infor?.group?.imageGroup || ''}></Navbar>
      <main className="all-home-H">
        <div className="bord-post">
        <section className="createPost">
          <CreatePost img={infor?.imgUser || infor?.group?.imageGroup || ''} name={infor?.name || ''} idUser={infor!} idwall={idWall} idUserGroup={idUserGroup} codGroup={codGroup} nameWall={nameWall}/>
        </section>
        <>
          {wallPost?.map((item) => {
            return valuData?.map((value:any) => {
                if (item.idUserP == value.id) {
                    return <ShowPosts key={value.id} img={value.imgUser || value.group?.imageGroup || perfil.src} name={value.name} text={item.text!} doc={item.doc} video={item.video} imgPost={item.image} />;
                }
                return null;
                });
          })}
        </>
        </div>
      </main>
    </>
  );
};

export default HomePage;
