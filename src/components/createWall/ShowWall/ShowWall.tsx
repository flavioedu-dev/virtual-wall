import React, { ReactNode } from 'react'
import Image, { StaticImageData } from "next/image";

import "./ShowWall.css"

interface ShowWallProps{
    name: string;
    img: string | StaticImageData;
    funct?: (nameWall:string) => void;
    functCod?: (codGroup:string) => void;
    codGroup?: string

}

const ShowWall = ({name, img, funct, codGroup, functCod }: ShowWallProps) => {

  const handleWall = () =>{
   if(funct){
    funct(name)
   }if(functCod){
    functCod(codGroup!)
   }
  }

  return (
    <main className='allshow'>

        <div className='show' onClick={handleWall}>
        <Image
            src={img}
            alt="example"
            className="img_example-Show"
            width={400}
            height={400}
        />
        <div className='infor-text'>
          <h2>{name}</h2>
          <p>{"@"+name.toLowerCase()}</p>
        </div>
        </div>
    </main>
  )
}

export default ShowWall