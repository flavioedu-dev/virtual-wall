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
import { group, useUserContext} from '@/context/VirtualContext';
import { useRouter } from 'next/navigation';

const FormGrup = () => {
  
  const router = useRouter()

//Image of the grup
  const [imgGrup, setImgGrup] = useState<File|null>(null)
  const [imgGrupUrlprov, setImgGrupUrlprov] = useState<StaticImageData|string>(perfil)
  const [imgGrupUrl, setImgGrupUrl] = useState("")

  const [nameGrup, setNameGrup] = useState("")

  const [cod, setCod] = useState("")

  const {handleNameChange, infor} = useUserContext()

  const funPut = (idUser:string, value:group) =>{
    async function getData(){
      const response = await fetch("http://localhost:4000/"+idUser,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(value)
    });
 }
    getData()
  }

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

  useEffect(()=>{
    if(imgGrupUrl){
    const newGroup = {
      nameGroup: nameGrup,
      imageGroup: imgGrupUrl,
      codigo: cod,
      wall:[],
    }

    const newGroupData = {
      group: {
        nameGroup: nameGrup,
        imageGroup: imgGrupUrl,
        codigo: cod,
        wall:[],
      }
    }

    if(infor !== undefined && infor !== null&&infor.id){
      console.log("Aqui estás")
      funPut(infor.id, newGroupData)
      infor.group?.push(newGroup)
      handleNameChange(infor)
      router.push('/user/create-wall')
    }
    }
    
  },[cod, handleNameChange, imgGrupUrl, infor, nameGrup, router, setImgGrupUrl])

  return (
    <main className='all-form'>
       <form className='form-Group' onSubmit={async (e) => {
          e.preventDefault()
          console.log(1)
          const formData = new FormData();
          if (imgGrup) {
            formData.append('file', imgGrup);
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
            setImgGrupUrl(data.url);
          } catch (error) {
            console.error('Erro ao processar a resposta JSON:', error);
          }
          
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