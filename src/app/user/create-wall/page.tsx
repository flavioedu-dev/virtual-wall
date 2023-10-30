"use client"
import "./create-wall.css"
import ShowWall from "@/components/createWall/ShowWall/ShowWall"
import { useEffect, useState } from "react"
import { StaticImageData } from "next/image"
import FormWall from "@/components/createWall/FormWall/FormWall"
import { useUserContext} from "@/context/VirtualContext"
import Image from "next/image";
import perfil from 'public/perfil.png'
import { isFunctionExpression } from "typescript"
import { useRouter } from "next/navigation"

interface ListInforProps{
  imgWall:File | null;
  imgWallUrl:string;
  imgWallUrlprov:string | StaticImageData;
  nameWall:string;
}

export interface wall {
  nameWall: string;
  imgwall: string;
  postagens: any[];
}

export interface group {
  nameGroup?: string,
  imageGroup?: string,
  wall?:wall[],
  codigo?: string
}

const  CreateWall= () => {

  const router = useRouter()

  const test = {
    imageGroup: perfil.src,
    nameGroup: "Nome",
  };

  const [listInforGrupFull, setListInforGroupFull] = useState<ListInforProps[]>([])
  const [imgInfor, setImgInfor] = useState(test.imageGroup)
  const [textInfor, setTextInfor] = useState(test.nameGroup)

  const {handleNameChange, infor} = useUserContext()

  const handleImageChange = (info:ListInforProps) =>{


  const walls = {
    nameWall: info.nameWall,
    imgwall: info.imgWallUrl,
    postagens:[]
  }

  if (infor) {
    infor.group.forEach((groupItem: group) => {
      if (groupItem.wall) {
        groupItem.wall.push(walls);
      }
    });

    handleNameChange(infor);
    }
    setListInforGroupFull(prevList => [...prevList, info])
  }

  useEffect(() => {
    if (infor?.group && infor.group !== undefined) {
      // setInforGroup(infor.group)
      infor.group.forEach((groupItem:any) => {
        setImgInfor(groupItem.imageGroup)
        setTextInfor(groupItem.nameGroup)
      });
    }
  }, [infor, imgInfor, setImgInfor, handleNameChange]);


  function PassWall(): void {
    router.push('/user/home-Group')
  }

  return (
    <main className="all-cre">
      <div className="show-wall">
        <div className='group'>
          <Image
            src={imgInfor}
            alt="example"
            className="img_example_wall"
            width={400}
            height={400}
          />
          <p className="nameGroup">{textInfor}</p>
        </div>
      <div>
        {listInforGrupFull.map(item => (
            <>
            <ShowWall  key={item.imgWallUrl} name={item.nameWall} img={item.imgWallUrlprov} />
            </>
        ))}
     </div>
    </div>
      <FormWall Inforimage={handleImageChange} PassWall={PassWall} />
    </main>
  )
}

export default CreateWall 