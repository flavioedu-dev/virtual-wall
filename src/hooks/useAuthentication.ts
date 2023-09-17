import {ChangeEvent, useEffect, useState} from 'react';

export function authentication(){

    interface FormAdm{
        name: string;
        email: string;
        password: string;
        isAdmmin?: boolean,
    }

    const [userAdm, setFormAdm] = useState<FormAdm>()

    const createUser = async (userAdm:FormAdm) =>{
        try {
            console.log(userAdm)
            const res = await fetch("http://localhost:3000/userAdm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                  },
                body: JSON.stringify(userAdm)
            })
        } catch (error) {
            console.log("Ocorreu algum erro no envio")
        }
    }

    useEffect(()=>{

        async function getData(){
             const res = await fetch("http://localhost:3000/userAdm")
             const data = await res.json()
        }
        getData()
    },[])

  return {userAdm, createUser}

}