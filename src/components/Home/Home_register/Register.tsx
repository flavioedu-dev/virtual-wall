"use client"
import "./Register.css"
import AuthForm from "@/components/Form/AuthForm/AuthForm";
import { AuthButton } from "@/components/Button/AuthButton";
import Image from "next/image";
import boys from "public/boys.png"
const Register = () => {

    const useLogin = (): void =>{

    }

    const admLogin = (): void =>{

    }

  return (
    <main className="all-re">
         <div className="text-re">
                <AuthForm> 
                <p>Cadastro</p>
                <h2>Quem é você?</h2>
                <p>Eu já tenho um gurpo para participar</p>
                <AuthButton authentication={useLogin}>Entrar</AuthButton>
                <p>Vou criar um grupo ou já tenho o meu grupo</p>
                <AuthButton authentication={admLogin}>Entrar</AuthButton>
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