"use client"

import { useCallback, useState, createContext, useContext} from "react";

interface VirtualContextProps {
  infor: userAdm | null | undefined ;
  handleInforChange: (infor: userAdm) => void; 
}

interface grup {
  nameGroup: string;
  imageGroup: string;
  wall: [];
  codigo: string;
}

interface userAdm  {
  name : string;
  email: string;
  password: string;
  confirmPassword: string;
  isAdmmin: boolean;
  group: object
}

export const VirtualContext = createContext<VirtualContextProps>({
  infor: null,
  handleInforChange: () => {}
});

export const VirtualProvider = ({children}: {children:React.ReactNode}) => {

  const [infor, setInfor] = useState<userAdm>()

  const handleInforChange = useCallback((infor:userAdm) =>{
      if(infor !== undefined){
        setInfor(infor);
      }
  }, [])

  return(
    <VirtualContext.Provider value={{infor, handleInforChange}}>
      {children}
    </VirtualContext.Provider>
  )
}

export const useVirtualContext = () => useContext(VirtualContext)


  
