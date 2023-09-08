//CSS
import "./home_page.css"

//IMG
import logoImg from "public/Logo.png";
import Image from "next/image";

//Components
import Presentation from "@/components/Home/Home_presentation/Presentation";
import Register from "@/components/Home/Home_register/Register";


export default function Home() {
  return (
    <main>
        <Image
          src={logoImg}
          alt="Logo"
          className="img_logo"
          style={{ objectFit: "contain" }}
        />
        <Presentation/>
        <Register/>
        
    </main>
  )
}
