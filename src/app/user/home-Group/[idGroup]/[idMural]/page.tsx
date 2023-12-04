"use client";
import Navbar from "@/components/Nav/Navbar";
import { group, namewall, posts, useUserContext, user, wall } from "@/context/VirtualContext";
import { useLogin } from "@/hooks/useLogin";
import React, { useEffect, useState } from "react";
import perfil from "public/perfil.png";
import "./home.css"
import CreatePost from "@/components/createPost/CreatePost";
import { useParams } from "next/navigation";
import { getData } from "@/functions/check-Mural/CheckMural";
import { useInforMembers } from "@/hooks/useInforMember";
import { useInforPost } from "@/hooks/useInforPost";
import ShowPosts from "@/components/ShowPost/ShowPost";
import { useInforGroups } from "@/hooks/useInforGroups";
import SeePost from "@/components/SeePost/SeePost";

const HomePage = () => {

  // const {handleNameChange, infor} = useUserContext()
  
  const [wallPost, setWallPost] = useState<posts[]>()
  const [idWall, setIdWall] = useState<number>()
  const [idUserGroup, setIdUserGroup] = useState<string>("")
  const [codGroup, setCodGroup] = useState("")
  const [infor, setInfor] = useState<user>()
  const [valuData, setValueData] = useState<user[]>()
  const [controllll, setControllll] = useState(0)
  const [member, setMember] = useState("")
  const [option, setOption] = useState<posts[]>([])
  const dataMember = useInforMembers()
  const params = useParams()
  const dataPost = useInforPost()
  const dataUser = useLogin()
  const [useGroup, setUseGroup] = useState<group>()
  const groups = useInforGroups()
  const [seePost, setSeePost] = useState(false)
  const [postSelection, setPostSelection] = useState<posts>()


  useEffect(()=>{

    var valorRecuperado = localStorage.getItem("userData");
            if (valorRecuperado) {
              const userData = JSON.parse(valorRecuperado);
              setInfor(userData.data);
              if(userData.data.isAdmin == true){
                if(groups.data.length !== 0){
                    const valueGroup = groups.data.find((value)=> value.userId == infor?.id)
                    setUseGroup(valueGroup)
                }
              }
              if(dataMember.data.length !== 0 && userData.data ){
                const memb = dataMember.data.find((value)=>value.userId == userData.data.id)
                setMember(memb?.id!)
              }
            }

  },[dataMember.data, groups.data])


  useEffect(()=>{
    if (params) {
      if (Array.isArray(params.idMural) || Array.isArray(params.idGroup)) {
        
      } else {
        const numInt = parseInt(params.idMural, 10)
        setIdWall(numInt)
        setIdUserGroup(params.idGroup)
        
        const optionIdsSet = new Set(option.map(item => item.id))
    
        dataPost.data.forEach(value => {
          if (value.muralId === numInt) {
            if (!optionIdsSet.has(value.id)) {
              setOption(prevList => [...prevList, value])
              optionIdsSet.add(value.id)
            }
          }
        });
      }
    }
    
  }, [dataPost.data, infor, params])

  const handlePostDeletion = (postId: string) => {
    setOption(prevOption => prevOption.filter((post) => post.id !== postId));

  };

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

  return (
    <>
      <Navbar ImageGroup={infor?.profile_image!}></Navbar>
      <main className="all-home-H">

      {(seePost)?(    
              <div className="seePost-showpost">
                  <SeePost post={postSelection!}/>
                  <p className="exit-post" onClick={()=>{
                    setSeePost(false)
                  }}>Exit</p>
              </div>
          ):null}

        <div className="bord-post">
        <section className="createPost">
          {(infor?.isAdmin==true)?(
            <CreatePost img={useGroup?.imgGroup || ''} name={infor?.name || ''} idUser={infor!} idwall={idWall!} idmember={member} />
          ):(
            <CreatePost img={infor?.profile_image || ''} name={infor?.name || ''} idUser={infor!} idwall={idWall!} idmember={member} />
          )}
        </section>
            
        {option?.map((value) => {
          const matchingUser = dataUser.data.find((item) => value.memberId === item.id);

          if (matchingUser) {
            return (
              <React.Fragment key={value.id}>
                <ShowPosts
                  img={useGroup?.imgGroup || perfil.src}
                  name={matchingUser.name}
                  text={value.content}
                  media={value.media}
                  id={value.id}
                  onDelete={handlePostDeletion}
                  funct={handleSelection}
                />
              </React.Fragment>
              
            );
          } else {
            
            return null;
          }
        })}

        </div>
      </main>
    </>
  );
};


export default HomePage
