"use client"

import Nav from '@/components/Nav/Navbar'
import './homeGroup.css'
import perfil from "public/perfil.png"
import mais from "public/sinal-de-mais.png"
import { namewall, group ,user, wall } from '@/context/VirtualContext'
import { useEffect, useState } from 'react'
import ShowWall from '@/components/createWall/ShowWall/ShowWall'
import { useParams, useRouter } from 'next/navigation'

import { getData } from '@/functions/check-Mural/CheckMural'
import { useInforGroups } from '@/hooks/useInforGroups'
import Link from 'next/link'

const HomeWall= () => {

    const [imgperfil, setImgPerfil] = useState("")
    const [dataUser, setDataUser] = useState<user>()
    const [rotaNew, setRotaNew] = useState<namewall>()
    const [infor, setInfor] = useState<user>()
    const [group, setGroup] = useState("");
    const [option, setOption] = useState<wall[]>()
    const [controlll, setControlll] = useState(0)
    const params = useParams()
    const router = useRouter()
    const groups = useInforGroups({load:true})

    useEffect(()=>{

        if(controlll === 0){
            var valorRecuperado = localStorage.getItem("userData");
            if (valorRecuperado) {
            const userData = JSON.parse(valorRecuperado);
            setInfor(userData.data);
            setControlll(1)
            }
        }

        if (params) {
         
            if (Array.isArray(params.idGroup)) {
              params.idGroup.forEach((idGroup) => {
                // const murals = getData(id);
                
              });
            } else {
            //   const groupImg = groups.data.find((value)=> value.id === params.id)
              setGroup(params.idGroup)
              const murals = getData(params.idGroup);
              murals.then(resultado => {
                setOption(resultado)
              })
            }
        }

        
    },[controlll, groups.data, infor, params])

    const handleWall = (cod:string) =>{
        localStorage.setItem("rotaMural", cod);
        router.push(`/user/home-Group/${group}/${cod}`)
    }

    const handleWallSelect = () =>{
        router.push('/user/create-wall')
    }

    return(
        <main className='all-inf-show-wall'>
            <Nav ImageGroup={imgperfil||''}/>
            
            <section className='inforGroup'>
            <div className='inforGroup-text'>
            <p>MURAIS</p>
            </div>
            <div className='inforGroup-wall'>
                {(Array.isArray(option) && option.length !== 0) ? (
                    option.map((item) => (
                        <ShowWall functCod={handleWall} key={item.id} name={item.name!} img={item.imgMural!} idGroup={item.id?.toString()!} wantExclu={false} />
                        ))
                    ) : null}
                {(infor?.isAdmin == true)?(
                    <ShowWall  name={"Adicionar Mural"} img={mais.src} functCod={handleWallSelect} wantExclu={false}/>
                ):(
                    <p></p>
                )}
            </div>
            </section>
        </main>
    )
}

export default HomeWall