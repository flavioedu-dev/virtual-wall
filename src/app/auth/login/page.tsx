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
import { useUserContext, user } from "@/context/VirtualContext";
import { useInforGroups } from "@/hooks/useInforGroups";
import { getData } from "@/functions/check-Mural/CheckMural";

interface use{
  email: string;
  password: string;
}

interface useTo {
  message: string,
  user: any
}

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const {authenticationE} = useEnter()
  const router = useRouter()


  const {handleNameChange, infor} = useUserContext()

  
  const [control, setControl] = useState(0)
  const [controlOne, setControlOne] = useState(0)
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const groups = useInforGroups()

  useEffect(()=>{
   
    if(control === 1){
      var valorRecuperado = localStorage.getItem("userData");
      if (valorRecuperado) {
        const userData = JSON.parse(valorRecuperado);
        const test = userData.data
        if(test && test !== undefined){
          console.log(test)
          console.log("1")
          if (test && groups.data.length > 0) { 
            console.log("2")
            if (test.isAdmin) {
              setControl(1);
              console.log("3")
              const vali = groups.data.find((value) => value.userId == test.id);
              
              if (vali !== undefined && vali) {
                const mural = getData(vali.id!);
                mural.then((resultado) => {
                  if(resultado.length !== 0){
                      router.push('/user/home-Group')
                      router.push('/user/home-Group')
                  }else{
                      router.push('/user/create-wall')
                      router.push('/user/create-wall')
                  }
                }).catch((erro) => {
                  console.error("Erro ao resolver a Promise:", erro);
                });
              }else{
                handleNameChange(test)
                router.push('/user/create-Grup')
                router.push('/user/create-Grup')
              }
        }else{
          console.log("4")
          router.push('/user/home-Group')
        }
        }
      }
        setControlOne(1)
    }
    }

    

  },[groups.data, handleNameChange, router, control])


  const logIn = (): void => {
    
    const res = authenticationE(email, password)
    res.then((resultado:any) => {
      if(resultado === false){
        setShowError(true)
      }else{
        setControl(1)
      }
    })
    
  };

  return (
    <main className="all">
      <div className="logo_login">
        <Image
          src={logoImg}
          alt="Logo"
          className="img_darken"
          style={{ objectFit: "contain", alignSelf: "center" }}
          width={270}
        />
      </div>
      <p className={showError ? "Erro" : "hidden"} style={{textAlign:"center"}}>Usuário não cadastrado</p>
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
        <a href="#" className="forgot_pass" style={{alignSelf:"end"}}>
          Esqueceu a senha?
        </a>
        <AuthButton authentication={logIn} type="button" id="btn-login">Login </AuthButton>
        <p className="auth">
          <Link href={"/"}>Cadastre-se</Link>
        </p>
      </AuthForm>

      <div className="res_login"></div>
    </main>
  );
};

export default LoginPage;
