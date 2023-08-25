"use client";

// Styles
import "./register-styles.css";

// Hooks
import React, { ChangeEvent, useState } from "react";

// Components
import Image from "next/image";
import { AuthButton } from "@/components/Button/AuthButton";
import { AuthInput } from "@/components/Input/AuthInput";

// Images
import logoImg from "public/Logo.png";

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
      setType(e.target.value)
    }
  }
  
  const options = ["Aluno", "Professor", "Servidor", "Admin"]

  const register = (): void => {
    console.log("Register");
    console.log(type);
  };

  return (
    <div className="all">
      <div className="logo-login">
        <Image
          src={logoImg}
          alt="Logo"
          className="img-darken"
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="form-container">
        <form className="form">
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
              placeholder="Nome de usuário"
              value={username}
              onchange={handleChanges.handleUsername}
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
            <AuthInput
              type="password"
              name="confirm-pass"
              id="confirm-pass"
              placeholder="Confirmar senha"
              value={confirmPassword}
              onchange={handleChanges.handleConfirmPassword}
            />
            <select
              name="Iam"
              id="select-Iam"
              onChange={handleChanges.handleSelect}
              required
            >
              <option
                className="opt-disabled"
              >
                Eu sou
              </option>
              {options.map((option, index) => {
                return <option key={index}>
                  {option}
                </option>
              })}
            </select>
          </div>
          <AuthButton authentication={register}>
            Cadastrar
          </AuthButton>
        </form>
        <p className="auth">
          <a href="login.html">Já possui uma conta? Entrar</a>
        </p>
        <div className="res_register"></div>
      </div>
    </div>
  );
};

export default RegisterPage;
