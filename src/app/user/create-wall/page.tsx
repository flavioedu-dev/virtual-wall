"use client"
import "./create-wall.css"
import ShowWall from "@/components/createWall/ShowWall/ShowWall"
import { useContext, useEffect, useState } from "react"
import { StaticImageData } from "next/image"
import FormWall from "@/components/createWall/FormWall/FormWall"
import { VirtualContext } from "@/context/VirtualContext"
import Image from "next/image";
import perfil from 'public/perfil.png'
import { isFunctionExpression } from "typescript"

interface ListInforProps{
  imgWall:File | null;
  imgWallUrl:string;
  imgWallUrlprov:string | StaticImageData;
  nameWall:string;
}

interface FormAdmGroup {
  nameGroup: string,
  imageGroup: string,
  wall?: [],
  codigo?: string,
}

const  CreateWall= () => {

  const test = {
    imageGroup: perfil.src,
    nameGroup: "Nome"
  }

  const [inforGrupFull, setInforGrupFull] = useState<ListInforProps>()
  const [listInforGrupFull, setListInforGroupFull] = useState<ListInforProps[]>([])
  const [inforGroup, setInforGroup] = useState<FormAdmGroup>(test)

  const handleImageChange = (infor:ListInforProps) =>{
    setInforGrupFull(infor)
    setListInforGroupFull(prevList => [...prevList, infor])
  }

  const {handleInforChange, infor} = useContext(VirtualContext)

  useEffect(()=>{
    if(infor || infor !== undefined){
      setInforGroup(infor.group)
    }
  },[inforGroup, setInforGroup])

  return (
    <main className="all-cre">
      <div className="show-wall">
        <div className='group'>
          <Image
            src={inforGroup.imageGroup}
            alt="example"
            className="img_example_wall"
            width={400}
            height={400}
          />
          <p className="nameGroup">{inforGroup.nameGroup}</p>
        </div>
      <div>
        {listInforGrupFull.map(item => (
            <>
            <ShowWall name={item.nameWall} img={item.imgWallUrlprov} />
            </>
        ))}
     </div>
    </div>
      <FormWall Inforimage={handleImageChange}/>
    </main>
  )
}

export default CreateWall 