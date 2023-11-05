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
import { useUserContext } from "@/context/VirtualContext";
import { useAuthentication } from "@/hooks/useAuthentication";
import { useRouter } from "next/navigation";

// export const metadata = {
//   title: "Register",
// };

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("");

  const {infor, handleNameChange} = useUserContext()

  const {useradm, createUser} = useAuthentication()

  const router = useRouter()

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
    handleConfirmPassword: (e: ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(e.currentTarget.value);
    },
    handleSelect: (e: ChangeEvent<HTMLSelectElement>) => {
      setType(e.target.value);
    },
  };

  const options = infor?.group?.wall


  const register = (): void => {
    
    if (name.trim() === '' || email.trim() === '' || password.trim() === ''|| confirmPassword === '' || type === '') {
      console.error('Por favor, preencha todos os campos.');
      return;
    }
    const userAdm = {
      name : name.trim(),
      email: email.trim(),
      password: password.trim(),
      confirmPassword: confirmPassword.trim(),
      isAdmmin: false,
      nameWall: type.trim(),
      codGroup: infor?.group?.codigo,
      imgUser: "",
    }
    createUser(userAdm)
  };

  useEffect(()=>{
    console.log(useradm)
    if(useradm){
      handleNameChange(useradm)
      router.push('/user/home-Group')
      
    }
  },[handleNameChange, useradm, router])

  return (
    <div className="all">
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
            onchange={handleChanges.handleName}
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
          <AuthInput
            type="password"
            name="confirm-pass"
            id="confirm-pass"
            placeholder="Confirmar senha"
            value={confirmPassword}
            onchange={handleChanges.handleConfirmPassword}
            required
          />
          <select
            name="Iam"
            id="select-Iam"
            onChange={handleChanges.handleSelect}
            value={type}
            required
          >
            <option className="opt-disabled">Selecione uma categoria</option>
            {options?.map((option, index)=>{
              return <option key={index}>{option.nameWall}</option>
            })}
          </select>
        </div>
        {(name.trim() === '' || email.trim() === '' || password.trim() === ''|| confirmPassword.trim()=== '' || type.trim() === '' || type.trim() == "Selecione uma categoria")?(<p className="infor-text">Preencha todos os campos</p>):<AuthButton authentication={register} id="bnt-register" type="button">Cadastrar</AuthButton>};
        <p className="auth">
          <Link href={"/auth/login"}>Já possui uma conta? Entrar</Link>
        </p>
      </AuthForm>

      <div className="res_register"></div>
    </div>
  );
};

export default RegisterPage;
