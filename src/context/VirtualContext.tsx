import { useCallback, useContext, useState } from "react";
import { createContext } from "react";

export interface wall {
  nameWall?: string;
  imgwall?: string;
  postagens?: any[];
  user?: any[];
  idwall?:string
}

export interface group {
  [x: string]: any;
  nameGroup?: string,
  imageGroup?: string,
  wall?:wall[],
  codigo?: string
}

export interface user{
  name: string,
  email: string,
  password: string,
  confirmPassword?: string,
  isAdmmin: boolean,
  group?: group,
  id?: string,
  nameWall?:string,
  codGroup?: string,
  imgUser?: string,
  rota?: string,
}

interface VirtualContex {
  infor: user | null;
  handleNameChange: (inform: user) => void;
}

const UserContext = createContext<VirtualContex>({
  infor: null,
  handleNameChange: () => {},
})

export const UserProvider = ({children}: {children: React.ReactNode}) =>{
  const [infor, setInfor] = useState<user|null>(null)

  const handleNameChange = useCallback((inform:user)=>{
    setInfor(inform)
  }, [])

  return(
    <UserContext.Provider value={{infor, handleNameChange}}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)