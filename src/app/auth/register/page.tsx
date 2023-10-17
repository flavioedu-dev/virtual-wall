"use client";

// Styles
import "./register-styles.css";

// Hooks
import React, { ChangeEvent, useState } from "react";
import Link from "next/link";

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

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("");

  const handleChanges = {
    handleName: (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.currentTarget.value);
    },
    handleUsername: (e: ChangeEvent<HTMLInputElement>) => {
      setUsername(e.currentTarget.value);
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

  const options = ["Aluno", "Professor", "Servidor", "Admin"];

  const register = (): void => {
    console.log("Register");
    console.log(type);
  };

  return (
    <div className="all">
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
            onchange={handleChanges.handleName}
            required
          />
          <AuthInput
            type="text"
            name="username"
            id="username"
            placeholder="Nome de usuário"
            value={username}
            onchange={handleChanges.handleUsername}
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
            required
          >
            <option className="opt-disabled">Selecione uma categoria</option>
            {options.map((option, index) => {
              return <option key={index}>{option}</option>;
            })}
          </select>
        </div>
        <AuthButton authentication={register} id="bnt-register">Cadastrar</AuthButton>
        <p className="auth">
          <Link href={"/auth/login"}>Já possui uma conta? Entrar</Link>
        </p>
      </AuthForm>

      <div className="res_register"></div>
    </div>
  );
};

export default RegisterPage;
