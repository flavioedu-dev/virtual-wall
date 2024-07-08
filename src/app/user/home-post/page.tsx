"use client"

import { useEffect, useState } from "react"
import "./homePost.css"
import { group, member, posts, user, wall } from "@/context/VirtualContext"
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
import Selection from "@/components/Selection/Selection"

const HomePost = () => {

    const [infor, setInfor] = useState<user>()
    const [load, setLoad] = useState(true)
    const dataMember = useInforMembers({load:true})
    const dataGroup = useInforGroups({load:true})
    const dataPost = useInforPost({load: true})
    const dataUser = useLogin()
    const [listPost, setListPost] = useState<posts[]>([])
    const [listDuple, setListDuple] = useState<posts[]>([])
    const [seePost, setSeePost] = useState(false)
    const [postSelection, setPostSelection] = useState<posts>()
    const [controlee, setControlee] = useState(0)
    const [groupPost, setGroupPost] = useState<group>()
    const [listGroupUser, setListGroupUser] = useState<group[]>([])
    const [respSelectionGroup, setRespSelectionGroup] = useState<string>()
    const [randomGroup, setRandomGroup] = useState<group>()
    
    
    const addGroup = async (group:group) =>{
      if (group && group.id) {
        const murals = await getData(group.id);
        const uniquePostIds = new Set();

        murals.forEach((value: wall) => {
          dataPost.data.forEach((item) => {
            if (value.id === item.muralId && item && !uniquePostIds.has(item.id)) {
              uniquePostIds.add(item.id);
              setListPost((prevList) => [...prevList, item]);
              setGroupPost(group)
            }
          });
        });
      }
    }

    const dataAnalise = (userData:user) =>{
      for(let i = 0; dataMember.data.length > i; i++){
        if(dataMember.data[i].userId === userData.id){
          for(let k = 0; dataGroup.data.length > k; k++){
            if(dataGroup.data[k].id == dataMember.data[i].groupId){
              if(listGroupUser.length !== 0){
                for(let j = 0; listGroupUser.length > j; j++){
                  if(dataGroup.data[k] === listGroupUser[j]){
                    return
                  }else{
                    setListGroupUser((prevList) => [...prevList, dataGroup.data[k]]);
                  }
                }
    
              }else{
                setListGroupUser((prevList) => [...prevList, dataGroup.data[k]]);
              }
            }
          }
        }
      }
    }
    
    
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

            dataAnalise(userData.data)
            
            if(respSelectionGroup){
              setListPost([])
              const group = dataGroup.data.find((value) => value.id === respSelectionGroup);
              setRandomGroup(group)
            }else{
              const group = dataGroup.data.find((value) => value.id === member.groupId);
              setRandomGroup(group)
            }
            
            return
          } 
            else if (userData.data) {
             
              const group = dataGroup.data.find((value) => value.userId === userData.data.id);
              if (group && group.id) {
                  setRandomGroup(group)
                  const murals = await getData(group.id)
                
                  setListPost([])
                  murals.forEach((value: wall) => {
                    setListPost([])
                    dataPost.data.forEach((item) => {
                      if (value.id === item.muralId && item ) {
                        
                        setListPost((prevList) => [...prevList, item])
                      }
                    })
                  })
               
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
      
    
    }, [ dataMember.data, dataPost.data, respSelectionGroup]);

    useEffect(() =>{
      if(randomGroup){ 
            addGroup(randomGroup)
      }
    },[randomGroup])

    

    const handleSelection = (id:string) => {
        if(id){
          const postElement = dataPost.data.find((value)=>value.id === id)
          if(postElement && postElement !== undefined){
            setSeePost(true)
            setPostSelection(postElement)
          }
        }
    }

    const handleClickGroup = (idGroup: string) =>{
      setRespSelectionGroup(idGroup)
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
              <div className="groupSelection">
              <React.Fragment>
                  {listGroupUser
                      .filter((item, index, array) => array.findIndex(t => t.id === item.id) === index)
                      .map(sele => (
                        <Selection
                        key={sele.id} // Adicione uma chave única para cada elemento
                        functId={handleClickGroup}
                        inforIdGroup={sele.id!}
                        inforNameGroup={sele.name!}
                      />
                      ))}
              </React.Fragment>
              </div>
            </div>

            

              <div className="post-homePost">
              {(infor?.isAdmin === true)?(
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


