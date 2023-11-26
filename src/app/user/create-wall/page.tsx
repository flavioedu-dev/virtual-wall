"use client"
import "./create-wall.css"
import ShowWall from "@/components/createWall/ShowWall/ShowWall"
import { useEffect, useState } from "react"
import { StaticImageData } from "next/image"
import FormWall from "@/components/createWall/FormWall/FormWall"
import { useUserContext, user} from "@/context/VirtualContext"
import Image from "next/image";
import perfil from 'public/perfil.png'
import { useRouter } from "next/navigation"
import { useInforGroups } from "@/hooks/useInforGroups"
import { useInforMural } from "@/hooks/useInforMural"

interface ListInforProps{
  imgWall:File | null;
  imgWallUrl:string;
  imgWallUrlprov:string | StaticImageData;
  nameWall:string;
}

export interface wall {
  nameWall?: string;
  imgwall?: string;
  postagens?: any[];
  user?: any[]
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
  const [codGroup, setCodGroup] = useState(0)
  const [idGroup, setIdGroup] = useState("")
  const dataGroup = useInforGroups()
  const dataMural = useInforMural()
  // const {handleNameChange, infor} = useUserContext()
  const [infor, setInfor] = useState<user>()

  const addWall = async (groupId:string, name:string, imgMural:string) => {
    try {
      const response = await fetch('https://projeto-web-full-stack-pm-devs-production.up.railway.app/murals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          groupId: groupId,
          name,
          category: name,
          imgMural,
        }),
      });
  
      if (response.ok) {
        const newWall = await response.json();
        console.log(newWall)
      } else {
        
        console.error('Erro ao adicionar wall:', response.status);
      }
    } catch (error) {
      console.error('Erro de rede:', error);
    }
  };

  const handleImageChange = (info:ListInforProps) =>{
  const walls = {
    nameWall: info.nameWall,
    imgwall: info.imgWallUrl,
    groupId: infor?.group?.id!,
    postagens:[],
  }

  if (infor && infor.id!==undefined) {
    console.log("Passou")

    if(idGroup !== ""){
      addWall(idGroup, info.nameWall, info.imgWallUrl)
    }
    }
    setListInforGroupFull(prevList => [...prevList, info])
  }

  useEffect(() => {
    var valorRecuperado = localStorage.getItem("userData");
    if (valorRecuperado) {
    const userData = JSON.parse(valorRecuperado);
    console.log("Valor do",userData)
    setInfor(userData.data)
    if(dataGroup.data.length !== 0){
      console.log(userData.data.id, "Id do valor")
      const group = dataGroup.data.find((value)=> value.userId == userData.data.id)
      console.log("Grupos",dataGroup.data)
      console.log("Grupo encontrado:",group)
      setImgInfor(group?.imgGroup || '');
      setTextInfor(group?.name|| '')
      setCodGroup(group?.groupCode!)
      setIdGroup(group?.id!)

      if(dataMural.data.length !== 0){
        console.log(dataMural.data)
      const mural = dataMural.data.map((value:any)=>{
      console.log("Aqui")
      if(listInforGrupFull.length === 0){
        console.log("Aqui2")
        if(value.groupId == group?.id){
          console.log("Aqui 3333")
          const teste = {
            imgWallUrl: value?.imgMural!,
            nameWall:value?.name!,
            imgWallUrlprov: value?.imgMural!,
            imgWall: null
          }
          console.log("Teste",teste)
          setListInforGroupFull(prevList => [...prevList, teste])
        }
      }else{
        const ele = listInforGrupFull.map((tes)=>{
          if(value.groupId == userData.data.id){
            console.log("Aqui 4")
          const teste = {
            imgWallUrl: value?.imgwall!,
            nameWall:value?.nameWall!,
            imgWallUrlprov: value?.imgwall!,
            imgWall: null
          }
  
          console.log(teste)
  
          if(teste.imgWallUrl && teste.imgWallUrl !== undefined && teste.nameWall && teste.nameWall !== undefined){
            console.log(1)
              if(teste.imgWallUrl == tes.imgWallUrl && teste.nameWall == tes.nameWall){
                console.log(2)
              }else{
                console.log(3)
                setListInforGroupFull(prevList => [...prevList, teste])
              }
          }
          }
  
        })
      }
      

      })
      
    }
    }
    }
    // console.log(infor)
    
    
    
  }, [dataGroup.data, dataMural.data, listInforGrupFull, localStorage]);
  

  function PassWall(): void {
    var valorRecuperado = localStorage.getItem("userData");
    if (valorRecuperado) {
    const userData = JSON.parse(valorRecuperado);
    console.log("Dados do localStorage:", userData);
    router.push('/user/home-Group')
    }
    
  }

  return (
    <main className="all-cre">
      <div className="show-wall">
        <div className='group'>
          <Image
            src={imgInfor || perfil}
            alt="example"
            className="img_example_wall"
            width={400}
            height={400}
          />
          <p className="nameGroup">{textInfor}</p>
          <p className="nameGroup">Código: {codGroup}</p>
        </div>
      <div>
        {listInforGrupFull.map(item => (
            <>
            <ShowWall  key={item.imgWallUrl!} name={item?.nameWall!} img={item.imgWallUrlprov!} />
            </>
        ))}
     </div>
    </div>
      <FormWall Inforimage={handleImageChange} PassWall={PassWall} />
    </main>
  )
}

export default CreateWall 


