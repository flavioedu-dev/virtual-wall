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
import { useRouter } from "next/navigation";

import Link from "next/link";


export default function Home() {

  const router = useRouter()

  return (
    <main className="all-app">
        <div className="nav-app">
        <Image
          src={logoImg}
          alt="Logo"
          className="img_logo"
          style={{ objectFit: "contain" }}
        />
        <div className="button-app">
        <Link  href={"/auth/login"}>
        <AuthButton id="log">Login</AuthButton>
        </Link>
        <Link href={"/auth/codGroup"}>
        <AuthButton>Enter</AuthButton>
        </Link>
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
