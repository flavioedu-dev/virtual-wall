"use client";

// Styles
import "./login-styles.css";

// Hooks
import React, { ChangeEvent, useState } from "react";

// Components
import Image from "next/image";
import { AuthButton } from "@/components/Button/AuthButton";
import { AuthInput } from "@/components/Input/AuthInput";

// Images
import logoImg from "public/Logo.png";

export const metadata = {
  title: "Login",
};

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const logIn = (): void => {
    console.log("Login");
  };

  return (
    <main className="all">
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
          <AuthInput
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onchange={handleEmail}
          />
          <AuthInput
            type="password"
            name="pass"
            id="pass"
            placeholder="Senha"
            value={password}
            onchange={handlePassword}
          />
          <a href="#" className="forgot-pass">
            Esqueceu a senha?
          </a>
          <AuthButton authentication={logIn}>Login</AuthButton>
        </form>
        <p className="auth">
          <a href="#">Cadastre-se</a>
        </p>
      </div>
      <div className="res_login"></div>
    </main>
  );
};

export default LoginPage;