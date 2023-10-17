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

import Link from "next/link";
import AuthForm from "@/components/Form/AuthForm/AuthForm";
import { useLogin } from "@/hooks/useLogin";
import { useEnter } from "@/hooks/useEnter";

export const metadata = {
  title: "Login",
};

interface use{
  email: string;
  password: string;
}

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {authenticationE} = useEnter()

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
    authenticationE(Use)
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
        <AuthButton authentication={logIn} id="btn-login">Login </AuthButton>
        <p className="auth">
          <Link href={"/auth/register"}>Cadastre-se</Link>
        </p>
      </AuthForm>

      <div className="res_login"></div>
    </main>
  );
};

export default LoginPage;
