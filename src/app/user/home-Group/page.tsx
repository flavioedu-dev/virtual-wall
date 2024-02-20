"use client"

import Nav from '@/components/Nav/Navbar'
import './[idGroup]/homeGroup.css'
import perfil from "public/perfil.png"
import mais from "public/sinal-de-mais.png"
import { group, namewall, useUserContext, user } from '@/context/VirtualContext'
import { Key, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ShowWall from '@/components/createWall/ShowWall/ShowWall'
import Link from 'next/link'
import { useInforMembers } from '@/hooks/useInforMember'
import { useInforGroups } from '@/hooks/useInforGroups'
import React from 'react'

const HomeGroup = () =>{

    const [imgperfil, setImgPerfil] = useState("")
    const [codGroup, setCodGroup] = useState("")
    const [listGroup, setListGroup] = useState<group[]>([])
    const dataMembers = useInforMembers()
    const dataGroup = useInforGroups()
    const router = useRouter()
    const [infor, setInfor] = useState<user>()
    const [cont, setCont] = useState(0)
    const [controlO, setControlO] = useState(0)
    const [controlTw, setControlTw] = useState(0)

    useEffect(() => {
        
        if(cont === 0){
            var valorRecuperado = localStorage.getItem("userData");
            if (valorRecuperado) {
            const userData = JSON.parse(valorRecuperado);
            setInfor(userData.data);
            setCont(1)
            }
        }
      
        if(controlO === 0){
            if (infor?.isAdmin === true) {
                setImgPerfil(infor.group?.imgGroup!);
                setControlO(1)
              } else {
                setImgPerfil(infor?.profile_image || "");
                setControlO(1)
              }
        }
      
       if(controlTw === 0){
        
        if ( infor && dataGroup.data.length !== 0) {
            
            if(infor.isAdmin == true){
                
                const Groups = dataGroup.data.find(
                    (valueGroup) => valueGroup.userId == infor.id
                  );
                  if(Groups && Groups!== undefined){
                    setControlTw(1)
                    setListGroup((prevList) => [...prevList, Groups!])
                    
                    
                  }
              }else{
                dataMembers.data.map((value:any) => {
                    if (value.userId === infor?.id) {
                        const Groups = dataGroup.data.find(
                          (valueGroup) => valueGroup.id == value.groupId
                        );
                       
                        if(listGroup.length !== 0){
                            listGroup.map(value => {
                                if(value?.id !== Groups?.id){
                                    setListGroup((prevList) => [...prevList, Groups!])
                                }
                            })
                        }else{
                            console.log(listGroup)
                            if(controlTw === 0){
                                setListGroup((prevList) => [...prevList, Groups!])
                                setControlTw(1)
                            }
                        }
                      }
                });
              }
            
          }
       }

       if(setListGroup.length !== 0){
            
            
       }


      }, [controlO, controlTw, dataGroup.data, dataGroup ,dataMembers, infor, listGroup, cont]);

    const handleWall = (idGroup:string) =>{
        localStorage.setItem("rotaGroup", idGroup);
        router.push(`/user/home-Group/${idGroup}`)
    }

    const handleWallSelect = () =>{
        router.push('/auth/codGroup')
    }

    return(
        <main className='all-inf-show-wall'>
        <Nav ImageGroup={imgperfil||''}/>
        
        <section className='inforGroup'>
            <div className='inforGroup-text'>
                <p>GRUPOS</p>
            </div>
            <div className='inforGroup-wall'>
                {listGroup.map((value, index) => (
                    <React.Fragment key={index}>
                        {(value?.name !== undefined && value.name) ? (
                            <ShowWall functCod={handleWall} key={value?.id} name={value?.name!} img={value?.imgGroup!} idGroup={value?.id!} wantExclu={false}/> 
                        ) : null}
                    </React.Fragment>
                ))}
            </div>
            {(infor?.isAdmin !== true) ? (
                <ShowWall functCod={handleWallSelect}  name={"Adicionar grupo"} img={mais.src} wantExclu={false}/>
            ) : null}
        </section>
    </main>
    )
}

export default HomeGroup