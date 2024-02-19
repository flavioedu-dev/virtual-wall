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
import { group, useUserContext, user} from '@/context/VirtualContext';
import { useRouter } from 'next/navigation';
import { useEnter } from '@/hooks/useEnter';

const FormGrup = () => {
  
  const router = useRouter()

//Image of the grup
  const [imgGrup, setImgGrup] = useState<File|null>(null)
  const [imgGrupUrlprov, setImgGrupUrlprov] = useState<StaticImageData|string>(perfil)
  const [imgGrupUrl, setImgGrupUrl] = useState("")
  const [use, setUse] = useState<user>()
  const [pass, setPass] = useState(0)
  const [passCon, setPassCon] = useState(0)
  const [nameGrup, setNameGrup] = useState("")
  const[respGroup, setRespGroup] = useState("")

  const [cod, setCod] = useState("")

  const {handleNameChange, infor} = useUserContext()

  const {authenticationE} = useEnter()

  const funPut = (value:group) =>{
    async function getData(){
      const response = await fetch("https://projeto-web-full-stack-pm-devs-production-727d.up.railway.app/groups",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(value)
    });
    if(response.ok){
      const Data = await response.json()
      setRespGroup(Data)
    }
 }
    getData()
  }

  const handleImageSelect = (File:File) =>{
    // gerarAleatorio(8)
    if(File){
      setImgGrup(File)
      console.log(File)
      setImgGrupUrlprov(URL.createObjectURL(File))
    }
  }

  // function gerarAleatorio(tamanho:number) {
  //   const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   let resultado = '';
  //   for (let i = 0; i < tamanho; i++) {
  //     const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
  //     resultado += caracteres.charAt(indiceAleatorio);
  //   }
  //   setCod(resultado)
  // }

  useEffect(()=>{
    
    if(passCon === 0){
      var valorRecuperado = localStorage.getItem("userData");
    if (valorRecuperado) {
      const userData = JSON.parse(valorRecuperado);
      console.log(userData)
      setUse(userData.data)
      setPassCon(1)
    }
    }

    if(pass === 0){

      if(imgGrupUrl){
        const newGroup = {
          name: nameGrup,
          imgGroup: imgGrupUrl,
          userId: use?.id!
        }

      if(use !== undefined && use !== null && use.id){
        console.log("Aqui estás")
        funPut(newGroup)
      }
    }

    if(respGroup && respGroup !== undefined){
      router.push('/user/create-wall')
      router.push('/user/create-wall')
    }
    }
    
  },[authenticationE, use, cod, handleNameChange, imgGrupUrl, infor, nameGrup, router, setImgGrupUrl, pass, respGroup])

  return (
    <main className='all-form-group'>
       <form className='form-Group' onSubmit={async (e) => {
          e.preventDefault()
          const formData = new FormData();
          if (imgGrup) {
            formData.append('file', imgGrup);
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
              src={imgGrupUrlprov || perfil}
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