"use client"

// Styles
import "./register-adm.css"

// Hooks
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import {useAuthentication} from "@/hooks/useAuthentication"

//Context


// Components
import Image from "next/image";
import { AuthButton } from "@/components/Button/AuthButton";
import { AuthInput } from "@/components/Input/AuthInput";

// Images
import logoImg from "public/Logo.png";
import AuthForm from "@/components/Form/AuthForm/AuthForm";
import { useEnter } from "@/hooks/useEnter";
import { useUserContext } from "@/context/VirtualContext";
import { useRouter } from "next/navigation";
import { link } from "fs";

interface FormAdm {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  nameGroup: string;
  group: object;
}

const RegisterAdm = () => {


    const {authenticationE} = useEnter()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
    };

    const router = useRouter()
    const {infor, handleNameChange} = useUserContext()

    const {useradm, createUser} = useAuthentication()

    const handleSubmit = (e:FormEvent)=> {
      e.preventDefault()
      if (name.trim() === '' || email.trim() === '' || password.trim() === ''|| confirmPassword === '') {
        console.error('Por favor, preencha todos os campos.');
        return;
      }
      const userAdm = {
        name : name.trim(),
        email: email.trim(),
        password: password.trim(),
        confirmPassword: confirmPassword.trim(),
        isAdmmin: true,
        group:[],
      }
      createUser(userAdm)
      handleNameChange(userAdm)
      
    };

    useEffect(()=>{
      if(infor && infor !== undefined){
        console.log(infor)
        router.push('/user/create-Grup')
      }
    },[infor])

  return (
    <main className="all">
         <div className="logo_login">
        <Image
          src={logoImg}
          alt="Logo"
          className="img_darken"
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
        {(name.trim() === '' || email.trim() === '' || password.trim() === ''|| confirmPassword.trim()=== '')?(<p className="infor-text">Preencha todos os campos</p>):<AuthButton authentication={handleSubmit} id="bnt-register" type="button">Cadastrar</AuthButton>};
        <p className="auth">
          <Link href={"/auth/login"}>Já possui uma conta? Entrar</Link>
        </p>
      </AuthForm>
      <div className="res_register"></div>
    </main>
   )
}

export default RegisterAdm