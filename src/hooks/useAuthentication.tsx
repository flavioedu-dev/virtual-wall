import {ChangeEvent, useState} from 'react'

const authentication = () => {

    interface FormAdm{
        name: string;
        email: string;
        password: string;
        isAdmmin: boolean,
    }

    const [formAdm, setFormAdm] = useState<FormAdm>({
        name: '',
        email: '',
        password:'',
        isAdmmin: true,
    })

    const createUser = async () =>{
        try {
            fetch("local", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                  },
                body: JSON.stringify(formAdm)
            })
        } catch (error) {
            
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormAdm({
            ...formAdm,
            [name]: value
        })
    }

  return {formAdm, createUser, handleInputChange}
}

export default authentication