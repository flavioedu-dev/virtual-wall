"use client";

// Styles
import "./register-adm.css"

// Hooks
import React, { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import useAuthentication from '@/hooks/useAuthentication'

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

    const {formAdm, createUser, handleInputChange} = useAuthentication()
  
    const handleSubmit = async (e:FormEvent)=> {
      e.preventDefault()
      await createUser()
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
          />
          <AuthInput
            type="text"
            name="username"
            id="username"
            placeholder="Nome do grupo"
            value={userName}
            onchange={handleChanges.handleNumber}
          />
          <AuthInput
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onchange={handleChanges.handleEmail}
          />
          <AuthInput
            type="password"
            name="pass"
            id="pass"
            placeholder="Senha"
            value={password}
            onchange={handleChanges.handlePassword}
          />
        </div>
        <AuthButton authentication={register} id="bnt-register" type="submit">Cadastrar</AuthButton>
        <p className="auth">
          <Link href={"/auth/login"}>Já possui uma conta? Entrar</Link>
        </p>
      </AuthForm>

      <div className="res_register"></div>
    </main>
   )
}

export default registerAdm