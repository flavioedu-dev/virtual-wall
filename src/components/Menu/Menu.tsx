"use client";

// CSS
import styles from "./menu.module.css";

// Images
import profileImg from "public/perfil.png";
import leafImg from "public/postagens.png";
import outImg from "public/sair.png";
import home from "public/botao-home.png"
import groupss from "public/grupoA.png"

// Hooks ans types
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUserContext, group, user } from "@/context/VirtualContext";
import { Checktoken } from "@/functions/check-token/Checktoken";
import { useLogin } from "@/hooks/useLogin";
import { useInforGroups } from "@/hooks/useInforGroups";

type MenuProps = {
  closeMenu: () => void;
  imgGroup?: string
};

const Menu = ({ closeMenu, imgGroup }: MenuProps) => {
  const router = useRouter();
  const [infor, setInfor] = useState<user>()
  const {data} = useLogin()
  const [rotaMural, setRotaMural] = useState("")
  const [rotaGroup, setRotaGroup] = useState("")
  const [controlllll, setControlllll] = useState(0)
  const [useGroup, setUseGroup] = useState<group>()
  const groups = useInforGroups()

  const redirectToPath = (path: string) => {
    router.push(`${path}`)
  }

  useEffect(()=>{
    var valorRecuperado = localStorage.getItem("rotaMural");
    if (valorRecuperado) {
      setRotaMural(valorRecuperado)
    }

    var valorRecuperadoGroup = localStorage.getItem("rotaGroup");
    if (valorRecuperadoGroup) {
      setRotaGroup(valorRecuperadoGroup)
    }


      var valorRecuperado = localStorage.getItem("userData");
      if (valorRecuperado) {
      const userData = JSON.parse(valorRecuperado);
      setInfor(userData.data);}
  },[localStorage]);

  useEffect(() => {

    if(infor?.isAdmin == true){
      if(groups.data.length !== 0){
          const valueGroup = groups.data.find((value)=> value.userId == infor?.id)
          setUseGroup(valueGroup)
          setControlllll(1)
      }
  }

    function closingMenu(e: Event) {
      const menu = document.querySelector("aside");
      const menuImg = document.querySelector("nav")?.querySelector("img");
      const targetElement = e.target as Node;

      if (!menu?.contains(targetElement) && !menuImg?.contains(targetElement)) {
        closeMenu();
      }
    }

    document.addEventListener("click", (event) => closingMenu(event));

    return () => {
      document.removeEventListener("click", closingMenu);
    };
  }, [ groups, infor]);

  const options = [
    {
      id: 1,
      img: home,
      alt: "Home-icon",
      title: "Home",
      path: `/user/home-Group/${rotaGroup}/${rotaMural}`
    },
    {
      id: 2,
      img: profileImg,
      alt: "profile-icon",
      title: "Perfil",
      path: "/user/profile"
    },
    {
      id: 3,
      img: groupss,
      alt: "group-icon",
      title: "Groups",
      path: "/user/home-Group"
    },
    {
      id: 4,
      img: leafImg,
      alt: "leaf-icon",
      title: "Posts",
      path: "/user/postagem"
    },
    {
      id: 5,
      img: outImg,
      alt: "out-icon",
      title: "Exit",
      path: "/auth/login"
    }
  ];

  return (
    <aside className={styles.menu}>
      <div className={styles.inner_container}>
        <section className={styles.profile_container}>
          {(infor?.isAdmin == true)?(
            <Image src={useGroup?.imgGroup|| profileImg} alt="profile-linkedin" className="profile-per" width={400} height={400} quality={100}/>
          ):(
            <Image src={infor?.profile_image || infor?.group?.imageGroup! || profileImg} alt="profile-linkedin" className="profile-per" width={1000} height={1000} quality={100}/>
          )}
          <h2>{infor?.name}</h2>
          <p>@{infor?.username?.toLocaleLowerCase()}</p>
        </section>

        <section className={styles.options}>
          {options.map((opt) => (
            <div className="option-menu" key={opt.id} onClick={() => {redirectToPath(opt.path); if(opt.id == 5){localStorage.clear()}}}>
              <Image src={opt.img} alt={opt.alt}/>
              <h1>{opt.title}</h1>
            </div>
          ))}
        </section>
      </div>
    </aside>
  );
};

export default Menu;
