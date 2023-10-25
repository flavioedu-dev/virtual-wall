"use client";

// Styles
import "./login-styles.css";

// Hooks
import React, { ChangeEvent, useContext, useEffect, useState } from "react";

// Components
import Image from "next/image";
import { AuthButton } from "@/components/Button/AuthButton";
import { AuthInput } from "@/components/Input/AuthInput";

// Images
import logoImg from "public/Logo.png";

import Link from "next/link";
import AuthForm from "@/components/Form/AuthForm/AuthForm";
import { useLogin } from "@/hooks/useLogin";
import { useEnter } from "@/hooks/useEnter";
import { useRouter } from "next/navigation";
import { VirtualContext } from "@/context/VirtualContext";

interface use{
  email: string;
  password: string;
}

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const {authenticationE} = useEnter()

  const router = useRouter()
  const {handleInforChange, infor} = useContext(VirtualContext)

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const logIn = (): void => {
    const Use = {
      email,
      password
    }
    const test = authenticationE(Use)

    if(test !== null){
      handleInforChange(test)
      router.push('/user/home')
    }else{
      console.log("Erro")
      setShowError(true); 
    }
  };

  // useEffect(()=>{

  //   if(infor){
  //     const registerUse = {
  //       email: infor.email,
  //       password: infor.password
  //     }

  //     const test = authenticationE(registerUse)

  //     if(test !== null){
  //       handleInforChange(test)
  //       router.push('/user/create-Grup')
  //     }else{
  //       console.log("Erro")
  //       setShowError(true); 
  //     }
  //   }
  // },[authenticationE, handleInforChange, infor, router])

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
      <p className={showError ? "Erro" : "hidden"}>Usuário não cadastrado</p>
      <AuthForm>
        <AuthInput
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onchange={handleEmail}
          required
        />
        <AuthInput
          type="password"
          name="pass"
          id="pass"
          placeholder="Senha"
          value={password}
          onchange={handlePassword}
          required
        />
        <a href="#" className="forgot_pass">
          Esqueceu a senha?
        </a>
        <AuthButton authentication={logIn} type="button" id="btn-login">Login </AuthButton>
        <p className="auth">
          <Link href={"/auth/register"}>Cadastre-se</Link>
        </p>
      </AuthForm>

      <div className="res_login"></div>
    </main>
  );
};

export default LoginPage;
