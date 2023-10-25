import React, { ReactNode } from 'react'
import Image, { StaticImageData } from "next/image";

import "./ShowWall.css"

interface ShowWallProps{
    name: string;
    img: string | StaticImageData
}

const ShowWall = ({name, img}: ShowWallProps) => {
  return (
    <main className='allshow'>

        <div className='show'>
        <Image
            src={img}
            alt="example"
            className="img_example-Show"
            width={400}
            height={400}
        />
        <div className='infor'>
          <h2>{name}</h2>
          <p>{"@"+name.toLowerCase()}</p>
        </div>
        </div>
    </main>
  )
}

export default ShowWall