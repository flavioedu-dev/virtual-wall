import { Checktoken } from "@/functions/check-token/Checktoken";

interface UseEnterResult {
  authenticationE: (email:string, password:string) => any; 
}

export const useEnter = (): UseEnterResult => {
  const authenticationE = async (email: string, password: string) => {
    try {
        const response = await fetch("https://projeto-web-full-stack-pm-devs.onrender.com/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("userData", JSON.stringify(data));
            console.log(data)
            return data.data
            
        } else {
            return false
        }
    } catch (error) {
        
    }
};


  return { authenticationE };
};
