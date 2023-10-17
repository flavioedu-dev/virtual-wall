"use client"
import "./create-wall.css"
import ShowWall from "@/components/createWall/ShowWall/ShowWall"
import { useState } from "react"
import { StaticImageData } from "next/image"
import FormWall from "@/components/createWall/FormWall/FormWall"

interface ListInforProps{
  imgWall:File | null;
  imgWallUrl:string;
  imgWallUrlprov:string | StaticImageData;
  nameWall:string;
}

const  createWall= () => {

  const [inforGrupFull, setInforGrupFull] = useState<ListInforProps>()
  const [listInforGrupFull, setListInforGroupFull] = useState<ListInforProps[]>([])

  const handleImageChange = (infor:ListInforProps) =>{
    setInforGrupFull(infor)
    setListInforGroupFull(prevList => [...prevList, infor])
  }

  console.log("Teste inicial: ",inforGrupFull)

  return (
    <main className="all">
     <div>
        {listInforGrupFull.map(item => (
            <>
            <ShowWall name={item.nameWall} img={item.imgWallUrlprov} />
            </>
        ))}
     </div>
      <FormWall Inforimage={handleImageChange}/>
    </main>
  )
}

export default createWall 