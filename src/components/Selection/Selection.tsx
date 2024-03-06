"use client"
import { useState } from "react";
import "./Selection.css"

interface SelectionProps{
    inforIdGroup: string,
    inforNameGroup: string,
    functId: (idGroup:string) => void;

}

const Selection = ({inforNameGroup, inforIdGroup, functId}:SelectionProps) =>{

    const handleClick = () =>{
        functId(inforIdGroup)
    }

    return(
        <main className="mainSelection">
            <button className="buttonSelectionGroup" type="button" onClick={handleClick}>{inforNameGroup}</button>
        </main>
    )
}

export default Selection