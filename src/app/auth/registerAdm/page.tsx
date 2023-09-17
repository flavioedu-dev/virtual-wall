"use client"

// Styles
import "./register-adm.css"

// Hooks
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import Link from "next/link";
import {authentication} from "@/hooks/useAuthentication"

//Context
import { VirtualContext } from "@/context/VirtualContext";

// Components
import Image from "next/image";
import { AuthButton } from "@/components/Button/AuthButton";
import { AuthInput } from "@/components/Input/AuthInput";

// Images
import logoImg from "public/Logo.png";
import AuthForm from "@/components/Form/AuthForm/AuthForm";

export const metadata = {
  title: "Register",
};

const registerAdm = () => {

    const {event, setEvent} = useContext(VirtualContext)

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");

    const handleChanges = {
      handleName: (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
      },
      handleEmail: (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value);
      },
      handlePassword: (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value);
      },
      handleNumber: (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.currentTarget.value);
      },
    };

    const {userAdm, createUser} = authentication()
  
    const handleSubmit = (e:FormEvent)=> {
      e.preventDefault()
      if (name.trim() === '' || email.trim() === '' || password.trim() === '' || userName.trim() === '') {
        console.error('Por favor, preencha todos os campos.');
        return;
      }
      const userAdm = {
        name : name.trim(),
        email: email.trim(),
        password: password.trim(),
        isAdmmin: true,
      }
      createUser(userAdm)
      setEvent(userAdm)
    };


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
      <AuthForm onSubmit={handleSubmit}>
        <div className="user-data">
          <AuthInput
            type="text"
            name="fullname"
            id="fullname"
            placeholder="Nome completo"
            value={name}
            onchange={handleChanges.handleName}
            required
          />
          <AuthInput
            type="text"
            name="username"
            id="username"
            placeholder="Nome do grupo"
            value={userName}
            onchange={handleChanges.handleNumber}
            required
          />
          <AuthInput
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onchange={handleChanges.handleEmail}
            required
          />
          <AuthInput
            type="password"
            name="pass"
            id="pass"
            placeholder="Senha"
            value={password}
            onchange={handleChanges.handlePassword}
            required
          />
        </div>
        {(name.trim() === '' || email.trim() === '' || password.trim() === '' || userName.trim() === '')?(<p className="infor-text">Preencha todos os campos</p>):<AuthButton authentication={handleSubmit} id="bnt-register" type="submit">Cadastrar</AuthButton>};
        <p className="auth">
          <Link href={"/auth/login"}>Já possui uma conta? Entrar</Link>
        </p>
      </AuthForm>
      <div className="res_register"></div>
    </main>
   )
}

export default registerAdm