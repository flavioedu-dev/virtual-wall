"use client"

//CSS
import "./home_page.css"

//IMG
import logoImg from "public/Logo.png";
import Image from "next/image";

//Components
import Presentation from "@/components/Home/Home_presentation/Presentation";
import Register from "@/components/Home/Home_register/Register";
import { AuthButton } from "@/components/Button/AuthButton";
import Infor from "@/components/Home/Home_infor/Infor";

const login = (): void =>{}

const enter = (): void =>{}

export default function Home() {

  return (
    <main className="all">
        <div className="nav">
        <Image
          src={logoImg}
          alt="Logo"
          className="img_logo"
          style={{ objectFit: "contain" }}
        />
        <div className="button">
          <AuthButton authentication={login} id="log">Login</AuthButton>
          <AuthButton authentication={enter}>To enter</AuthButton>
        </div>
        </div>
        <Presentation/>
        <Register/>
        <Infor/>
       <footer>
       <Image
          src={logoImg}
          alt="Logo"
          className="img_logo_end"
          style={{ objectFit: "contain" }}
        />
       </footer>
    </main>
  )
}
