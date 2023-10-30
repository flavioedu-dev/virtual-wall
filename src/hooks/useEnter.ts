import { useLogin } from "./useLogin"

interface use{
    email: string;
    password: string;
}

export const useEnter = ()=>{
    
    const {data} = useLogin()

    const authenticationE = (value: use) => {
      
    if (data !== undefined && data !== null) {
        const user = data.find((test) => test.email === value.email && test.password === value.password);
        
        if (user) {
          console.log("Passou");
          return user;
        }
      }
  
      console.log("Não passou");
      return null;
  };

    return {authenticationE}

} 
