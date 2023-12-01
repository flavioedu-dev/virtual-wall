"use client";

// Styles
import "./register-styles.css";

// Hooks
import React, { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";

// Components
import Image from "next/image";
import { AuthButton } from "@/components/Button/AuthButton";
import { AuthInput } from "@/components/Input/AuthInput";

// Images
import logoImg from "public/Logo.png";
import AuthForm from "@/components/Form/AuthForm/AuthForm";
import { ListFormat } from "typescript";
import { namewall, useUserContext } from "@/context/VirtualContext";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useRouter } from "next/navigation";
import { useEnter } from "@/hooks/useEnter";

// export const metadata = {
//   title: "Register",
// };

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const {authenticationE} = useEnter()

  // const {infor, handleNameChange} = useUserContext()

  const {useradm, createUser} = useAuthentication()

  const router = useRouter()

  
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

  const register = (): void => {
    
    if (name.trim() === '' || email.trim() === '' || password.trim() === ''|| confirmPassword === '' || userName === '') {
      console.error('Por favor, preencha todos os campos.');
      return;
    }


    const userAdm = {
      name : name.trim(),
      username: userName.trim(),
      email: email.trim(),
      password: password.trim(),
      confirmPassword: confirmPassword.trim(),
      isAdmin: false,
    }
    createUser(userAdm)
  };

  useEffect(()=>{
    if(useradm == "User created successfully."){
      console.log(useradm)
      authenticationE(email, password)
      router.push('/auth/codGroup')
      router.push('/auth/codGroup')
    }
  },[useradm, router, authenticationE, email, password])

  return (
    <div className="allRe">
      <div className="logo_login">
        <Image
          src={logoImg}
          alt="Logo"
          className="img_darken"
          width={270}
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
          <AuthInput
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
          />
          
        </div>
        {(name.trim() === '' || email.trim() === '' || password.trim() === ''|| confirmPassword.trim()=== '')?(<p className="infor-text">Preencha todos os campos</p>):<AuthButton authentication={register} id="bnt-register" type="button">Cadastrar</AuthButton>};
        <p className="auth">
          <Link href={"/auth/login"}>Já possui uma conta? Entrar</Link>
        </p>
      </AuthForm>

      <div className="res_register"></div>
    </div>
  );
};

export default RegisterPage;
