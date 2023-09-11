"use client"
import "./Register.css"
import AuthForm from "@/components/Form/AuthForm/AuthForm";
import { AuthButton } from "@/components/Button/AuthButton";
import Image from "next/image";
import boys from "public/boysNew.png"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Register = () => {
    const router = useRouter()
    const useLogin = (): void =>{
      router.push('/auth/register')
    }

    const admLogin = (): void =>{
      console.log("Não feito")
    }

  return (
    <main className="all-re">
         <div className="text-re">
                <AuthForm> 
                <p>Cadastro</p>
                <h2>Quem é você?</h2>
                <p>Eu quero criar um grupo.</p>
                <AuthButton authentication={admLogin}>Register</AuthButton>
                <p>Eu quero me cadastrar como usuário.</p>
                <AuthButton authentication={useLogin}>Register</AuthButton>
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