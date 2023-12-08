"use client"

//Image
import perfil from 'public/perfil.png'
import camera from 'public/camera-icon.png'

//Css
import "./FormWall.css"

//Components
import Image, { StaticImageData } from "next/image";
import {ChangeEvent, useEffect, useState} from "react";
import ClickImage from '@/components/clickImage/ClickImage';

interface FormGrupProps{
  Inforimage: (list:ListInforProps) => void,
  PassWall: () => void,
  groupId: string;
}

interface ListInforProps{
    imgWall:File | null;
    imgWallUrl:string;
    imgWallUrlprov:string | StaticImageData;
    nameWall:string;
    groupId: string;
}

const FormWall:React.FC<FormGrupProps> = ({Inforimage, PassWall, groupId}) => {

    //Image of the wall
    const [imgWall, setImgWall] = useState<File|null>(null)
    const [imgWallUrlprov, setImgWallUrlprov] = useState<StaticImageData|string>(camera)
    const [imgWallUrl, setImgWallUrl] = useState("")
    const [nameWall, setNameWall] = useState("")
    const [exclu, setExclu] = useState(false);

    const handleImageSelectWall = (File:File) =>{
        if(File){
          setImgWall(File)
          setImgWallUrlprov(URL.createObjectURL(File))
        }
      }

      const handleSelect = async () =>{

          console.log(1)
          const formData = new FormData();
          if (imgWall) {
            formData.append('file', imgWall);
            console.log(2)
          } else {
            console.error('imgGrup é nulo. Não é possível anexar ao FormData.');
            return;
          }

          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
          });
          
          if (!response.ok) {
            console.error('Erro durante a requisição:', response.statusText);
            return;
          }
          
          try {
            const data = await response.json();
            console.log('Valor:', data.url);
            setImgWallUrl(data.url);
          } catch (error) {
            console.error('Erro ao processar a resposta JSON:', error);
          }
     }

     const listInfor ={
      imgWall,
      imgWallUrl,
      imgWallUrlprov,
      nameWall,
      groupId
    }

    useEffect(()=>{
      if(imgWallUrl){
        Inforimage(listInfor)
      }
    },[imgWallUrl])


  return (
    <main className='all-Wall'>

        <Image
            src={imgWallUrlprov}
            alt="example"
            className="img_example-wall"
            width={400}
            height={400}
            priority={true}
        />
        <ClickImage onImageSelect={handleImageSelectWall} img={camera} id='came_ini'/>
       <form>
          <div className='text-bnt'>
            <input 
              className='NameGrup'
              type='text'
              name='NameGrup'
              placeholder='Nome do Mural' 
              required
              onChange={(e: ChangeEvent<HTMLInputElement>)=>{
                const name = e.currentTarget.value;
                if(name){
                  setNameWall(name)
                }
              }}
            />
          <div className='btn-wall'>
          <button className='btn' onClick={handleSelect} id='bnt-cri' type='button'>Criar</button>
          <button className='btn' id='btn-cri' onClick={PassWall} type='button'>Avançar</button>
          </div>
            </div>
       </form>
    </main>
  )
}

export default FormWall