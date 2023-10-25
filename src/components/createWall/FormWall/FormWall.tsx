"use client"

//Image
import perfil from 'public/perfil.png'
import camera from 'public/camera-icon.png'

//Css
import "./FormWall.css"

//Components
import Image, { StaticImageData } from "next/image";
import {ChangeEvent, useState} from "react";
import ClickImage from '@/components/clickImage/ClickImage';

interface FormGrupProps{
  Inforimage: (list:ListInforProps) => void
}

interface ListInforProps{
    imgWall:File | null;
    imgWallUrl:string;
    imgWallUrlprov:string | StaticImageData;
    nameWall:string;
}

const FormWall:React.FC<FormGrupProps> = ({Inforimage}) => {

    //Image of the wall
    const [imgWall, setImgWall] = useState<File|null>(null)
    const [imgWallUrlprov, setImgWallUrlprov] = useState<StaticImageData|string>(camera)
    const [imgWallUrl, setImgWallUrl] = useState("")
    const [nameWall, setNameWall] = useState("")

    const handleImageSelectWall = (File:File) =>{
        if(File){
          setImgWall(File)
          setImgWallUrlprov(URL.createObjectURL(File))
        }
      }

      const listInfor ={
        imgWall,
        imgWallUrl,
        imgWallUrlprov,
        nameWall
      }

      const sendList = () =>{
        console.log("Entrou na chamada")
        Inforimage(listInfor)
      }

  return (
    <main className='all'>
        <Image
            src={imgWallUrlprov}
            alt="example"
            className="img_example"
            width={400}
            height={400}
            priority={true}
        />
        <ClickImage onImageSelect={handleImageSelectWall} img={camera} id='came_ini'/>
       <form onSubmit={async (e) => {
          e.preventDefault()

          const formData = new FormData()
          if (imgWall) {
            formData.append('image', imgWall);
          } else {
            console.error('imgGrup é nulo. Não é possível anexar ao FormData.');
            return;
          }

          const response = await fetch('/api/upload',{
            method: 'POST',
            body: formData
          })
          const data = await response.json()
          console.log(data)
          setImgWallUrl(data.url)
          sendList
       }}>
          <div className='text-bnt'>
            <input 
              className='NameGrup'
              type='text'
              name='NameGrup'
              placeholder='Nome do Grupo' 
              required
              onChange={(e: ChangeEvent<HTMLInputElement>)=>{
                const name = e.currentTarget.value;
                if(name){
                  setNameWall(name)
                }
              }}
            />
          <button className='btn' id='bnt-cri' onClick={sendList} type='button'>Criar</button>
            </div>
       </form>
    </main>
  )
}

export default FormWall