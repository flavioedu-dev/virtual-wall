"use client"
import "./Register.css"
import AuthForm from "@/components/Form/AuthForm/AuthForm";
import { AuthButton } from "@/components/Button/AuthButton";
import Image from "next/image";
import boys from "public/boysNew.png"
import Link from "next/link";
import React from "react";

const Register = () => {

  return (
    <main className="all-re">
         <div className="text-re">
                <AuthForm> 
                <p>Cadastro</p>
                <h2>Quem é você?</h2>
                <p>Eu quero criar um grupo.</p>
                <Link href={'/auth/registerAdm'}><AuthButton>Register</AuthButton></Link>
                <p>Eu quero me cadastrar como usuário.</p>
                <Link href={'/auth/register'}><AuthButton>Register</AuthButton></Link>
                </AuthForm>
            </div>
            <Image 
            src={boys}
            alt="boys"
            className="boys"
            style={{ objectFit: "contain" }}/>
    </main>
  )
}

export default Register