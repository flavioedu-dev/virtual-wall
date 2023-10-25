"use client"

//Image
import perfil from 'public/perfil.png'
import camera from 'public/camera-icon.png'

//Css
import "./FormGrup.css"

//Components
import Image, { StaticImageData } from "next/image";
import {ChangeEvent, useContext, useEffect, useState} from "react";
import ClickImage from '@/components/clickImage/ClickImage';
import { VirtualContext } from '@/context/VirtualContext';
import { useRouter } from 'next/navigation';

const FormGrup = () => {
  
  const router = useRouter()

//Image of the grup
  const [imgGrup, setImgGrup] = useState<File|null>(null)
  const [imgGrupUrlprov, setImgGrupUrlprov] = useState<StaticImageData|string>(perfil)
  const [imgGrupUrl, setImgGrupUrl] = useState("")

  const [nameGrup, setNameGrup] = useState("")

  const [cod, setCod] = useState("")

  // const {handleInforChange, infor} = useContext(VirtualContext)

  const handleImageSelect = (File:File) =>{
    gerarAleatorio(8)
    if(File){
      setImgGrup(File)
      console.log(File)
      setImgGrupUrlprov(URL.createObjectURL(File))
    }
  }

  function gerarAleatorio(tamanho:number) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let resultado = '';
    for (let i = 0; i < tamanho; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      resultado += caracteres.charAt(indiceAleatorio);
    }
    setCod(resultado)
  }

  // useEffect(()=>{
  //   // if(imgGrupUrl){
  //   // const newGroup = {
  //   //   nameGroup: nameGrup,
  //   //   imageGroup: imgGrupUrl,
  //   //   codigo: cod,
  //   //   walls:[],
  //   // }
  //     // if(infor && infor !== undefined){
  //     //   console.log("Apareceu")
  //     //   console.log(infor)
  //     // }else{
  //     //   console.log("Não apareceu")
  //     //   console.log(infor)
  //     // }

  //   // if(infor !== undefined){
  //   //   console.log("Entrou no infor")
  //   //   infor.group.push(newGroup)
  //   //   handleInforChange(infor)
  //   //   router.push('/user/create-wall')
  //   // }
  //   // }
    
  // },[cod, handleInforChange, imgGrupUrl, infor, nameGrup, router, setImgGrupUrl])

  return (
    <main className='all-form'>
       <form className='form-Group' onSubmit={async (e) => {
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
          console.log("Valor:")
          console.log(data.url)
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