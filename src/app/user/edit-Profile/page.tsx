"use client"

import { AuthInput } from "@/components/Input/AuthInput"
import "./edit-Profile.css"
import { ChangeEvent, useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import perfil from 'public/perfil.png'
import camera from 'public/camera-icon.png'
import ClickImage from "@/components/clickImage/ClickImage";
import { user } from "@/context/VirtualContext";
import { AuthButton } from "@/components/Button/AuthButton";
import Navbar from "@/components/Nav/Navbar";

const EditProfile = () => {

    const [name, setName] = useState("");
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [imgGrupUrlprov, setImgGrupUrlprov] = useState<StaticImageData|string>(perfil)
    const [imgUse, setImgUse] = useState<File>()
    const [infor, setInfor] = useState<user>()
    const[controlllllll, setControlllllll] = useState(0)
    const [warning, setWarning] = useState(false)
    const [warningSuce, setWarningSuce] = useState(false)
    const [updataUser, setUpdateUser] = useState<user>()

    const HandleChanges = {
        handleName: (e: ChangeEvent<HTMLInputElement>) => {
          setName(e.currentTarget.value);
        },
        handleUserName: (e: ChangeEvent<HTMLInputElement>) => {
          setUserName(e.currentTarget.value);
        },
        handleEmail: (e: ChangeEvent<HTMLInputElement>) => {
          setEmail(e.currentTarget.value);
        },
        handlePassword: (e: ChangeEvent<HTMLInputElement>) => {
          setPassword(e.currentTarget.value);
        },
        handleConfirmPassword: (e: ChangeEvent<HTMLInputElement>) => {
          setConfirmPassword(e.currentTarget.value);
        }
        
      };

      const salveImage = async (file:File) => {
        const formData = new FormData();
          if (file) {
            formData.append('file', file);
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
            return data.url;
            console.log(data.url)
          } catch (error) {
            console.error('Erro ao processar a resposta JSON:', error);
          }
      }

      const funPut = (value: user) =>{
        async function getData(){
          const response = await fetch("http://localhost:8000/users/"+infor?.id,{
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(value)
        });
        if(response.ok){
          const Data = await response.json()
          console.log(Data)
          setWarningSuce(true)
        }else{
          setWarning(true)
        }
     }
        if(infor?.id){
          getData()
        }
      }

      const funGet = () =>{
        async function getData(){
          const response = await fetch("http://localhost:8000/users/"+infor?.id,{
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });
        if(response.ok){
          const Data = await response.json()
          setUpdateUser(Data)
          return Data
        }
     }
        if(infor?.id){
          getData()
        }
      }

      const handleImageSelect = (File:File) =>{
        if(File){
          setImgUse(File)
          console.log(File)
          setImgGrupUrlprov(URL.createObjectURL(File))
        }
      }

      useEffect(()=>{
        
        if (controlllllll === 0) {
          // Verificar se estamos no navegador antes de acessar localStorage
          if (typeof window !== 'undefined') {
            var valorRecuperado = localStorage.getItem("userData");
            if (valorRecuperado && valorRecuperado !== undefined) {
              const userData = JSON.parse(valorRecuperado);
              console.log(userData);
              setInfor(userData.data);
              setControlllllll(1);
            }
          }
        }

        if (warningSuce) {
          funGet();
          if (updataUser) {''
            console.log("Aqui tome");
            const useValue = {
              auth: true,
              data: updataUser,
            };
            // Verificar se estamos no navegador antes de acessar localStorage
            if (typeof window !== 'undefined') {
              localStorage.setItem("userData", JSON.stringify(useValue));
            }
            setWarningSuce(false);
          }
        }

        
      },[warningSuce, updataUser])

      const register = () => {

        if(password || password !== undefined){
          if(password === confirmPassword){
            if(imgUse !== undefined || imgUse){
              const imgUrl = salveImage(imgUse)
              if(imgUrl !== null || imgUrl !== undefined){
                imgUrl.then((result:string) => {
                  const useEdit = {
                    name,
                    username: userName,
                    email,
                    password,
                    profile_image: result,
                  }
                  funPut(useEdit)
                  
                })
              }
            }else{
              const useEdit = {
                name,
                username: userName,
                email,
                password
              }
              funPut(useEdit)
              
            }
          }else{
            setWarning(true)
          }
        }else{
          if(imgUse !== undefined || imgUse){
            const imgUrl = salveImage(imgUse)
            if(imgUrl !== null || imgUrl !== undefined){
              imgUrl.then((result:string) => {
                const useEdit = {
                  name,
                  username: userName,
                  email,
                  password,
                  profile_image: result,
                }
                funPut(useEdit)
                
              })
            }
          }else{
            const useEdit = {
              name,
              username: userName,
              email,
              password
            }
            funPut(useEdit)
    
          }
        }

      }
    

    return(
        <main className="all-editProfile">
             <Navbar ImageGroup={infor?.profile_image || ''}></Navbar>
            <section className="editProfile-all">
            <section className="editProfile">

              <Image
                src={imgGrupUrlprov || infor?.profile_image!|| perfil}
                alt="example"
                className="img_example_profile"
                width={400}
                height={400}
                priority={true}
              />
              <ClickImage onImageSelect={handleImageSelect} img={camera} id='came_ini'/>
                  <form className="form-edit-profile">
                  <AuthInput
                      type="text"
                      name="fullname"
                      id="fullname"
                      placeholder="Nome completo"
                      value={name}
                      onchange={HandleChanges.handleName}
                      required
                  />
                  <AuthInput
                      type="text"
                      name="userName"
                      id="fullname"
                      placeholder="Nome para uso"
                      value={userName}
                      onchange={HandleChanges.handleUserName}
                      required
                  />
                  <AuthInput
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onchange={HandleChanges.handleEmail}
                      required
                  />
                  {/* <AuthInput
                      type="password"
                      name="pass"
                      id="pass"
                      placeholder="Senha"
                      value={password}
                      onchange={HandleChanges.handlePassword}
                      required
                  />
                  <AuthInput
                      type="password"
                      name="confirm-pass"
                      id="confirm-pass"
                      placeholder="Confirmar senha"
                      value={confirmPassword}
                      onchange={HandleChanges.handleConfirmPassword}
                      required
                  /> */}
                  {(warning)?(
                    <>
                      {(password !== confirmPassword)?(
                        <p className="password-warning">Suas senhas estão diferentes</p>
                      ):(
                        <p className="password-warning">Sua senha não tem 8 digitos</p>
                      )}
                    </>
                  ):(
                    <>
                      {(warningSuce)?(
                        <p className="password-warning">Mudança feita!</p>
                      ):(
                        // <p className="password-warning">Lembre-se que a senha tem que ter 8 digitos!</p>
                        <p></p>
                      )}
                    </>
                  )}
                  <AuthButton authentication={register} id="bnt-editperfil" type="button">Mudar</AuthButton>
                  </form>
              </section>
            </section>
        </main>
    )
}

export default EditProfile