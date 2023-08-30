"use client";

// Images
import profileLinkedin from "public/Perfil LinkedIn.png";
import profileImg from "public/perfil.png";
import leafImg from "public/copie-o-simbolo-de-interface-de-duas-folhas-de-papel.png";
import configImg from "public/configuracoes.png";
import outImg from "public/sair.png";
import menuImg from "public/menu.png";
import boardImg from "public/board-logo.png";


import React from "react";
import Image from "next/image";

const Menu = () => {
  return (
    <header>
      <div className="menu" tabIndex={0}>
        <section className="header-per">
          <div className="img-per">
            <Image
            src={profileLinkedin}
            alt="profile"
            />
          </div>
          <p className="nome-menu">Flávio Eduardo</p>
          <p className="type">@aluno</p>
        </section>
        <div className="main-per">
          <div className="opc-per">
            <div className="icon-per">
            <Image
            src={profileImg}
            alt="profile"
            />
            </div>
            <p>Perfil</p>
          </div>
          <div className="opc-per">
            <div className="icon-per">
              <Image
              src={leafImg}
              alt="profile"
              />
            </div>
            <p>Postagens</p>
          </div>
          <div className="opc-per">
            <div className="icon-per">
            <Image
            src={configImg}
            alt="profile"
            />
            </div>
            <p>Configurações</p>
          </div>
          <div className="opc-per" id="icon-sair" onClick={() => console.log("OnCLick funfo")}>
            <div className="icon-per">
            <Image
            src={outImg}
            alt="profile"
            />
            </div>
            <p>Sair</p>
          </div>
        </div>
      </div>

      <nav>
        <Image
          className="ico-menu"
          src={menuImg}
          alt="menu-img"
          />

        <a href="home.html">
          <Image
          className="ico-logo"
          src={boardImg}
          alt="board-logo"
          />
        </a>
      </nav>
    </header>
  );
};

export default Menu;
