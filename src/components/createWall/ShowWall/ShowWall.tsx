"use client"
import React, { ReactNode, useEffect, useState } from 'react'
import Image, { StaticImageData } from "next/image";
import pointe from "public/cardapio.png";
import "./ShowWall.css"
import { useInforMural } from '@/hooks/useInforMural';
import { wall } from '@/context/VirtualContext';

interface ShowWallProps{
    name: string;
    img: string | StaticImageData;
    funct?: (nameWall:string) => void;
    functCod?: (idGroup:string) => void;
    functExclu?: (name:string) => void;
    idGroup?: string;
    wantExclu: boolean
}

const ShowWall = ({name, img, funct, idGroup, functCod, functExclu, wantExclu }: ShowWallProps) => {

  const [exclu, setExclu] = useState(false)
  const [excluOption, setExcluOption] = useState(false)
  const [idMural, setIdMural] = useState<number>()
  const dataMural = useInforMural()
  const [dataMu, setDataMu] = useState<wall[]>()

  const handleWall = () =>{
   if(funct){
    funct(name)
   }if(functCod){
    functCod(idGroup!)
   }
  }

  const handleExclu = () =>{
    setExclu(!exclu)
  }

  const handleTF = () =>{
    setExcluOption(true)
  }

  useEffect(()=>{
  
    if(dataMural.data.length !== 0){

      setDataMu(dataMural.data)

    }

  },[dataMural.data])

  const excluMural = async () => {

    console.log("Deletando o mural")
    console.log(idGroup)

    const mural = dataMu?.find((value)=> value.name == name && value.groupId == idGroup)

    console.log(dataMu)

    console.log(mural)
    
    if(mural){
      setIdMural(mural.id)
      try {
        const response = await fetch('https://projeto-web-full-stack-pm-devs-production-727d.up.railway.app/murals/'+mural.id, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            
          }),
        });
    
        if (response.ok) {
          const newWall = await response.json();
          console.log(newWall)
          if(functExclu){
            functExclu(name!)
          }
        } else {
          console.error('Erro ao adicionar wall:', response.status);
        }
      } catch (error) {
        console.error('Erro de rede:', error);
      }
    }

  }


  return (
    <main className='allshow'>

        <div className='show' onClick={handleWall}>

        {(excluOption)?(
            <div className='elementExclu'>
              <p>Você realmente deseja excluir este Mural?</p>
                <button onClick={excluMural}>Sim</button>
                <button onClick={()=>{
                  setExclu(false)
                  setExcluOption(false)
                }}>Não</button>
            </div>
        ):null}

        {(exclu)?(
          <div className="excluI" onClick={handleTF}>
          <p>Excluir</p>
          </div>
        ):null}

        {(wantExclu)?(

            <Image
            src={pointe}
            alt="example"
            className="img_homeN"
            width={20}
            height={20}
            onClick={handleExclu}
            />

        ):null}
        <Image
            src={img}
            alt="example"
            className="img_example-Show"
            width={400}
            height={400}
        />
        <div className='infor-text'>
          <h2>{name}</h2>
          <p>{"@"+name?.toLowerCase()}</p>
        </div>
        </div>
    </main>
  )
}

export default ShowWall