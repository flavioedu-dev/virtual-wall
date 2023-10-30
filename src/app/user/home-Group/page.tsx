"use client"

import Nav from '@/components/Nav/Navbar'
import './homeGroup.css'
import profile from "public/boys.png"
import { useUserContext } from '@/context/VirtualContext'

const HomeGroup= () => {

    const {handleNameChange, infor} = useUserContext()

    return(
        <main>
            <Nav ImageGroup={infor?.group.imageGroup||''}/>
        </main>
    )
}

export default HomeGroup 