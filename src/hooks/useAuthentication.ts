import { user, wall } from '@/context/VirtualContext';
import { ChangeEvent, useEffect, useState } from 'react';


export function useAuthentication() {

  const [useradm, setUserAdm] = useState<string>("");

  const createUser = async (userAdm: user) => {
    try {
      const response = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userAdm)
      });

      if (response.ok) {
        const data = await response.json();
        setUserAdm(data);  
      } else {
        console.error("Erro ao enviar os dados:", response.status);
      }
    } catch (error) {
      console.error("Ocorreu algum erro no envio:", error);
    }
  }
  return { useradm, createUser };
}
