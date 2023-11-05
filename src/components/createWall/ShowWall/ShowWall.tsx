import React, { ReactNode } from 'react'
import Image, { StaticImageData } from "next/image";

import "./ShowWall.css"

interface ShowWallProps{
    name: string;
    img: string | StaticImageData;
    funct?: (nameWall:string) => void
}

const ShowWall = ({name, img, funct}: ShowWallProps) => {

  const handleWall = () =>{
   if(funct){
    funct(name)
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