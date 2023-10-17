"use client"

//Image
import perfil from 'public/perfil.png'
import camera from 'public/camera-icon.png'

//Css
import "./FormGrup.css"

//Components
import Image, { StaticImageData } from "next/image";
import {ChangeEvent, useState} from "react";
import ClickImage from '@/components/clickImage/ClickImage';

const FormGrup = () => {
  
//Image of the grup
  const [imgGrup, setImgGrup] = useState<File|null>(null)
  const [imgGrupUrlprov, setImgGrupUrlprov] = useState<StaticImageData|string>(perfil)
  const [imgGrupUrl, setImgGrupUrl] = useState("")

  const [nameGrup, setNameGrup] = useState("")

  const handleImageSelect = (File:File) =>{
    if(File){
      setImgGrup(File)
      setImgGrupUrlprov(URL.createObjectURL(File))
    }
  }

  return (
    <main className='all-form'>
       <form onSubmit={async (e) => {
          e.preventDefault()

          const formData = new FormData()
          if (imgGrup) {
            formData.append('image', imgGrup);
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
          setImgGrupUrl(data.url)
       }}>

          <Image
              src={imgGrupUrlprov}
              alt="example"
              className="img_example"
              width={400}
              height={400}
              priority={true}
          />
          <ClickImage onImageSelect={handleImageSelect} img={camera} id='came_ini'/>
          <p className='infor-p'>Coloque a foto e o nome do grupo <br />que você está criando</p>
          <input 
            className='NameGrup'
            type='text'
            name='NameGrup'
            placeholder='Nome do Grupo' 
            required
            onChange={(e: ChangeEvent<HTMLInputElement>)=>{
              const name = e.currentTarget.value;
              if(name){
                setNameGrup(name)
              }
            }}
          />
         <button className='btn' id='bnt-cri' type='submit'>Criar</button>
       </form>
    </main>
  )
}

export default FormGrup