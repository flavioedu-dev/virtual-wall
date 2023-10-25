import { ChangeEvent, useEffect, useState } from 'react';

export function useAuthentication() {
  interface FormAdm {
    name: string;
    username: string;
    email: string;
    password: string;
    isAdmin?: boolean;
    confirmPassword: string;
    group: object;
  }

  const [useradm, setUserAdm] = useState<FormAdm | null>(null);

  const createUser = async (userAdm: FormAdm) => {
    try {
      const response = await fetch("http://localhost:3000/userAdm", {
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
