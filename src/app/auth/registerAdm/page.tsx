"use client"

// Styles
import "./register-adm.css"

// Hooks
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import {useAuthentication} from "@/hooks/useAuthentication"

// Components
import Image from "next/image";
import { AuthButton } from "@/components/Button/AuthButton";
import { AuthInput } from "@/components/Input/AuthInput";

// Images
import logoImg from "public/Logo.png";
import AuthForm from "@/components/Form/AuthForm/AuthForm";
import { useUserContext } from "@/context/VirtualContext";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useLogin";
import { useEnter } from "@/hooks/useEnter";

const RegisterAdm = () => {

    const [name, setName] = useState("");
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pass, setPass] = useState(0)
    const {authenticationE} = useEnter()

    const handleChange = {
      handleName: (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
      },
      handleEmail: (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
      },
      handlePassword: (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
      },
      handleConfirmPassword: (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.currentTarget.value);
      },
      handleUserName: (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.currentTarget.value);
      },
    };

    const router = useRouter()
    const {infor, handleNameChange} = useUserContext()

    const {useradm, createUser} = useAuthentication()

    const handleSubmit = (e:FormEvent)=> {
      e.preventDefault()
      if (name.trim() === '' || email.trim() === '' || password.trim() === ''|| confirmPassword === '' || userName === '') {
        console.error('Por favor, preencha todos os campos.');
        return;
      }

      const userAdmData = {
        name : name.trim(),
        username: userName.trim(),
        email: email.trim(),
        password: password.trim(),
        confirmPassword: confirmPassword.trim(),
        isAdmin: true,
      }
      
      createUser(userAdmData)
    };

    useEffect(()=>{
     if(pass === 0){
      if(useradm == "User created successfully."){
        console.log(useradm)
        authenticationE(email, password)
        router.push('/user/create-Grup')
        router.push('/user/create-Grup')
      }
     }

     

    },[authenticationE, handleNameChange, useradm])

  return (
    <main className="all">
         <div className="logo_login">
        <Image
          src={logoImg}
          alt="Logo"
          width={400}
          className="img_rge"
          style={{ objectFit: "contain" }}
        />
      </div>
      <AuthForm>
        <div className="user-data">
          <AuthInput
            type="text"
            name="fullname"
            id="fullname"
            placeholder="Nome completo"
            value={name}
            onchange={handleChange.handleName}
            required
          />
          <AuthInput
            type="text"
            name="userName"
            id="fullname"
            placeholder="Nome para uso"
            value={userName}
            onchange={handleChange.handleUserName}
            required
          />
          <AuthInput
            type="email"
            name="email"
            id="email"

            placeholder="Email"
            value={email}
            onchange={handleChange.handleEmail}
            required
          />
          <AuthInput
            type="password"
            name="pass"
            id="pass"
            placeholder="Senha"
            value={password}
            onchange={handleChange.handlePassword}
            required
          />
           <AuthInput
            type="password"
            name="confirm-pass"
            id="confirm-pass"
            placeholder="Confirmar senha"
            value={confirmPassword}
            onchange={handleChange.handleConfirmPassword}
            required
          />
        </div>
        {(name.trim() === '' || email.trim() === '' || password.trim() === ''|| confirmPassword.trim()=== '' || userName.trim() === '')?(<p className="infor-text">Preencha todos os campos</p>):<AuthButton authentication={handleSubmit} id="bnt-register" type="button">Cadastrar</AuthButton>};
        <p className="auth">
          <Link href={"/auth/login"}>Já possui uma conta? Entrar</Link>
        </p>
      </AuthForm>
      <div className="res_register"></div>
    </main>
   )
}

export default RegisterAdm